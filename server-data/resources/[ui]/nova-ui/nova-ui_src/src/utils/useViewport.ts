import { useState, useEffect } from 'react';

type IViewport = { vw: number; vh: number };

function getViewport(): IViewport {
  const { innerWidth: vw, innerHeight: vh } = window;
  return {
    vw,
    vh,
  };
}

function useViewport(): IViewport {
  const [viewport, setViewport] = useState(getViewport());

  useEffect((): (() => void) => {
    function handleResize(): void {
      setViewport(getViewport());
    }

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
}

export { useViewport };
export default useViewport;
