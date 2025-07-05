import React from 'react';
import MainLayout from './MainLayout';

const withLayoutWrapper = (Component, hasLayout) => {
  if (!hasLayout) return Component;

  return props => (
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  );
};

export default withLayoutWrapper;
