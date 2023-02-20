import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
