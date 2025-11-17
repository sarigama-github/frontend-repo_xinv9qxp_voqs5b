import { useState } from 'react'
import Navbar from './components/Navbar'
import SendForm from './components/SendForm'
import MessageList from './components/MessageList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.06),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.06),transparent_40%)]">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        <SendForm backend={backend} onSent={() => setRefreshKey((k) => k + 1)} />
        <MessageList backend={backend} refreshKey={refreshKey} />
      </main>

      <footer className="text-center text-xs text-gray-500 py-8">
        Built for demo purposes. Use valid credentials to enable real SMS sending.
      </footer>
    </div>
  )
}

export default App
