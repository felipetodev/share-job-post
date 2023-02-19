import Footer from "../components/Footer";
import Header from "../components/Header";
import Selector, { vibes } from "../components/Selector";
import { RoughNotation } from "react-rough-notation";
import { ChangeEvent, useState } from "react";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import type { JobPost } from "../types";

const Popover = dynamic(() => import("../components/Popover"))

const initialState: JobPost = {
  jobPosition: "",
  jobDescription: "",
  jobVibe: vibes[0].name,
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [jobPost, setJobPost] = useState<string>("");
  const [state, setState] = useState<JobPost>(initialState)

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [target.name]: target.value.trim() })
  }

  const generateJobPost = async () => {
    setJobPost("")
    setLoading(true)
    const response = await fetch('/api/job-post', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })

    if (!response.ok) {
      console.log("error", response.statusText);
      setLoading(false);
      return;
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setJobPost((prev) => prev + chunkValue);
    }
    setLoading(false);
  }

  return (
    <div className="pattern-grid-lg text-white/5">
      <Header />
      <div className="mt-10 flex flex-col text-white max-w-5xl mx-auto items-center justify-center py-2 min-h-screen">
        <div className="text-center mb-10">
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold">
            Share job post in{" "}
            <RoughNotation
              type="underline"
              show
              iterations={3}
              animationDelay={500}
              color="#d97707"
              strokeWidth={3}
            >
              seconds.
            </RoughNotation>
          </h1>
        </div>
        <div className="mx-8 md:mx-auto md:w-[590px]">
          <div className="flex items-center space-x-3 mt-8 mb-4">
            <span className="border-2 border-amber-500 flex items-center justify-center bg-amber-500 rounded-full p-3 h-4 w-4 text-white font-bold">
              {"1"}
            </span>
            <p className="text-left font-medium">
              What is the name of the position you are looking for?
            </p>
          </div>
          <input
            name="jobPosition"
            onChange={handleInput}
            className="relative flex items-center w-full text-black rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            placeholder="e.g. Frontend Developer Junior"
            type="text"
          />
          <div className="flex items-center space-x-3 mt-8 mb-4">
            <span className="border-2 border-amber-500 flex items-center justify-center bg-amber-500 rounded-full p-3 h-4 w-4 text-white font-bold">
              {"2"}
            </span>
            <p className="text-left font-medium">
              What are the requirements for this position?
            </p>
          </div>
          <textarea
            name="jobDescription"
            rows={4}
            onChange={handleInput}
            placeholder="e.g. Experience using JavaScript frameworks and libraries, such as React, fluent english, Ability to write effective unit, integration, and E2E tests, etc."
            className="relative flex items-center w-full text-black rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          />
          <div className="flex items-center space-x-3 mt-8 mb-4">
            <span className="border-2 border-amber-500 flex items-center justify-center bg-amber-500 rounded-full p-3 h-4 w-4 text-white font-bold">
              {"3"}
            </span>
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <Selector onChange={handleInput} />
          <button
              disabled={loading}
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:border-amber-500 hover:bg-[#1f1f1f]/60 w-full border border-white"
              onClick={generateJobPost}
            >
              Generate your post &rarr;
          </button>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        {jobPost && (
          <div className="mb-10 mx-8 md:mx-auto mt-14 pt-8 border-t border-gray-600">
            <div className="relative bg-[#1f1f1f]/60 pb-6 pt-4 px-6 rounded-md md:w-full">
              <h2 className="mx-auto md:max-w-3xl text-center text-3xl font-bold sm:text-5xl">
                Job Post:
              </h2>
              <pre className="font-[inherit] mt-6 md:max-w-3xl text-ellipsis overflow-hidden whitespace-pre-wrap break-words">
                {jobPost}
              </pre>
              <Popover jobPost={jobPost} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
