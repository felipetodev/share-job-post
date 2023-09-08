import Footer from '../components/Footer'
import Header from '../components/Header'
import Selector, { vibes } from '../components/Selector'
import { RoughNotation } from 'react-rough-notation'
import { type ChangeEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useChat } from 'ai/react'
import type { JobPost } from '../types'

const SocialPopover = dynamic(async () => await import('../components/SocialPopover'))

const initialState: JobPost = {
  jobPosition: '',
  jobDescription: '',
  jobVibe: vibes[0].name
}

export default function Home () {
  const [state, setState] = useState<JobPost>(initialState)
  const [shortedUrl, setShortedUrl] = useState<string>('')

  const { input, error, stop, isLoading, messages, handleInputChange, handleSubmit } =
  useChat({
    api: '/api/job-post',
    body: { ...state },
    onResponse () {
      console.log('✅')
    }
  })

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, [target.name]: target.value.trim() })
  }

  const generateJobPost = async (e: any) => {
    e.preventDefault()
    if (!state.jobPosition || !state.jobDescription) {
      return toast.error('complete all fields')
    }

    handleSubmit(e)
    setShortedUrl('')
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const lastMessage = messages[messages.length - 1]
  const generatedJobPost = lastMessage?.role === 'assistant' ? lastMessage.content : null

  return (
    <div className="pattern-grid-lg text-white/5">
      <Head>
        <title>Share Job Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="my-10 flex flex-col text-white max-w-5xl mx-auto items-center justify-center py-2 min-h-screen">
        <div className="text-center mb-10">
          <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold">
            Share job post in{' '}
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
        <form onSubmit={generateJobPost} className="mx-8 md:mx-auto md:w-[590px]">
          <div className="flex items-center space-x-3 mt-8 mb-4">
            <span className="border-2 border-amber-500 flex items-center justify-center bg-amber-500 rounded-full p-3 h-4 w-4 text-white font-bold">
              {'1'}
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
              {'2'}
            </span>
            <p className="text-left font-medium">
              What are the requirements for this position?
            </p>
          </div>
          <textarea
            name="jobDescription"
            rows={4}
            value={input}
            onChange={(e) => {
              handleInputChange(e)
              handleInput(e)
            }}
            placeholder="e.g. Experience using JavaScript frameworks and libraries, such as React, fluent english, Ability to write effective unit, integration, and E2E tests, etc."
            className="relative flex items-center w-full text-black rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          />
          <div className="flex items-center space-x-3 mt-8 mb-4">
            <span className="border-2 border-amber-500 flex items-center justify-center bg-amber-500 rounded-full p-3 h-4 w-4 text-white font-bold">
              {'3'}
            </span>
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <Selector onChange={handleInput} />
          {isLoading
            ? (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:border-amber-500 hover:bg-[#1f1f1f]/60 w-full border border-white"
              onClick={stop}
            >
              Loading... (stop)
            </button>
              )
            : (
            <button
              type='submit'
              disabled={isLoading}
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:border-amber-500 hover:bg-[#1f1f1f]/60 w-full border border-white"
              onClick={generateJobPost}
            >
              Generate your post &rarr;
            </button>
              )}

        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        {generatedJobPost && (
          <div className="mb-10 mx-8 md:mx-auto mt-14 pt-8 border-t border-gray-600">
            <div className="relative bg-[#1f1f1f]/60 pb-6 pt-4 px-6 rounded-md md:w-full">
              <h2 className="mx-auto md:max-w-3xl text-center text-3xl font-bold sm:text-5xl">
                Job Post:
              </h2>
              <pre className="font-[inherit] mt-6 md:max-w-3xl text-ellipsis overflow-hidden whitespace-pre-wrap break-words">
                {generatedJobPost}
              </pre>
              <SocialPopover
                shortedUrl={shortedUrl}
                setShortedUrl={setShortedUrl}
                jobPost={generatedJobPost}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
