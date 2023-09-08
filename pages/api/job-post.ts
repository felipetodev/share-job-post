import Replicate from 'replicate';
import { type Message, ReplicateStream, StreamingTextResponse } from 'ai';
import { experimental_buildLlama2Prompt } from 'ai/prompts';
import type { JobPost } from "../../types";

export const config = {
  runtime: "edge",
};

if (!process.env.REPLICATE_API_KEY) {
  throw new Error("Replicate key is not set");
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || '',
});

const MODEL_META_LLAMA_270bchat = '2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1'

export default async function handler(req: Request) {
  const { jobPosition, jobDescription, jobVibe } = (await req.json()) as JobPost;

  if (!jobPosition || !jobDescription || !jobVibe) {
    return new Response("No prompt in the request", { status: 500 });
  }

  try {
    const promptTemplate: Message[] = [{
      id: crypto.randomUUID(),
      role: 'user',
      content: `I want you to act like a job recruiter looking for a ${jobPosition}.
      Write the job post with a ${jobVibe} tone.
      Here is the job description: ${jobDescription}.
      At the end of the job post add a bulleted list with main skills for that job and some expected soft skills.
      Do not repeat sentences and make sure all sentences are clear and complete:`
    }]

    const response = await replicate.predictions.create({
      stream: true,
      version: MODEL_META_LLAMA_270bchat,
      input: {
        prompt: experimental_buildLlama2Prompt(promptTemplate),
      },
    })

    const stream = await ReplicateStream(response);

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    const error = (e?.message || 'Something went wrong');
    console.error(error);

    let errMessage = error.includes('the free time limit')
      ? 'The free time limit has been reached. Please try again later.'
      : error;

    return new Response(errMessage, { status: 500 });
  }
}
