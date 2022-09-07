// core
import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
// style
import { observer } from 'mobx-react';
import s from './index.local.scss';

type TooltipItem = {
  title: string | JSX.Element;
  position?: 'top' | 'bottom';
};

export interface TooltipProps {
  anchor: any;
  tip: TooltipItem;
}

const TooltipProto = ({ data }: { data: TooltipProps }): JSX.Element => {
  const {
    tip: { title, position = 'bottom' },
    anchor,
  } = data;
  const { x, y, width, height, top } = anchor.getBoundingClientRect();

  const tipRef = useRef<HTMLDivElement>(null);
  /**
   * Нужно для того, чтобы отцентрировать тултип после создания,
   * т.к. мы знаем только центр якоря и не знаем размеры тултипа
   */
  const [posX, setPosX] = useState(x + width / 2);
  /**
   * На будущее, елси придется программно менять положение по оси
   */
  const [posY, setPosY] = useState(position === 'bottom' ? y + height + 12 : top); // 12 - высота стрелки
  /**
   * Скрытие рывков при смене posX
   */
  const [visible, setVisible] = useState(false);
  /**
   * Возможно, понадобится при проблемах с mouseenter/mouseover, т.к. для дочек надо глушить ивенты через стили
   * чтобы тултип не пропадал по наведению на дочерние
  anchor.children.forEach(child => {
    // eslint-disable-next-line no-param-reassign
    child.style.pointerEvents = 'none';
  });
   */

  useEffect(() => {
    if (tipRef.current) {
      const { x: tipX, width: tipW, height: tipH } = tipRef.current.getBoundingClientRect();
      setPosX(tipX - tipW / 2);
      if (position === 'top') {
        setPosY(prev => prev - tipH - 12); // 12 - высота стрелки
      }
      setVisible(true);
    }
  }, [position]);

  return (
    <div
      className={classnames(s.Tooltip, position === 'top' ? s['is-top'] : s['is-bottom'])}
      style={{
        top: posY ?? 100,
        left: posX ?? 200,
        position: 'fixed',
        opacity: visible ? 1 : 0,
      }}
      ref={tipRef}
    >
      {title}
    </div>
  );
};

export const Tooltip = observer(TooltipProto);
export default Tooltip;
