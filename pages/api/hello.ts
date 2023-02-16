export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  return new Response("Hello world!");
}
