import React, { Suspense } from 'react';
import type { ComponentType } from 'react';
import { Spinner } from '../components';

export const withSuspense = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithSuspense: React.FC<P> = (props) => {
    return (
      <Suspense fallback={<Spinner />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  return WithSuspense;
};
