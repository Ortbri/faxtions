/// <reference types="react/canary" />
// import '@/global.css';

// import { renderUpcomingLaunches } from '@/functions/render-launches';
import { renderUpcomingLaunches } from '@/actions/render-launches';
import { BodyScrollView } from '@/components/ui/BodyScrollView';
import { useCallback, useState } from 'react';
import React from 'react';
import { RefreshControl, Text } from 'react-native';

// import { IndexLoading } from '@/components/index-loading';

export default function HomeScreen(_: { dom?: import('expo/dom').DOMProps }) {
  const [refreshing, setRefreshing] = useState(false);
  const [renderKey, setRenderKey] = useState('123');
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Re-invoke the renderUpcomingLaunches function
    setRenderKey(Math.random().toString());
    setRefreshing(false);
  }, []);

  return (
    <BodyScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <React.Suspense key={renderKey} fallback={<Text>Loading...</Text>}>
        {renderUpcomingLaunches()}
      </React.Suspense>
    </BodyScrollView>
  );
}
