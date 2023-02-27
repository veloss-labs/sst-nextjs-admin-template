import React from 'react';
import { InjectProvider } from '~/components/shared/modal/_provider/inject';

function withInjectProvider<P = any>(
  WrappedComponent: React.FunctionComponent<P>,
): React.FunctionComponent<P> {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <InjectProvider>
        {/* @ts-ignore */}
        <WrappedComponent {...props} />
      </InjectProvider>
    );
  };
}

export default withInjectProvider;
