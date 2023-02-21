import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { copyToClipboard, shareLinkedIn, shareTwitter } from '../utils/social'

interface Props {
  jobPost: string;
  shortedUrl: string;
  setShortedUrl: (url: string) => void;
}

export default function SocialPopover({ jobPost, shortedUrl, setShortedUrl }: Props) {
  const onCopyToClipboard = async () => {
    const toast = (await import("react-hot-toast")).toast
    copyToClipboard(jobPost, toast)
  }
  return (
    <div className="absolute top-3 right-3">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={open ? '' : 'text-opacity-90'}
            >
              <span className="font-bold cursor-pointer top-4 right-4 text-amber-600 flex items-center justify-center">
                <span className='hidden sm:flex'>Share</span>
                <ClipboardDocumentIcon className="ml-1 h-6 w-6" aria-hidden="true" />
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-2 sm:left-1/2 z-10 mt-3 -translate-x-1/2 transform">
                <div className="overflow-hidden rounded-lg">
                  <div className="relative flex flex-col bg-white p-1">
                    <button
                      onClick={onCopyToClipboard}
                      className="flex rounded-lg transition duration-150 ease-in-out py-2 hover:bg-amber-100"
                    >
                      <div className="flex mx-5 gap-2 items-center justify-center">
                        <span className='text-black bg-orange-300 outline-orange-300 outline rounded-full'>
                          <Clipboard />
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          Clipboard
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={async () => {
                        const { href, shortUrl } = await shareTwitter(jobPost, shortedUrl)
                        window.open(href, '_blank')
                        if (shortUrl !== shortedUrl) {
                          setShortedUrl(shortUrl)
                        }
                      }}
                      className="flex rounded-lg transition duration-150 ease-in-out py-2 hover:bg-amber-100"
                    >
                      <div className="flex mx-5 gap-2 items-center justify-center">
                        <span className='text-black'>
                          <TwitterIcon />
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          Twitter
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={async () => {
                        const { shortUrl } = await shareLinkedIn(jobPost, shortedUrl)
                        if (shortUrl !== shortedUrl) {
                          setShortedUrl(shortUrl)
                        }
                      }}
                      className="flex rounded-lg transition duration-150 ease-in-out py-2 hover:bg-amber-100"
                    >
                      <div className="flex mx-5 gap-2 items-center justify-center">
                        <span className='text-black'>
                          <LinkedInIcon />
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          LinkedIn
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

function TwitterIcon() {
  return (
    <svg className='w-5 h-5' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Twitter</title>
      <path fill="#1e9bf0" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  )
}

function Clipboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className='w-5 h-5' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>LinkedIn</title>
      <path fill="#0c65c2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
