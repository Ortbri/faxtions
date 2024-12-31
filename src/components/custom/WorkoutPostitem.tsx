import { ThemedText } from '@/components/ui/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import formatDistanceToNow from '@/utils/formatDistanceToNow';
import { Ionicons } from '@expo/vector-icons';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router, useRouter } from 'expo-router';
import type React from 'react';
import { useCallback, useRef } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';
import { CommentsSheet } from '../sheets/CommentsSheet';

interface WorkoutPostItemInterface {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  workoutType: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
  duration: number; // in minutes
  createdAt: Date;
  imageUrl?: string;
  likes: number;
  comments: number;
}

/* -------------------------------------------------------------------------- */
/*                                    item                                    */
/* -------------------------------------------------------------------------- */
const WorkoutPostItem = () => {
  const { colors } = useTheme();
  const commentsSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentCommentsPress = useCallback(() => {
    commentsSheetRef.current?.present();
  }, []);

  // Mock data - you would normally pass this as props
  const workoutData: WorkoutPostItemInterface = {
    id: '1',
    user: {
      name: 'Brian Ortega',
      avatar: 'https://picsum.photos/200/300',
    },
    workoutType: 'Glutes',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 12, weight: 225 },
      { name: 'Pull-ups', sets: 3, reps: 10, weight: 0 },
    ],
    duration: 65,
    createdAt: new Date(),
    imageUrl: 'https://picsum.photos/200/300',
    likes: 24,
    comments: 5,
  };

  return (
    <>
      <Pressable
        onPress={() => {
          router.push(`/workout/${workoutData.id}`);
        }}
        style={{
          flex: 1,
          minHeight: 400,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: colors.card,
        }}
      >
        {/* Header with user info */}
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            padding: 14,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{ uri: workoutData.user.avatar }}
            contentFit="cover"
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
          />

          <View style={{ flex: 1 }}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 15 }}>
              {workoutData.user.name}
            </ThemedText>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ color: 'gray', fontSize: 14 }}>
                finished
                <Text style={{ color: '#007AFF' }}> {workoutData.workoutType}</Text>
              </ThemedText>
              {/* add arrow right */}
              <Ionicons
                name="chevron-forward-outline"
                size={14}
                color={'#007AFF'}
                style={{ alignSelf: 'center' }}
              />
            </View>
          </View>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Pressable style={{ padding: 8, backgroundColor: colors.border, borderRadius: 100 }}>
                <Ionicons name="ellipsis-horizontal-outline" size={18} color={colors.text} />
              </Pressable>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item key="edit">
                <DropdownMenu.ItemTitle>Edit Post</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon ios={{ name: 'pencil' }} />
              </DropdownMenu.Item>
              <DropdownMenu.Item key="delete">
                <DropdownMenu.ItemTitle>Delete Post</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon ios={{ name: 'trash' }} />
              </DropdownMenu.Item>
              <DropdownMenu.Item key="report">
                <DropdownMenu.ItemTitle>Report Post</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon ios={{ name: 'flag' }} />
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </View>

        {/* Workout summary */}
        {/* <View style={{ padding: 14 }}>
          <View style={{ gap: 8 }}>
            {workoutData.exercises.map((exercise, index) => (
              <ThemedText key={index}>
                {exercise.name}: {exercise.sets} x {exercise.reps} @ {exercise.weight}lbs
              </ThemedText>
            ))}
          </View>
        </View> */}

        {/* Workout image */}
        {workoutData.imageUrl && (
          <View style={{ flex: 1, borderRadius: 14 }}>
            <Image
              source={{ uri: workoutData.imageUrl }}
              contentFit="cover"
              style={{
                width: '100%',
                height: 350,
              }}
            />
          </View>
        )}

        {/* Footer with interactions */}
        <View
          style={{
            flexDirection: 'row',
            padding: 14,
            // borderTopWidth: 1,
            // borderTopColor: colors.border,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginRight: 20,
                padding: 8,
                borderRadius: 100,
                backgroundColor: colors.border,
              }}
            >
              {/* <Ionicons name="heart-outline" size={18} color={colors.text} /> */}
              {/* thumbs up */}
              <Ionicons name="thumbs-up-sharp" size={18} color={colors.text} />
              {/* <ThemedText>❤️ {workoutData.likes}</ThemedText> */}
            </Pressable>
            <Pressable
              onPress={handlePresentCommentsPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8,
                borderRadius: 100,
                backgroundColor: colors.border,
              }}
            >
              <Ionicons name="chatbubble-ellipses" size={18} color={colors.text} />
              {/* <ThemedText>💬 {workoutData.comments}</ThemedText> */}
            </Pressable>
          </View>
          {/* date */}
          <ThemedText style={{ color: 'gray', fontSize: 12 }}>
            {/* {workoutData.createdAt.toLocaleDateString()} */}
            {/* relative time */}
            {formatDistanceToNow(workoutData.createdAt)}
          </ThemedText>
        </View>
      </Pressable>

      <CommentsSheet ref={commentsSheetRef} postId={workoutData.id} />
    </>
  );
};

export default WorkoutPostItem;
