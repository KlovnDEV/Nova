import { useEffect } from 'react';

export function ConcatClasses(...args): string {
  const res = [];

  args.forEach(arg => {
    if (arg === undefined) throw new Error('ClassName not defined!');
    if (arg !== '' && arg !== false) {
      res.push(arg);
    }
  });

  return res.join(' ');
}

export function minmax(x, min, max): number {
  return Math.max(Math.min(x, max), min);
}

export function useEventHandler(func): void {
  const handler = event => {
    func(event.data);
  };

  useEffect(() => {
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
