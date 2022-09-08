// core
import React from 'react';
import { observer } from 'mobx-react';
// components
import { StatusBar } from 'views/components/StatusBar';
// storage
import PhoneConfig from 'storage/PhoneConfig';
// style
import './Page.scss';

interface IProps extends React.ComponentPropsWithoutRef<'div'> {
  backgroundBlur?: boolean;
  pageRef?: React.Ref<HTMLDivElement>;
  pageLayoutRef?: React.Ref<HTMLDivElement>;
  statusBar?: React.ReactChild | true;
  appBar?: React.ReactChild;
  bottomBar?: React.ReactChild;
}

function PageProto(props: IProps) {
  const {
    backgroundBlur = false,
    pageRef,
    pageLayoutRef,
    className,
    statusBar,
    appBar,
    bottomBar,
    children,
    ...rest
  } = props;

  return (
    <>
      <div
        className="page__bg"
        style={{
          backgroundImage: `url(${PhoneConfig.backgroundImage})`,
          filter: backgroundBlur ? 'blur(3px)' : '',
        }}
      />
      <div ref={pageLayoutRef} className="page__layout">
        <div style={{ zIndex: 2 }}>{statusBar && <StatusBar variant={statusBar} />}</div>
        <div style={{ zIndex: 2 }}>{appBar}</div>
        <div ref={pageRef} className={`page__screen page__scrollbar ${className || ''}`} {...rest}>
          {children}
        </div>
        {bottomBar}
      </div>
    </>
  );
}

export const Page = observer(PageProto);

export default observer(PageProto);
