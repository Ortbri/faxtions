// import React from 'react';
// import { Text, View } from 'react-native';
// import { LLAMA3_2_1B_URL, useLLM } from 'react-native-executorch';

// export default function ExecutorchTest() {
//   const llama = useLLM({
//     modelSource: LLAMA3_2_1B_URL,
//     tokenizerSource: require('../assets/tokenizer.bin'),
//     contextWindowLength: 3,
//     systemPrompt: 'You are a helpful assistant.',
//   });

//   async function generateResponse() {
//     const message = 'Hi, who are you?';
//     const response = await llama.generate(message);
//     return response;
//   }

//   // const response = generateResponse();
//   // console.log(JSON.stringify(response, null, 2));
//   return (
//     <View>
//       {llama.error && <Text>Error: {llama.error}</Text>}
//       {!llama.isModelReady && <Text>Loading model... {llama.downloadProgress}%</Text>}
//       {llama.isModelReady && <Text>Model loaded successfully!</Text>}
//     </View>
//   );
// }
