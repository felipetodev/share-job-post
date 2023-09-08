import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    const description = 'Share job post in seconds.'
    const sitename = 'sharejobpost.com'
    const title = 'Share Job Post!'
    const ogimage = 'https://www.sharejobpost.com/og-image.png'

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={description} />
          <meta property="og:site_name" content={sitename} />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta name="twitter:card" content="jobpost_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogimage} />
          <meta property="og:image" content={ogimage} />
          <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
        </Head>
        <body className="bg-black text-white overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
