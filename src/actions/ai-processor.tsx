// app/actions/ai-processor.ts
'use server';

import OpenAI from 'openai';
import { Text } from 'react-native';
import { Suspense } from 'react';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
});

async function askLLMAsync(message: string) {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    stream: true,
  });
  
  // Convert OpenAI stream to Web API ReadableStream
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const part of stream) {
        const text = part.choices[0]?.delta?.content || '';
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    }
  });

  return readableStream;
}

async function RecursiveText({ buffer }: { buffer: ReadableStreamDefaultReader }) {
  const { done, value } = await buffer.read();
  
  if (done) return null;
  
  const text = new TextDecoder().decode(value);
  
  return (
    <Text>
      {text}
      <Suspense>
        <RecursiveText buffer={buffer} />
      </Suspense>
    </Text>
  );
}

export async function sendMessage(text: string) {
  const stream = await askLLMAsync(text);
  return (
    <Suspense>
      <RecursiveText buffer={stream.getReader()} />
    </Suspense>
  );
}