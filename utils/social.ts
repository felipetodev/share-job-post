export async function copyToClipboard(jobPost: string, toast: any) {
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

export function shareTwitter(post: string) {
  const parsePost = `
    ${post.split(" ", 24).join(" ")}...

check out this job post below 👇:
https://sharejobpost.com/post/jkwql8s

made with @sharejobpost ❤️
  `.trim()
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(parsePost)}`
}

export function shareLinkedIn(post: string) {
  let url = "http://sharejobpost.com"
  window.open(
    `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
    "",
    "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
  );
}
