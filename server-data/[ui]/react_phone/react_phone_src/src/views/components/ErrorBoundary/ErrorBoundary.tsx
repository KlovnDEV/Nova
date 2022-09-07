import React from 'react';
import { withRouter } from 'react-router-dom';
// ui
import { SvgIcon, Box, Button } from 'libs/UI';
// style
import './ErrorBoundary.scss';

interface IProps extends React.ComponentProps<'div'> {
  error: boolean;
  history: any;
}

interface IState {
  error: false | { message: string; stack: string };
  history?: any;
}

class ErrorBoundaryProto extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, history } = this.props;

    if (error) {
      return (
        <div className="error-boundary">
          <Box flex="center" className="error-boundary__icon">
            <SvgIcon width={100} height={100} src="ErrorOutline" />
          </Box>
          <h1 className="error-boundary__header">Что-то пошло не так</h1>
          <Button
            className="error-boundary__button"
            onClick={() => {
              this.setState({ error: false });
              history.push('/');
            }}
          >
            На главную
          </Button>
          <p className="error-boundary__subheader">Подробнее:</p>
          <p className="error-boundary__message">{error.message}</p>
          <p className="error-boundary__stack">{error.stack}</p>
        </div>
      );
    }

    return children;
  }
}

export const ErrorBoundary = withRouter<any, any>(ErrorBoundaryProto);

export default withRouter<any, any>(ErrorBoundaryProto);
