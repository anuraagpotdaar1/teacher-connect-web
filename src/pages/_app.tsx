import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SideNav from '../componants/sidenav'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative">
      <SideNav />
      <div className="ml-64 pt-4">
        <Component {...pageProps} />
      </div>
    </div>
  )
}