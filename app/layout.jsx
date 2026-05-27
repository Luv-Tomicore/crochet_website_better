import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata = {
  title: 'Stitch It with Tomi',
  description: 'Handcrafted crochet accessories & plushies — Winnipeg',
  openGraph: {
    title: 'Stitch It with Tomi',
    description: 'Handcrafted crochet accessories & plushies — Winnipeg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
