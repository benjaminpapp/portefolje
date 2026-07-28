import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';

import './SplatViewer.css';

/**
 * WebGL kan feile av grunner vi ikke rår over (manglende GPU-støtte, tapt
 * kontekst, korrupt fil). Uten denne river React ned hele sida.
 */
class SplatBoundary extends Component {
  state = { crashed: false };

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  componentDidCatch(error) {
    console.error('[SplatViewer] falt tilbake til plassholder:', error);
  }

  render() {
    if (!this.state.crashed) return this.props.children;
    return (
      <div className={this.props.shell} style={this.props.style}>
        <div className="splat-viewer__overlay splat-viewer__overlay--error">
          <span>3D-visningen kunne ikke starte i denne nettleseren.</span>
        </div>
      </div>
    );
  }
}

// three + spark er ~1,9 MB gzip (spark bundler inn WASM). Den koden skal
// aldri havne i hovedbundelen — den lastes først når visningen scrolles inn.
const SplatViewer = lazy(() => import('./SplatViewer.jsx'));

/**
 * Laster SplatViewer-chunken først når containeren nærmer seg viewporten.
 * Bruk denne overalt i sida; importer SplatViewer direkte kun hvis du
 * bevisst vil ha den i hovedbundelen.
 */
export default function SplatViewerLazy({ width = '100%', height = 400, className = '', ...props }) {
  const shell = `splat-viewer ${className}`.trim();
  const hostRef = useRef(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || armed) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setArmed(true);
      io.disconnect();
    }, { rootMargin: '400px' });
    io.observe(host);
    return () => io.disconnect();
  }, [armed]);

  if (!armed) {
    return (
      <div ref={hostRef} className={shell} style={{ width, height }}>
        {props.placeholderSrc ? (
          <img className="splat-viewer__placeholder" src={props.placeholderSrc} alt="" />
        ) : null}
      </div>
    );
  }

  return (
    <SplatBoundary shell={shell} style={{ width, height }}>
      <Suspense
        fallback={
          <div className={shell} style={{ width, height }}>
            <div className="splat-viewer__overlay">
              <span className="splat-viewer__progress">Laster …</span>
            </div>
          </div>
        }
      >
        <SplatViewer width={width} height={height} className={className} {...props} />
      </Suspense>
    </SplatBoundary>
  );
}
