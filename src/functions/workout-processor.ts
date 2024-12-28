// actions/workout-processor.tsx
"use server";
import OpenAI from "openai";
import type { WSet, WSession } from "@/types/wTracker";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processVoiceInput(
  voiceText: string,
  currentSession?: WSession,
): Promise<WSet> {
  const systemPrompt = `You are a workout logging assistant. Parse the user's voice input into structured workout data.
  Expected format for responses:
  {
    "exercise": string,
    "weight": number (in lbs),
    "reps": number,
    "notes": string (optional)
  }

  Example inputs and outputs:
  "bench press 225 for 5" -> { "exercise": "Bench Press", "weight": 225, "reps": 5 }
  "squats body weight for 10" -> { "exercise": "Squats", "weight": 0, "reps": 10, "notes": "bodyweight" }`;

  // using chat
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: voiceText },
    ],
    response_format: { type: "json_object" },
  });

  try {
    const parsedSet: WSet = JSON.parse(response.choices[0].message.content);
    return parsedSet;
  } catch (error) {
    console.error("Failed to parse OpenAI response:", error);
    throw new Error("Failed to process voice input");
  }
}
