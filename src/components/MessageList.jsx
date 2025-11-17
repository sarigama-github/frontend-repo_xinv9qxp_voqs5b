import { useEffect, useState } from "react"
import MessageItem from "./MessageItem"

export default function MessageList({ backend, refreshKey }) {
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${backend}/api/messages`)
      const data = await res.json()
      setMessages(data)
    } catch (e) {}
  }

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent messages</h2>
      <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500">No messages yet.</p>
        )}
        {messages.map((m) => (
          <MessageItem key={m.id} m={m} />
        ))}
      </div>
    </section>
  )
}
