import { useState } from "react"
import { Send } from "lucide-react"
import Alert from "./Alert"

export default function SendForm({ backend, onSent }) {
  const [to, setTo] = useState("")
  const [body, setBody] = useState("")
  const [sending, setSending] = useState(false)
  const [alert, setAlert] = useState(null)

  const sendMessage = async (e) => {
    e.preventDefault()
    setAlert(null)
    setSending(true)
    try {
      const res = await fetch(`${backend}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, body }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Failed to send")
      setAlert({
        type: "success",
        text:
          data.status === "queued"
            ? "Message queued (simulation in this demo)."
            : "Message sent!",
      })
      setTo("")
      setBody("")
      onSent?.()
    } catch (err) {
      setAlert({ type: "error", text: err.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-white rounded-xl shadow p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold">Send a message</h2>
        <span className="text-xs text-gray-500">E.164 format required</span>
      </div>
      <Alert {...alert} />
      <form onSubmit={sendMessage} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
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
          className="inline-flex items-center gap-2 justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Send className="w-4 h-4" /> {sending ? "Sending..." : "Send SMS"}
        </button>
        <p className="text-xs text-gray-500">
          Note: Without provider credentials, this demo queues messages and stores them in the
          database.
        </p>
      </form>
    </section>
  )
}
