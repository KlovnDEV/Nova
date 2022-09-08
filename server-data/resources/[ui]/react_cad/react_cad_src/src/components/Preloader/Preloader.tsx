/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect, Suspense, ReactElement } from 'react';
import { sleep, useForceUpdate } from 'utils';
import { ErrorBoundary } from 'libs/UI/ErrorBoundary';
import s from './Preloader.module.scss';

const DefaultFallback = (): JSX.Element => {
  return (
    <div className={s.wrapper}>
      <div className={s.gooey}>
        <span className={s.dot} />
        <div className={s.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

const DefaultError = () => {
  return <div className={s.wrapper}>Ошибка!</div>;
};

const PreloaderInner = ({ event, loadingSuccess, error, success: Success, fallback, params }) => {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (loadingSuccess == undefined) throw sleep(1000);
  if (loadingSuccess === false) return error;

  return <Success {...params} />;
};

export interface IProps {
  fallback?: ReactElement;
  error?: ReactElement;
  success?: Function;
  event?: Promise<any>;
  status?: never;
  children?: never;
  [index: string]: any;
}

const Preloader = (props: IProps): JSX.Element => {
  const forceUpdate = useForceUpdate();
  const { event, success, ...rest } = props;
  let { fallback, error } = props;
  if (!fallback) fallback = <DefaultFallback />;
  if (!error) error = <DefaultError />;

  const [loadingSuccess, setLoadingSuccess] = useState<boolean>(undefined);

  useEffect(() => {
    setLoadingSuccess(undefined);
    if (event) {
      event
        .then(r => {
          setLoadingSuccess(true);
          forceUpdate();
        })
        .catch(() => {
          setLoadingSuccess(false);
          forceUpdate();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary>
        <PreloaderInner
          event={event}
          loadingSuccess={loadingSuccess}
          fallback={fallback}
          error={error}
          success={success}
          params={rest}
        />
      </ErrorBoundary>
    </Suspense>
  );
};

export { DefaultFallback, Preloader };
export default Preloader;
