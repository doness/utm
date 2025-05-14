import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {GA_ID && <GoogleAnalytics GA_ID={GA_ID} />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;