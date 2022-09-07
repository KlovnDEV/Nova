/* eslint-disable import/prefer-default-export */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
import React, { useRef, useEffect, useState, CSSProperties } from 'react';

type TooltipProps = {
  /**
   * A [ref](https://reactjs.org/docs/refs-and-the-dom.html).
   */
  parentRef: React.Ref<HTMLElement>;
  /**
   * `true` if the tooltip should hide after a `mouseout`, or show
   * immediately if `mouseover` occurs.
   */
  showOnHover?: boolean;
  /**
   * Callback fired when the tooltip gets shown or hidden.
   */
  showCallback?: (tooltipRef: React.Ref<HTMLElement>) => void;
  /**
   * Callback fired when the tooltip gets dismissed.
   */
  hideCallback?: (tooltipRef: React.Ref<HTMLElement>) => void;
  /**
   * Only has an effect if `showOnHover` is `false`.
   */
  initialShow?: boolean;
  /**
   * If provided, it will be invoked when the tooltip is opened.
   */
  onOpen?: () => void;
  /**
   * If provided, it will be invoked when the tooltip is closed.
   */
  onClose?: () => void;
  /**
   * If provided, it will be invoked when the tooltip is dismissed.
   */
  onDismiss?: () => void;

  children: JSX.Element;
};

export function Tooltip(props: TooltipProps) {
  const tooltip = useRef(null);

  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState({
    x: props.parentRef.offsetLeft,
    y: props.parentRef.offsetTop,
  });
  const [showOnHover, setShowOnHover] = useState(props.showOnHover);
  const [hovered, setHovered] = useState<boolean>(false);

  const open = () => {
    setOpened(true);
    setHovered(false);
  };

  const close = () => {
    setOpened(false);
  };

  const dismiss = () => {
    setOpened(false);
  };

  const onOpen = () => {
    if (!props.initialShow) {
      setOpened(true);
      setHovered(true);
    }
  };

  const onDismiss = () => {
    if (props.initialShow) {
      setOpened(true);
      setHovered(true);
    }
  };

  const onClose = () => {
    close();
  };

  const positionHover = ({ x, y }: { x: number; y: number }) => {
    const hoverX = props.parentRef.offsetLeft + x;
    const hoverY = props.parentRef.offsetTop + y;

    if (
      hoverX < 0 ||
      hoverY < 0 ||
      hoverX > window.innerWidth - props.parentRef.offsetWidth ||
      hoverY > window.innerHeight - props.parentRef.offsetHeight
    ) {
      setPosition({ x, y });
    }
  };

  useEffect(() => {
    if (props.showCallback) {
      setShowOnHover(true);
      props.showCallback(props.parentRef);
    }
  }, [props.showCallback]);

  useEffect(() => {
    if (props.hideCallback) {
      setShowOnHover(false);
      props.hideCallback(props.parentRef);
    }
  }, [props.hideCallback]);

  useEffect(() => {
    if (props.initialShow) {
      open();
    }
  }, [props.initialShow, open]);

  useEffect(() => {
    if (props.showOnHover) {
      positionHover({ x: position.x, y: position.y });
    }
  }, [props.parentRef.current, props.showOnHover, position, setPosition]);

  useEffect(() => {
    if (props.initialShow) {
      if (props.showOnHover) {
        open();
      }
    }
  }, [props.initialShow, props.showOnHover]);

  if (props.onClose) {
    setShowOnHover(false);
  }

  const handleMouseout = () => {
    if (props.showOnHover) {
      setShowOnHover(false);
    }

    if (hovered) {
      close();
    }
  };

  const handleMouseOver = () => {
    setShowOnHover(true);

    if (!props.showOnHover) {
      open();
    }
  };

  return (
    <div ref={tooltip} /* className={props.className} {...props.position} */>
      <div className="tooltip-content" onMouseOver={handleMouseOver} onMouseOut={handleMouseout}>
        {props.children}
      </div>
    </div>
  );
}
