/// <reference types="react/canary" />

import renderInfo from '@/actions/render-info';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function Chat() {
  return (
    <React.Suspense
      fallback={
        // The view that will render while the Server Function is awaiting data.
        <ActivityIndicator />
      }
    >
      {renderInfo({ name: 'World' })}
    </React.Suspense>
  );
}
