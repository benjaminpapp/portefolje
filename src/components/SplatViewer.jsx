import { useEffect, useRef, useState, memo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';

import './SplatViewer.css';

const deg2rad = d => (d * Math.PI) / 180;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const SplatViewer = memo(({
  url,
  width = '100%',
  height = 400,
  defaultRotationY = 0,
  defaultRotationX = 0,
  defaultZoom = 3,
  minZoomDistance = 0.5,
  maxZoomDistance = 20,
  enableManualRotation = true,
  enableManualZoom = true,
  enablePan = false,
  autoFrame = true,
  flipY = true,
  fadeIn = true,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  maxPixelRatio = 1.5,
  pauseWhenOffscreen = true,
  background = null,
  showScreenshotButton = false,
  placeholderSrc,
  className = '',
  onLoad,
  onError,
  ...rest
}) => {
  const hostRef = useRef(null);
  const stageRef = useRef(null);
  const captureRef = useRef(null);
  const controlsRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(null);

  // Alle props som brukes inne i render-løkka leses via ref, slik at
  // endringer ikke river ned WebGL-konteksten.
  const liveRef = useRef({});
  liveRef.current = { autoRotate, autoRotateSpeed, maxPixelRatio };

  // Kontroll-flaggene ligger utenfor WebGL-effekten, ellers ville en endring
  // rive ned og bygge opp konteksten på nytt.
  useEffect(() => {
    const c = controlsRef.current;
    if (!c) return;
    c.enableRotate = enableManualRotation;
    c.enableZoom = enableManualZoom;
    c.enablePan = enablePan;
  }, [enableManualRotation, enableManualZoom, enablePan, ready]);

  useEffect(() => {
    const host = hostRef.current;
    const stage = stageRef.current;
    if (!host || !stage || !url) return;

    let disposed = false;
    setReady(false);
    setFailed(null);
    setProgress(0);

    // Canvas lages her, ikke i JSX: opprydningen kaller forceContextLoss(), og
    // et canvas med tapt WebGL-kontekst kan aldri få en ny. StrictMode kjører
    // effekten to ganger i dev, så gjenbruk av samme node ville krasjet andre
    // gang med "getContext returned null".
    const canvas = document.createElement('canvas');
    canvas.className = 'splat-viewer__canvas';
    stage.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      // Spark anbefaler antialias: false — MSAA hjelper ikke gaussian splats
      // og koster mye ytelse.
      antialias: false,
      alpha: background === null,
      preserveDrawingBuffer: showScreenshotButton
    });
    renderer.setClearColor(background ?? 0x000000, background === null ? 0 : 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 500);
    camera.position.set(0, 0, THREE.MathUtils.clamp(defaultZoom, minZoomDistance, maxZoomDistance));

    let needsRender = true;
    const invalidate = () => { needsRender = true; };

    // Spark sorterer splats asynkront; onDirty forteller oss når en ny
    // sortering er klar slik at vi kan tegne på nytt.
    const spark = new SparkRenderer({ renderer, onDirty: invalidate });
    scene.add(spark);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableRotate = enableManualRotation;
    controls.enableZoom = enableManualZoom;
    controls.enablePan = enablePan;
    controls.minDistance = minZoomDistance;
    controls.maxDistance = maxZoomDistance;
    controls.addEventListener('change', invalidate);
    controlsRef.current = controls;

    const pivot = new THREE.Group();
    pivot.rotation.set(deg2rad(defaultRotationX), deg2rad(defaultRotationY), 0);
    scene.add(pivot);

    let mesh = null;
    let fadeStart = 0;

    const mesh_ = new SplatMesh({
      url,
      onProgress: e => {
        if (disposed || !e.total) return;
        setProgress(Math.round((e.loaded / e.total) * 100));
      },
      onLoad: loaded => {
        if (disposed) { loaded.dispose(); return; }
        mesh = loaded;

        // Splat-PLY fra de fleste capture-pipelines (INRIA/Postshot/Luma) er
        // Y-ned i forhold til three.js. 180° om X retter opp scenen.
        if (flipY) mesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);

        if (autoFrame) {
          const box = mesh.getBoundingBox(true);
          const sphere = box.getBoundingSphere(new THREE.Sphere());
          mesh.position.sub(sphere.center.clone().applyQuaternion(mesh.quaternion));
          const dist = (sphere.radius * 1.35) / Math.sin(deg2rad(camera.fov) / 2);
          camera.position.set(0, 0, THREE.MathUtils.clamp(dist, minZoomDistance, maxZoomDistance));
          controls.minDistance = Math.max(minZoomDistance, sphere.radius * 0.15);
          controls.maxDistance = Math.max(maxZoomDistance, dist * 2.5);
          controls.update();
        }

        if (fadeIn) {
          mesh.opacity = 0;
          fadeStart = performance.now();
        }

        pivot.add(mesh);
        setReady(true);
        invalidate();
        onLoad?.(mesh);
      }
    });

    mesh_.initialized?.catch?.(err => {
      if (disposed) return;
      setFailed(err?.message || 'Kunne ikke laste splat-filen');
      onError?.(err);
    });

    function resize() {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, liveRef.current.maxPixelRatio));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      invalidate();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let visible = !pauseWhenOffscreen;
    let rafId = null;
    let last = performance.now();

    function frame(now) {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const p = liveRef.current;
      if (p.autoRotate && !prefersReducedMotion()) {
        pivot.rotation.y += p.autoRotateSpeed * dt;
        needsRender = true;
      }

      if (mesh && fadeIn && mesh.opacity < 1) {
        mesh.opacity = Math.min((now - fadeStart) / 450, 1);
        needsRender = true;
      }

      if (controls.update()) needsRender = true;
      if (!needsRender) return;
      needsRender = false;
      renderer.render(scene, camera);
    }

    function start() {
      if (rafId !== null) return;
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      if (rafId === null) return;
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    let io = null;
    if (pauseWhenOffscreen) {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) { invalidate(); start(); } else stop();
      }, { rootMargin: '200px' });
      io.observe(host);
    } else {
      start();
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    captureRef.current = () => {
      renderer.render(scene, camera);
      const a = document.createElement('a');
      a.download = 'splat.png';
      a.href = renderer.domElement.toDataURL('image/png');
      a.click();
    };

    return () => {
      disposed = true;
      stop();
      io?.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      controls.removeEventListener('change', invalidate);
      controls.dispose();
      controlsRef.current = null;
      captureRef.current = null;
      // Spark avviser ventende worker-jobber med "Worker terminate" når den
      // rives ned. Forventet ved unmount — men det logges som en exception,
      // så vi svelger den her i stedet for å spamme konsollet.
      try { mesh?.dispose(); } catch { /* allerede revet ned */ }
      try { spark.dispose(); } catch { /* allerede revet ned */ }
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
    // Bevisst smal dep-liste: kun ting som krever ny WebGL-kontekst.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, flipY, autoFrame, fadeIn, background, showScreenshotButton, pauseWhenOffscreen]);

  return (
    <div
      ref={hostRef}
      className={`splat-viewer ${className}`.trim()}
      style={{ width, height }}
      data-ready={ready || undefined}
      {...rest}
    >
      {/* React rører aldri innholdet i stage — canvas settes inn imperativt. */}
      <div ref={stageRef} className="splat-viewer__stage" />

      {!ready && !failed && (
        <div className="splat-viewer__overlay">
          {placeholderSrc ? (
            <img className="splat-viewer__placeholder" src={placeholderSrc} alt="" />
          ) : null}
          <span className="splat-viewer__progress">{progress}%</span>
        </div>
      )}

      {failed && (
        <div className="splat-viewer__overlay splat-viewer__overlay--error">
          <span>{failed}</span>
        </div>
      )}

      {showScreenshotButton && ready && (
        <button
          type="button"
          className="splat-viewer__shot"
          onClick={() => captureRef.current?.()}
        >
          Skjermbilde
        </button>
      )}
    </div>
  );
});

SplatViewer.displayName = 'SplatViewer';

export default SplatViewer;
