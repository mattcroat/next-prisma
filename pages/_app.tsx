import 'styles/tailwind.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="grid content-center h-screen bg-gray-900">
      <Component {...pageProps} />
    </div>
  )
}
