import Head from 'next/head'
import Dashboard from '@components/Dashboard'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>2026 Matter Thread Border Router Dashboard</title>
        <meta
          name="description"
          content="Sortable 2026 comparison of Matter Thread Border Routers: Thread 1.3/1.4 features, child capacity, cross-vendor mesh stability, power draw, and recommended multi-controller hardware combinations."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Dashboard />
      </main>

      <Footer />
    </div>
  )
}
