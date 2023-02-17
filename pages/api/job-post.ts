import { OpenAIStream } from "../../utils/aistream";
import type { JobPost } from "../../types";

export const config = {
  runtime: "edge",
};

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OpenAI key is not set");
}

export default async function handler(req: Request) {
  const { jobPosition, jobDescription, jobVibe } = (await req.json()) as JobPost;

  if (!jobPosition || !jobDescription || !jobVibe) {
    return new Response("No prompt in the request", { status: 500 });
  }

  try {
    const prompt = `I want you to act like a job recruiter looking for a ${jobPosition}. Write the job post with a ${jobVibe} tone. Here is the job description: ${jobDescription}. At the end of the job post add a bulleted list with main skills for that job and some expected soft skills. Do not repeat sentences and make sure all sentences are clear and complete:`;

    const payload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream, { status: 200 });
  } catch (e: any) {
    console.log({ e });
    return new Response(e, { status: 500 });
  }
}
