import React from 'react';
import { isFunction } from '~/utils/assertion';

export type FallbackRender = (errorData: {
  error: Error;
  componentStack: string | null;
  resetError(): void;
}) => React.ReactElement;

interface ErrorBoundaryProps {
  fallback?: React.ReactElement | FallbackRender;
  // componentDidMount
  onMount?(): void;
  // componentWillUnmount
  onUnmount?(error: Error | null, componentStack: string | null): void;
  // 에러를 초기화하는 함수
  onReset?(error: Error | null, componentStack: string | null): void;
  // 에러가 발생할 때 호출
  onError?(error: Error, componentStack: string): void;
}

interface ErrorBoundaryState {
  componentStack: React.ErrorInfo['componentStack'] | null;
  error: Error | null;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      componentStack: null,
      error: null,
    };
  }

  componentDidCatch(
    error: Error & { cause?: Error },
    { componentStack }: React.ErrorInfo,
  ): void {
    const { onError } = this.props;

    const errorBoundaryError = new Error(error.message);
    errorBoundaryError.name = `React ErrorBoundary ${errorBoundaryError.name}`;
    errorBoundaryError.stack = componentStack;

    error.cause = errorBoundaryError;

    if (onError) {
      onError(error, componentStack);
    }

    // componentDidCatch는
    // getDerivedStateFromError를 통해 사용되므로
    // componentStack은 상태를 통해 접근 가능
    this.setState({ error, componentStack });
  }

  componentDidMount(): void {
    const { onMount } = this.props;
    if (onMount) {
      onMount();
    }
  }

  componentWillUnmount(): void {
    const { error, componentStack } = this.state;
    const { onUnmount } = this.props;
    if (onUnmount) {
      onUnmount(error, componentStack);
    }
  }

  public resetErrorBoundary: () => void = () => {
    const { onReset } = this.props;
    const { error, componentStack } = this.state;
    if (onReset) {
      onReset(error, componentStack);
    }
    this.setState({
      hasError: false,
      componentStack: null,
      error: null,
    });
  };

  render() {
    const { fallback, children } = this.props;
    const { error, componentStack } = this.state;

    if (error) {
      let element: React.ReactElement | undefined = undefined;
      if (isFunction(fallback)) {
        element = fallback({
          error,
          componentStack,
          resetError: this.resetErrorBoundary,
        });
      } else {
        element = fallback;
      }

      if (React.isValidElement(element)) {
        return element;
      }

      return null;
    }

    if (isFunction(children)) {
      return (children as unknown as () => React.ReactNode)();
    }
    return children;
  }
}

export default ErrorBoundary;
