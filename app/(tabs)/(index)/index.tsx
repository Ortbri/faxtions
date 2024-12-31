import WorkoutPostItem from '@/components/custom/WorkoutPostitem';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlatList } from 'react-native';

/* -------------------------------------------------------------------------- */
/*                                    HOME                                    */
/* -------------------------------------------------------------------------- */
export default function Home() {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <BottomSheetModalProvider>
      <FlatList
        data={Array.from({ length: 10 })}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          gap: 14,
          paddingHorizontal: 10,
          paddingTop: 14,
          paddingBottom: tabBarHeight,
        }}
        renderItem={({ item, index }) => <WorkoutPostItem key={index.toString()} />}
      />
    </BottomSheetModalProvider>
  );
}
