// core
import React from 'react';
// ui
import { SvgIcon } from 'libs/UI';
// style
import './Avatar.scss';

/* eslint-disable */
const hashCode = (s) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
/* eslint-enable */
// FIXME: проставить типы
export function Avatar(props): JSX.Element {
  const { contact, phone, src, style, color, className, ...rest } = props;

  const getColor = () => {
    if (color) return color;

    const colors = [
      '#ef9a9a',
      '#f48fb1',
      '#ce93d8',
      '#b39ddb',
      '#9fa8da',
      '#90caf9',
      '#81d4fa',
      '#80deea',
      '#80cbc4',
      '#a5d6a7',
      '#c5e1a5',
      '#e6ee9c',
      '#fff59d',
      '#ffe082',
      '#ffcc80',
      '#ffab91',
    ];
    return colors[Math.abs(hashCode(contact?.name || phone || '')) % colors.length];
  };

  const avatar = contact?.avatar || src;

  const generateStyles = () => {
    const generatedColor = getColor();
    const styles = { ...style };
    if (generatedColor) {
      styles.backgroundColor = avatar ? undefined : generatedColor;
    }

    return styles;
  };

  return (
    <div className={`avatar ${className || ''}`} style={generateStyles()} {...rest}>
      {!avatar && (
        <div className="avatar__nophoto">
          <SvgIcon width="70%" fill="#fff" src="person" />
        </div>
      )}
      {avatar && (
        <div className="avatar__photo" style={{ backgroundImage: `url(${encodeURI(avatar)})` }} />
      )}
    </div>
  );
}

export default Avatar;
