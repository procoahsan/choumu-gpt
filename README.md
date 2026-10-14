# ChoumuGPT

A responsive, fictional parody chat experience with three persona-specific character flows. The supplied studio portrait sheets are used locally; every avatar is focused on its face close-up rather than the back-view panel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Use a free conversational LLM

The app works without an account using its local persona-aware mock replies. To make the Choumus answer open-ended questions with an LLM, use OpenRouter's free router:

1. Create an API key at [OpenRouter](https://openrouter.ai/keys).
2. Copy `.env.example` to `.env.local`.
3. Set `OPENROUTER_API_KEY` to your key. Do not use a `NEXT_PUBLIC_` prefix and do not commit `.env.local`.
4. Restart `npm run dev`.

`OPENROUTER_MODEL=openrouter/free` is already configured. It lets OpenRouter choose from its currently available free models. You can instead set a particular available free model ID when you want a fixed model.

The browser talks only to `POST /api/chat`; the API key and each persona's system prompt stay on the server. If OpenRouter is unavailable, the app automatically falls back to the local mock provider so chat remains functional.

## Verify

```bash
npm run lint
npm run build
```

Chat histories are persisted independently in browser local storage. The characters and responses are fictional parody content for entertainment.
