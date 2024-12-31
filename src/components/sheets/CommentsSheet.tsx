import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { ThemedText } from '../ui/ThemedText';

interface CommentsSheetProps {
  postId: string;
}

export const CommentsSheet = forwardRef<BottomSheetModal, CommentsSheetProps>(({ postId }, ref) => {
  // shet has to render above content
  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal ref={ref} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
      <BottomSheetView style={{ flex: 1, padding: 16 }}>
        <ThemedText>Comments for post {postId}</ThemedText>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

CommentsSheet.displayName = 'CommentsSheet';
