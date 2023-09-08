import { type NextRequest, NextResponse } from 'next/server'
import { getUrl } from './utils/redis'

export async function middleware (req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/job')) {
    const path = req.nextUrl.pathname.split('/')[2]
    if (path) {
      const url = await getUrl(path)

      if (url) {
        return NextResponse.redirect(`https://sharejobpost.com/job?post=${url}`)
      }
    }
  }
}
