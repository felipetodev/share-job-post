import { setUrl } from "../../utils/redis";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const { url } = (await req.json()) as { url: string };
  const ecodedUrl = encodeURIComponent(url);
  const key = crypto.randomUUID().replaceAll("-", "");
  await setUrl(key, ecodedUrl)
  return new Response(JSON.stringify({ url: `https://sharejobpost.com/post/${key}` }), { status: 200 });
}