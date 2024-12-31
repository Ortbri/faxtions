import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import Sheet from '../custom/sheet';
import { ThemedText } from '../ui/ThemedText';

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

interface CommentsSheetProps {
  postId: string;
}

export const CommentsSheet = forwardRef<BottomSheetModal, CommentsSheetProps>(({ postId }, ref) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      username: 'user1',
      text: 'Great post! 👍',
      timestamp: '2h ago',
    },
    {
      id: '2',
      username: 'user2',
      text: 'Love this! ❤️',
      timestamp: '1h ago',
    },
  ]);

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const containerComponent = useCallback(
    (props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>,
    [],
  );

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <ThemedText style={styles.username}>{item.username}</ThemedText>
        <ThemedText style={styles.timestamp}>{item.timestamp}</ThemedText>
      </View>
      <ThemedText>{item.text}</ThemedText>
    </View>
  );

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: 'currentUser',
        text: newComment,
        timestamp: 'Just now',
      };
      setComments((prev) => [comment, ...prev]);
      setNewComment('');
    }
  };

  return (
    <Sheet
      showBackdrop
      stackBehavior="switch"
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      containerComponent={containerComponent}
    >
      <BottomSheetScrollView style={styles.container}>
        <ThemedText style={styles.header}>Comments</ThemedText>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          style={styles.commentsList}
          ListFooterComponent={
            <View style={styles.inputContainer}>
              <Image
                source={{ uri: 'https://ui-avatars.com/api/?name=U' }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  marginRight: 8,
                }}
              />
              <BottomSheetTextInput
                style={styles.input}
                placeholder="Add a comment..."
                placeholderTextColor="#666"
                value={newComment}
                onChangeText={setNewComment}
                onSubmitEditing={handleSubmitComment}
                returnKeyType="send"
              />
            </View>
          }
        />
      </BottomSheetScrollView>
    </Sheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  commentsList: {
    flex: 1,
  },
  commentContainer: {
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  username: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  inputContainer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#000',
  },
});

CommentsSheet.displayName = 'CommentsSheet';
