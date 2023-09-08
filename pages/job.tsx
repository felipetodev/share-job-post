import Head from 'next/head'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { RoughNotation } from 'react-rough-notation'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { copyToClipboard } from '../utils/social'

export default function Job () {
  const router = useRouter()
  if (!router.isReady) return <span>Loading...</span>
  return (
    <div className="pattern-grid-lg text-white/5">
      <Head>
        <title>Share Job Post | We&rsquo;re Hiring!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div onClick={async () => {
        if (!router.query.post) return
        const { toast } = await import('react-hot-toast')
        copyToClipboard(router.query.post as string, toast)
      }}
        className="cursor-copy bg-[#1f1f1f]/60 rounded-2xl flex flex-col text-white max-w-5xl mx-auto items-center justify-center my-6 min-h-screen"
      >
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold">
          <RoughNotation
            type="underline"
            show
            iterations={3}
            animationDelay={500}
            color="#d97707"
            strokeWidth={3}
          >
            We&rsquo;re hiring!
          </RoughNotation>
        </h1>
        <div className="mt-16 text-xl md:max-w-3xl text-ellipsis overflow-hidden whitespace-pre-wrap break-words">
          {router.query.post ?? 'No job post found'}
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <Footer />
    </div>
  )
}
