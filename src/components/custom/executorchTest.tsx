// import { useEffect, useRef, useState } from 'react';
// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from 'react-native';
// import { LLAMA3_2_1B_QLORA, useLLM } from 'react-native-executorch';
// import Animated, {
//   interpolateColor,
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withTiming,
// } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export type SenderType = 'user' | 'ai';

// export interface MessageType {
//   text: string;
//   from: SenderType;
// }

// // AnimatedChatLoading Component
// function AnimatedChatLoading() {
//   const progress = useSharedValue(0);
//   progress.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       backgroundColor: interpolateColor(progress.value, [0, 1], ['#E5E7EB', '#9CA3AF', '#4B5563']),
//     };
//   });

//   return (
//     <View style={styles.messageLoadingContainer}>
//       <Animated.View style={[styles.loadingDot, animatedStyle]} />
//       <Animated.View style={[styles.loadingDot, animatedStyle]} />
//       <Animated.View style={[styles.loadingDot, animatedStyle]} />
//     </View>
//   );
// }

// // MessageItem Component
// const MessageItem = ({ message }: { message: MessageType }) => {
//   return (
//     <View style={message.from === 'ai' ? styles.aiMessage : styles.userMessage}>
//       {message.from === 'ai' && (
//         <View style={styles.aiMessageIconContainer}>
//           <Text>🤖</Text>
//         </View>
//       )}
//       <Text style={styles.messageText}>{message.text}</Text>
//     </View>
//   );
// };

// // Messages Component
// function Messages({
//   chatHistory,
//   llmResponse,
//   isGenerating,
// }: {
//   chatHistory: MessageType[];
//   llmResponse: string;
//   isGenerating: boolean;
// }) {
//   const scrollViewRef = useRef<ScrollView>(null);

//   return (
//     <View style={styles.chatContainer}>
//       <ScrollView
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}
//       >
//         <View onStartShouldSetResponder={() => true}>
//           {chatHistory.map((message, index) => (
//             <MessageItem key={message.text + index} message={message} />
//           ))}
//           {isGenerating && (
//             <View style={styles.aiMessage}>
//               <View style={styles.aiMessageIconContainer}>
//                 <Text>🤖</Text>
//               </View>
//               {!llmResponse ? (
//                 <View style={styles.messageLoadingContainer}>
//                   <AnimatedChatLoading />
//                 </View>
//               ) : (
//                 <Text style={styles.messageText}>{llmResponse.trim()}</Text>
//               )}
//             </View>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// // Main ChatScreen Component
// export default function ChatScreen() {
//   const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
//   const [isTextInputFocused, setIsTextInputFocused] = useState(false);
//   const [userInput, setUserInput] = useState('');
//   const llama = useLLM({
//     modelSource: LLAMA3_2_1B_QLORA,
//     tokenizerSource: require('../../assets/tokenizer.bin'),
//     contextWindowLength: 6,
//   });
//   const textInputRef = useRef<TextInput>(null);

//   useEffect(() => {
//     if (llama.response && !llama.isGenerating) {
//       appendToMessageHistory(llama.response, 'ai');
//     }
//   }, [llama.response, llama.isGenerating]);

//   const appendToMessageHistory = (input: string, role: SenderType) => {
//     setChatHistory((prevHistory) => [...prevHistory, { text: input, from: role }]);
//   };

//   const sendMessage = async () => {
//     appendToMessageHistory(userInput.trim(), 'user');
//     setUserInput('');
//     textInputRef.current?.clear();
//     try {
//       await llama.generate(userInput);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return !llama.isReady ? (
//     <View style={styles.loadingContainer}>
//       <Text>Loading the model {(llama.downloadProgress * 100).toFixed(0)}%</Text>
//     </View>
//   ) : (
//     <SafeAreaView style={styles.container}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           keyboardVerticalOffset={Platform.OS === 'android' ? 100 : 70}
//         >
//           <View style={styles.topContainer}>
//             <Text>🤖</Text>
//             <Text style={styles.textModelName}>Llama 3.2 1B QLoRA</Text>
//           </View>
//           {chatHistory.length ? (
//             <View style={styles.chatContainer}>
//               <Messages
//                 chatHistory={chatHistory}
//                 llmResponse={llama.response}
//                 isGenerating={llama.isGenerating}
//               />
//             </View>
//           ) : (
//             <View style={styles.helloMessageContainer}>
//               <Text style={styles.helloText}>Hello! 👋</Text>
//               <Text style={styles.bottomHelloText}>What can I help you with?</Text>
//             </View>
//           )}

//           <View style={styles.bottomContainer}>
//             <TextInput
//               onFocus={() => setIsTextInputFocused(true)}
//               onBlur={() => setIsTextInputFocused(false)}
//               style={{
//                 ...styles.textInput,
//                 borderColor: isTextInputFocused ? '#1F2937' : '#E5E7EB',
//               }}
//               placeholder="Your message"
//               placeholderTextColor={'#C1C6E5'}
//               multiline={true}
//               ref={textInputRef}
//               onChangeText={(text: string) => setUserInput(text)}
//             />
//             {userInput && (
//               <TouchableOpacity
//                 style={styles.sendChatTouchable}
//                 onPress={async () => !llama.isGenerating && (await sendMessage())}
//               >
//                 <Text>📤</Text>
//               </TouchableOpacity>
//             )}
//             {llama.isGenerating && (
//               <TouchableOpacity style={styles.sendChatTouchable} onPress={llama.interrupt}>
//                 <Text>⏸️</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: 40,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   topContainer: {
//     height: 68,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   chatContainer: {
//     flex: 10,
//     width: '100%',
//   },
//   textModelName: {
//     color: '#1F2937',
//   },
//   helloMessageContainer: {
//     flex: 10,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   helloText: {
//     fontFamily: 'medium',
//     fontSize: 30,
//     color: '#1F2937',
//   },
//   bottomHelloText: {
//     fontFamily: 'regular',
//     fontSize: 20,
//     lineHeight: 28,
//     color: '#1F2937',
//   },
//   bottomContainer: {
//     height: 100,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   textInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderRadius: 8,
//     lineHeight: 19.6,
//     fontFamily: 'regular',
//     fontSize: 14,
//     color: '#1F2937',
//     padding: 16,
//   },
//   sendChatTouchable: {
//     height: '100%',
//     width: 48,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//   },
//   messageLoadingContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: 28,
//   },
//   loadingDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   aiMessage: {
//     flexDirection: 'row',
//     maxWidth: '80%',
//     alignSelf: 'flex-start',
//     marginVertical: 8,
//   },
//   userMessage: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginRight: 8,
//     marginVertical: 8,
//     maxWidth: 220,
//     borderRadius: 8,
//     backgroundColor: '#E5E7EB',
//     alignSelf: 'flex-end',
//   },
//   aiMessageIconContainer: {
//     backgroundColor: '#E5E7EB',
//     height: 32,
//     width: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 16,
//     marginHorizontal: 7,
//   },
//   messageText: {
//     fontSize: 14,
//     lineHeight: 19.6,
//     color: '#1F2937',
//     fontFamily: 'regular',
//   },
// });
