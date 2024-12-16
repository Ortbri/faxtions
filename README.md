# groq notes

## Supabase Setup

1. Create a new Supabase project at <https://supabase.com>
2. Get your project URL and anon key from the project settings
3. Create a .env file in the project root with the following variables:

   ```
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-project-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Install dependencies: `npm install` or `yarn install`

```bash
curl <https://api.x.ai/v1/chat/completions> -H "Content-Type: application/json" -H "Authorization: Bearer <your-api-key>" -d '{
  "messages": [
    {
      "role": "system",
      "content": "You are a test assistant."
    },
    {
      "role": "user",
      "content": "Testing. Just say hi and hello world and nothing else."
    }
  ],
  "model": "grok-beta",
  "stream": false,
  "temperature": 0
}'
```
