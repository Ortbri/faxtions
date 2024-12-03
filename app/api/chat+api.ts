import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!process.env.EXPO_PUBLIC_OPENAI_API_KEY) {
      throw new Error('EXPO_PUBLIC_OPENAI_API_KEY is not defined');
    }

    // Set the API key as an environment variable
    process.env.OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

    // Just use the model without any settings for now
    const model = openai('gpt-4o-2024-11-20');

    const result = streamText({
      model,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
