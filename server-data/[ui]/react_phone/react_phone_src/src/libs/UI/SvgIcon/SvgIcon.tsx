// core
import React, { useState, useRef, useEffect } from 'react';
// style
import './SvgIcon.scss';

interface IProps {
  src: string;
  fill?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onClick?: React.ComponentProps<'div'>['onClick'];
}

function SvgIcon(props: IProps): JSX.Element {
  const { src, ...rest } = props;
  const ImportedIconRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        ImportedIconRef.current = (await require(`assets/img/material-icons/${src}.svg`)).default;
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
