import Link from "next/link";
import { BriefcaseIcon } from '@heroicons/react/20/solid'

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full px-8 md:px-16 py-4 text-white bg-black">
      <Link href="/" className="group flex space-x-3">
        <span className="text-amber-600 flex items-center justify-center">
          <BriefcaseIcon className="h-10 w-10" aria-hidden="true" />
        </span>
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight group-hover:text-white/70">
          /shareJOBpost.com
        </h1>
      </Link>
      <a
        href="https://github.com/felipetodev/share-job-post"
        target="_blank"
        rel="noreferrer"
      >
        <svg className="group w-10 h-10" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="group-hover:stroke-white/60" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <path className="group-hover:stroke-white/60" d="M14.333 19v-1.863c.025-.31-.018-.62-.126-.913a2.18 2.18 0 00-.5-.781c2.093-.227 4.293-1 4.293-4.544 0-.906-.358-1.778-1-2.434a3.211 3.211 0 00-.06-2.448s-.787-.227-2.607.961a9.152 9.152 0 00-4.666 0c-1.82-1.188-2.607-.96-2.607-.96A3.211 3.211 0 007 8.464a3.482 3.482 0 00-1 2.453c0 3.519 2.2 4.291 4.293 4.544a2.18 2.18 0 00-.496.773 2.134 2.134 0 00-.13.902V19M9.667 17.702c-2 .631-3.667 0-4.667-1.948" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  )
}
