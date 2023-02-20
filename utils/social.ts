async function urlShortener (post: string) {
    const res = await fetch("/api/url-shortener", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: post }),
    });
    if (!res.ok) throw new Error("failed to shorten url")
    const { url } = await res.json()
    return url
}

export function copyToClipboard(jobPost: string, toast: any) {
  if (!jobPost) return toast.error("no job post to copy")
  const post = `
    ${jobPost}

made with @sharejobpost ❤️
  `.trim()
  navigator.clipboard.writeText(post).then(() => {
    toast.success("copied to clipboard");
  }, (err) => {
    toast.error("failed to copy to clipboard");
    console.error(err);
  });
}

export async function shareTwitter(post: string) {
  const shortUrl = await urlShortener(post)
  const parsePost = `
We're hiring!

${post.split(" ", 24).join(" ")}...

check out complete job post below 👇:
${shortUrl}

made with @sharejobpost.com ❤️
  `.trim()
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(parsePost)}`
}

export async function shareLinkedIn(post: string) {
  const shortUrl = await urlShortener(post)
  window.open(
    `http://www.linkedin.com/shareArticle?mini=true&url=${shortUrl}`,
    "",
    "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
  );
}
