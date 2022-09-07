/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

type IState = { hasError: boolean; error?: AnyObject; errorInfo?: AnyObject };
type IProps = { children: React.ReactNode };

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null } as IState;
  }

  static getDerivedStateFromError(error: AnyObject): IState {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true, error: error };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  componentDidCatch(error, errorInfo) {
    this.setState(() => {
      return {
        error: error,
        errorInfo: errorInfo,
      };
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
export default ErrorBoundary;
