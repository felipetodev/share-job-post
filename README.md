# [Share Job Post](https://www.sharejobpost.com)

This project generate a job post for you using AI.

[![sharejobpost](./public/screenshot.gif)](https://www.sharejobpost.com)

## Features

- Job description generation using [**Llama2**](https://replicate.com/meta/llama-2-70b-chat) & [**Vercel AI SDK**](https://sdk.vercel.ai/docs).
- Url shortener with [**Upstash**](https://upstash.com) **Redis**.
- Vercel edge functions with streaming and middleware redirect.

## Running Locally

After cloning the repo, go to [Replicate Provider](https://sdk.vercel.ai/docs/guides/providers/replicate) and put your API key in a file called `.env` _(same as `.env.example`)_. The Upstash API keys are not necessary; they are only used for sharing a job post and generating a unique URL for that post.

Finally, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
pnpm dev
```
