import { useEffect, useState } from 'react'

function App() {
  const [to, setTo] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [messages, setMessages] = useState([])
  const [alert, setAlert] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${backend}/api/messages`)
      const data = await res.json()
      setMessages(data)
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    setAlert(null)
    setSending(true)
    try {
      const res = await fetch(`${backend}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, body }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to send')
      }
      setAlert({ type: 'success', text: data.status === 'queued' ? 'Message queued (simulation in this demo).' : 'Message sent!' })
      setTo('')
      setBody('')
      fetchMessages()
    } catch (err) {
      setAlert({ type: 'error', text: err.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <header className="px-6 py-4 border-b bg-white/60 backdrop-blur">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Free SMS Messenger</h1>
          <a href="/test" className="text-sm text-blue-600 hover:underline">Check backend</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Send a message</h2>
          {alert && (
            <div className={`mb-4 text-sm px-3 py-2 rounded ${alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {alert.text}
            </div>
          )}
          <form onSubmit={sendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">To (E.164)</label>
              <input
                type="tel"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="+15551234567"
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="Type your message..."
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send SMS'}
            </button>
            <p className="text-xs text-gray-500">Note: Without provider credentials, this demo queues messages and stores them in the database.</p>
          </form>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent messages</h2>
          <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500">No messages yet.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{m.to}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'failed' ? 'bg-red-100 text-red-700' : m.status === 'queued' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{m.status}</span>
                </div>
                <p className="text-gray-700 mt-2 whitespace-pre-wrap break-words">{m.body}</p>
                <div className="text-xs text-gray-500 mt-2 flex gap-2 flex-wrap">
                  {m.provider && <span>Provider: {m.provider}</span>}
                  {m.sid && <span>SID: {m.sid}</span>}
                  {m.error && <span className="text-red-600">Error: {m.error}</span>}
                  {m.created_at && <span>{new Date(m.created_at).toLocaleString()}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        Built for demo purposes. Use valid credentials to enable real SMS sending.
      </footer>
    </div>
  )
}

export default App
