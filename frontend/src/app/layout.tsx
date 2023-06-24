import './globals.css'
import { merriweather, nunito } from '../lib/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${merriweather.variable} ${nunito.variable}`}
      suppressHydrationWarning={true}
    >
      <body>{children}</body>
    </html>
  )
}
