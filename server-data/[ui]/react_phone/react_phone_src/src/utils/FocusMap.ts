/* eslint-disable import/prefer-default-export */
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export function useFocusMap(defaultFocus) {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [, _setFocus] = useState(defaultFocus);
  const [, setFocusStack] = useState([]);
  const ref = useRef();

  const getFocused = function () {
    if (!ref.current) return null;
    return (ref.current as any).querySelector('*[data-focus-name]:focus-within');
  };

  const getFocus = function () {
    const c = getFocused();
    return c?.getAttribute('data-focus-name');
  };

  const setFocus = function (index) {
    const firstElement = (ref.current as any).querySelector(`*[data-focus-name="${index}"]`);
    _setFocus(index);
    if (firstElement) firstElement.focus();
  };

  const doFocusAction = function (name) {
    const c = getFocused();
    const nextIndex = c.getAttribute(`data-focus-${name}`);
    if (nextIndex !== undefined) {
      setFocus(nextIndex);
    }
  };

  const doClick = () => {
    const c = getFocused();
    doFocusAction('enter');
    if (c) c.click();
  };

  const moveBack = function () {
    history.goBack();
  };

  const pop = function () {
    setFocusStack(stack => {
      const focused = stack.pop();
      if (focused) setFocus(focused);
      return stack;
    });
  };

  const push = function () {
    const focused = getFocus();
    if (focused) {
      setFocusStack(stack => {
        stack.push(focused);
        return stack;
      });
    }
  };

  const onKeyDown = function (e) {
    switch (e.key) {
      case 'ArrowRight':
        doFocusAction('right');
        break;
      case 'ArrowLeft':
        doFocusAction('left');
        break;
      case 'ArrowUp':
        doFocusAction('up');
        break;
      case 'ArrowDown':
        doFocusAction('down');
        break;

      case 'Space':
      case 'Enter':
        doClick();
        break;

      case 'Escape':
        moveBack();
        break;
      default:
    }
  };

  useEffect(() => {
    setFocus(defaultFocus);
  }, []);

  return [
    {
      ref,
      setFocus,
      onKeyDown,
      push,
      pop,
    },
  ];
}

export const generateGridFocusMap = items => {
  const generateGridFocusMapLeft = item => {
    const exact = items.filter(i => item.y === i.y && item.x > i.x);
    if (exact.length > 0) {
      return exact.sort((a, b) => b.x - a.x)[0];
    }

    const upper = items.find(i => item.y > i.y && item.x > i.x);
    if (upper) return upper;
    return items.find(i => item.x > i.x);
  };

  const generateGridFocusMapRight = item => {
    const exact = items.filter(i => item.y === i.y && item.x < i.x);
    if (exact.length > 0) {
      return exact.sort((a, b) => a.x - b.x)[0];
    }

    const upper = items.find(i => item.y < i.y && item.x < i.x);
    if (upper) return upper;
    return items.find(i => item.x < i.x);
  };

  const generateGridFocusMapUp = item => {
    const exact = items.filter(i => item.y > i.y && item.x === i.x);
    if (exact.length > 0) {
      return exact.sort((a, b) => b.y - a.y)[0];
    }

    const nonex = items.filter(i => item.y > i.y);
    if (nonex.length > 0) {
      return nonex.sort((a, b) => b.y - a.y)[0];
    }
    return null;
  };

  const generateGridFocusMapDown = item => {
    const exact = items.filter(i => item.y < i.y && item.x === i.x);
    if (exact.length > 0) {
      return exact.sort((a, b) => a.y - b.y)[0];
    }

    const nonex = items.filter(i => item.y < i.y);
    if (nonex.length > 0) {
      return nonex.sort((a, b) => a.y - b.y)[0];
    }
    return null;
  };

  // const focusMap
  items.forEach(item => {
    const i = item;

    const leftItem = generateGridFocusMapLeft(item);
    i.focusLeft = leftItem ? leftItem.i : null;

    const rightItem = generateGridFocusMapRight(item);
    i.focusRight = rightItem ? rightItem.i : null;

    const upItem = generateGridFocusMapUp(item);
    i.focusUp = upItem ? upItem.i : null;

    const downItem = generateGridFocusMapDown(item);
    i.focusDown = downItem ? downItem.i : null;
  });
};
