'use client';

import { sendMessage } from '@/actions/ai-processor';
import type React from 'react';
import { Suspense, useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';

interface ChatMessage {
  id: number;
  prompt: string;
  response: React.ReactNode;
}

export default function Profile() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
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
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 20 }}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={{
              padding: 10,
              borderRadius: 8,
              backgroundColor: '#f5f5f5',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              You: {msg.prompt}
            </Text>
            <Suspense fallback={<Text>Generating...</Text>}>
              <Text>AI: {msg.response}</Text>
            </Suspense>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: '#eee',
          marginBottom: 100, // tab bar here for right now
        }}
      >
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Ask anything..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            backgroundColor: '#f5f5f5',
          }}
        />
        <Button
          title={loading ? '...' : 'Send'}
          onPress={handleSubmit}
          disabled={loading || !prompt.trim()}
        />
      </View>
    </View>
  );
}
