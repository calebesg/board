import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Header } from '../components/Header'
import '../styles/globals.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const options = {
    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    currency: 'BRL',
    intent: 'capture',
  }

  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider options={options}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
