'use client';

import { sendMessage } from '@/actions/ai-processor';
import * as AColors from '@bacons/apple-colors';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { Stack, router } from 'expo-router';

import { SFSymbol, SymbolView, SymbolViewProps } from 'expo-symbols';
import type React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as DropdownMenu from 'zeego/dropdown-menu';

import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatMessage {
  id: number;
  prompt: string;
  response: React.ReactNode;
}

export default function Profile() {
  /* ---------------------------------- hooks --------------------------------- */
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const keyboardValue = useKeyboardAnimation();
  // console.log('keyboardValue', keyboardValue);
  /* ---------------------------------- state --------------------------------- */
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(exampleMsg);
  const [msgState, setMsgState] = useState<{
    isGenerating: boolean;
    isLoading: boolean;
    isError: boolean;
    canSubmit: boolean;
  }>({
    isGenerating: false,
    isLoading: false,
    isError: false,
    canSubmit: true,
  });
  /* ----------------------------------- ref ---------------------------------- */
  const flatListRef = useRef<Animated.FlatList>(null);
  //

  /* ---------------------------- function for now ---------------------------- */
  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    // setLoading(true);
    // TODO:generate uuuid later
    const currentId = Date.now();
    const streamingResponse = await sendMessage(prompt);

    setMessages((prev) => [
      ...prev,
      {
        id: currentId,
        prompt,
        response: streamingResponse,
      },
    ]);

    setPrompt('');
    // setLoading(false);
  };

  const scrollViewAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboardValue.value }],
  }));

  /* ---------------------------- message renderer ---------------------------- */
  const renderMessage = ({ item }: { item: ChatMessage }) => {
    return (
      <View
        key={item.id}
        style={{
          paddingHorizontal: 10,
          gap: 14,
        }}
      >
        {/* prompt */}
        <View>
          <View
            style={{
              maxWidth: '80%',
              alignSelf: 'flex-end',
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 24,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              backgroundColor: '#000000',
            }}
          >
            <Text
              style={{
                fontWeight: '500',
                color: 'white',
              }}
            >
              {item.prompt}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              height: 18,
              width: 18,
              backgroundColor: 'white',
              alignSelf: 'flex-end',
              borderRadius: 14,
              // justifyContent: 'flex-end',
              bottom: -4,
              right: -4,
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: 14,
              width: 14,
              backgroundColor: '#000000',
              alignSelf: 'flex-end',
              borderRadius: 30,
              bottom: -2,
              right: -2,
            }}
          />
        </View>

        {/* suspense for server components */}
        <Suspense fallback={<Text>Generating...</Text>}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              gap: 8,
              maxWidth: '95%',
            }}
          >
            {/* random circle for now */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                alignSelf: 'flex-start',
              }}
            >
              {/* <Expoic */}
              <SymbolView
                name="apple.intelligence"
                tintColor={'black'}
                style={{
                  width: 30,
                  height: 30,
                }}
                type="palette"
              />

              {/* <Ionicons name="analy" size={14} color={'white'} /> */}
            </View>

            <View>
              <Text style={{ flex: 1, fontSize: 15, lineHeight: 22 }}>{item.response}</Text>
              {/* have ai generate some ui for the response */}
            </View>
          </View>
        </Suspense>
      </View>
    );
  };

  // const headerRight = () => {
  //   return (
  //     <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
  //       <DropdownMenu.Trigger>
  //         <Pressable>
  //           <SymbolView
  //             name="sparkle"
  //             tintColor={'darkgray'}
  //             style={{
  //               width: 25,
  //               height: 25,
  //             }}
  //             type="palette"
  //           />
  //         </Pressable>
  //       </DropdownMenu.Trigger>

  //       <DropdownMenu.Content>
  //         <DropdownMenu.Item key="new">
  //           <DropdownMenu.ItemTitle>New Chat</DropdownMenu.ItemTitle>
  //           <DropdownMenu.ItemIcon
  //             ios={{
  //               name: 'sparkle',
  //             }}
  //           />
  //         </DropdownMenu.Item>

  //         <DropdownMenu.Item key="clear">
  //           <DropdownMenu.ItemTitle>Clear History</DropdownMenu.ItemTitle>
  //           <DropdownMenu.ItemIcon
  //             ios={{
  //               name: 'sparkle',
  //             }}
  //           />
  //         </DropdownMenu.Item>

  //         <DropdownMenu.Separator />

  //         <DropdownMenu.Item key="settings">
  //           <DropdownMenu.ItemTitle>Settings</DropdownMenu.ItemTitle>
  //           <DropdownMenu.ItemIcon
  //             ios={{
  //               name: 'sparkle',
  //             }}
  //           />
  //         </DropdownMenu.Item>
  //       </DropdownMenu.Content>
  //     </DropdownMenu.Root>
  //   );
  // };

  // const [isOpen, setIsOpen] = useState(false);
  /* --------------------------------- return --------------------------------- */
  return (
    <>
      <Stack.Screen
        options={
          {
            // headerRight,
          }
        }
      />
      <View style={{ flex: 1 }}>
        {/* just a small ui feature here */}

        <Animated.FlatList
          // contentInset={{
          //   // bottom: insets.bottom,
          // }}
          // scrollIndicatorInsets={{
          //   bottom: 400,
          // }}
          // contentInsetAdjustmentBehavior="automatic"
          ref={flatListRef}
          data={messages}
          inverted
          renderItem={renderMessage}
          contentContainerStyle={{
            gap: 24,
            // TOP
            paddingBottom: headerHeight + 10,
            // BOTTOM
            paddingTop: insets.bottom + 46 + 8 + 10,
          }}
          // BOTTOM OF THE Flatlist
          ListHeaderComponentStyle={
            {
              // backgroundColor: 'red',
            }
          }
          // TOP OF THE Flatlist
          ListFooterComponentStyle={
            {
              // backgroundColor: 'red',
              // paddingBottom: 100,
            }
          }
        />
        <ChatInput
          value={prompt}
          setValue={setPrompt}
          sharedValue={keyboardValue}
          onSubmit={handleSubmit}
        />
      </View>
    </>
  );
}
//TODO:
/* -------------------------------------------------------------------------- */
/*                              export once ready                             */
/* -------------------------------------------------------------------------- */
const ChatInput = ({
  value,
  setValue,
  sharedValue,
  onSubmit,
}: {
  value: string;
  setValue: ((text: string) => void) | undefined;
  sharedValue: SharedValue<number>;
  onSubmit: () => void;
}) => {
  /**
   * in order to create a proper IOS blur fronm behind the text and behind the inupt and keyboard
   * reanimated has to push up the flatlist
   * and push up the text input container above the keyboard
   */
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -sharedValue.value }],
    // bottom: 0,
  }));

  // height of input is what?

  // 46 + bottom + 8

  return (
    <View>
      <BlurView
        intensity={100}
        tint="light"
        style={{
          paddingBottom: bottom,
          paddingHorizontal: 10,
          paddingTop: 8,
          position: 'absolute',
          backgroundColor:
            colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 30,
            minHeight: 46,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(244,244,244,1)',
          }}
        >
          <SymbolView
            name="plus"
            tintColor={'black'}
            style={{
              width: 21,
              height: 21,
              // backgroundColor: 'red',
              marginLeft: 10,
            }}
            type="palette"
          />
          <TextInput
            value={value}
            onChangeText={setValue}
            onSubmitEditing={onSubmit}
            placeholder="Message"
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              backgroundColor: 'transparent',
              fontWeight: '500',
              fontSize: 16,
            }}
          />
          <Pressable
            style={{ marginRight: 10, padding: 5, backgroundColor: 'black', borderRadius: 24 }}
          >
            <SymbolView
              name="microphone"
              tintColor={'white'}
              style={{
                width: 21,
                height: 21,
                // backgroundColor: 'red',
                // backgroundColor: 'red',
                // padding: 10,
                // marginRight: 10,
              }}
              type="palette"
            />
          </Pressable>
        </View>
      </BlurView>
      <Animated.View style={inputAnimatedStyle} />
    </View>
  );
};

/* ------------------------------- aware input ------------------------------ */
const useKeyboardAnimation = () => {
  const keyboardValue = useSharedValue(0);

  useEffect(() => {
    const keyboardWillShow = (event) => {
      const keyboardHeight = event.endCoordinates?.height ?? 0;
      keyboardValue.value = withSpring(keyboardHeight, {
        damping: 20,
        stiffness: 140,
        mass: 0.4,
      });
    };

    const keyboardWillHide = () => {
      keyboardValue.value = withSpring(0, {
        damping: 20,
        stiffness: 140,
        mass: 0.5,
      });
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardValue]);

  return keyboardValue;
};

/* -------------------------------------------------------------------------- */
/*                                example data                                */
/* -------------------------------------------------------------------------- */
const exampleMsg = [
  {
    id: 1,
    prompt: 'What is the weather in Tokyo?',
    response: 'The weather in Tokyo is sunny and warm.',
  },
  {
    id: 2,
    prompt: 'Can you help me write a React component?',
    response:
      'I can help you create a React component. What functionality would you like it to have?',
  },
  {
    id: 3,
    prompt: 'What are some good books to learn JavaScript?',
    response:
      'Some popular books for learning JavaScript include "Eloquent JavaScript" by Marijn Haverbeke, "You Don\'t Know JS" series by Kyle Simpson, and "JavaScript: The Good Parts" by Douglas Crockford.',
  },
  {
    id: 4,
    prompt: 'How do I handle state in React Native?',
    response:
      'In React Native, you can manage state using useState hook for local component state, or use state management libraries like Redux or Context API for global state management.',
  },
  {
    id: 5,
    prompt: "What's the difference between flex and grid layouts?",
    response:
      'Flexbox is designed for one-dimensional layouts (either rows OR columns), while Grid is designed for two-dimensional layouts (rows AND columns). Flex is great for distributing space along a single axis, while Grid excels at creating complex grid-based layouts.',
  },
  {
    id: 6,
    prompt: 'How can I optimize my React Native app performance?',
    response:
      'To optimize React Native performance, you can use techniques like implementing proper memo and useCallback hooks, avoiding unnecessary re-renders, using FlatList for long lists, and optimizing images and animations.',
  },
  {
    id: 7,
    prompt: 'What are the best practices for error handling in JavaScript?',
    response:
      'Best practices include using try-catch blocks, implementing proper error boundaries, creating custom error classes, handling async errors with .catch(), and providing meaningful error messages to users.',
  },
  {
    id: 8,
    prompt: 'How do I implement dark mode in my app?',
    response:
      'You can implement dark mode by creating a theme context, using CSS variables or styled-components, storing user preferences, and responding to system theme changes using useColorScheme hook.',
  },
  {
    id: 9,
    prompt: "What's the difference between useMemo and useCallback?",
    response:
      'useMemo memoizes computed values while useCallback memoizes functions. useMemo prevents expensive calculations from running on every render, while useCallback prevents unnecessary re-renders of child components that depend on callback functions.',
  },
  {
    id: 10,
    prompt: 'How can I handle authentication in my app?',
    response:
      'You can implement authentication using JWT tokens, OAuth, or third-party services like Firebase Auth. Store tokens securely, implement protected routes, and handle token refresh logic.',
  },
  {
    id: 11,
    prompt: 'What are the best practices for API calls in React Native?',
    response:
      'Use axios or fetch with proper error handling, implement request interceptors, cache responses when appropriate, show loading states, and handle offline scenarios gracefully.',
  },
  {
    id: 12,
    prompt: 'How do I implement push notifications?',
    response:
      'You can use libraries like Firebase Cloud Messaging or OneSignal, request user permissions, handle both foreground and background notifications, and implement proper notification channels for Android.',
  },
];
