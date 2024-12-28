'use client';

import { forwardRef } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export const BodyScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      // contentInset={{ bottom: paddingBottom }} should be 0
      // scrollIndicatorInsets={{ bottom: paddingBottom }} should be 0
      {...props}
      ref={ref}
    />
  );
});
