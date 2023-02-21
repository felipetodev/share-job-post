# [Share Job Post](https://www.sharejobpost.com)

This project generate a job post for you using AI.

[![sharejobpost](./public/screenshot.gif)](https://www.sharejobpost.com)

## Features

- Job description generation using OpenAI API (**text-davinci-003**).
- Url shortener with [**Upstash**](https://upstash.com) **Redis**.
- Vercel edge functions with streaming and middleware redirect.

## Running Locally

After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) and put your API key in a file called `.env`. Same for Upstash but it's necessary just for share a job post on Twitter or LinkedIn.

Finally, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
pnpm dev
```
