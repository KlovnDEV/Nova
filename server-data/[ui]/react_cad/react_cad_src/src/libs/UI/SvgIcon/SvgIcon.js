/* eslint-disable no-useless-catch */
// core
import React, { useState, useRef, useEffect } from 'react';
// style
import './SvgIcon.scss';

function SvgIcon(props) {
  const { src, ...rest } = props;
  const ImportedIconRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (await import(`assets/img/${src}.svg`)).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [src]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    return <ImportedIcon {...rest} />;
  }

  return null;
}

export default SvgIcon;
