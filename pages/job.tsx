import { useRouter } from "next/router";

export default function Job() {
  const router = useRouter()
  return (
    <div className="mt-6 md:max-w-3xl text-ellipsis overflow-hidden whitespace-pre-wrap break-words">
      {router.query.post ?? "No job post found"}
    </div>
  )
}
