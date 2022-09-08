import React, {
  cloneElement,
  createElement,
  isValidElement,
  memo,
  ReactDOM,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import parse, { HTMLReactParserOptions, domToReact, DOMNode } from 'html-react-parser';
import { UIIcon } from '../@types';

const iconCache: Record<string, string> = {};

async function loadIcon(name) {
  if (name in iconCache) {
    return iconCache[name];
  }

  const res = await fetch(`${ASSETS}/svg/icons/${name}.svg`);
  if (res.status === 200) {
    iconCache[name] = await res.text();
    return iconCache[name];
  }

  throw new Error(`Incorrect icon loading status ${res.status}: ${res.text}`);
}

const IconProto = ({ name, fill = '#fff', className }: UIIcon): JSX.Element => {
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    const fetchAll = async (names: string[]) => {
      for (let i = 0; i < names.length; i += 1) {
        if (!names[i]) continue;
        try {
          // eslint-disable-next-line no-await-in-loop
          setSvg(await loadIcon(names[i]));
          return;
        } catch (e) {
          console.warn('Icon not found or incorrect: ', name, e);
        }
      }
    };
    if (Array.isArray(name)) {
      fetchAll(name);
    } else {
      fetchAll([name]);
    }
  }, [name]);

  if (!svg) return null;

  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const element = domToReact(domNode);

      if (isValidElement(element)) return element;
      return null;
    },

    library: {
      cloneElement: (element: JSX.Element, props?: AnyObject, ...children: ReactNode[]) =>
        cloneElement(element, props, children),
      createElement: (type: keyof ReactDOM, props?: AnyObject, ...children: ReactNode[]) => {
        if (type === 'svg') {
          if (className !== undefined) Object.assign(props, { className });
          if (fill !== undefined) Object.assign(props, { fill });
        }
        return createElement(type, props, children);
      },
      isValidElement: (element: JSX.Element) => {
        return isValidElement(element);
      },
    },
  };

  const parsedIcon = parse(svg, options);

  return <>{parsedIcon}</>;
};

const Icon = memo(IconProto);

export { Icon };
export default Icon;
