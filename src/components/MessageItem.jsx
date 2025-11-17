import { Check, Clock, XCircle } from "lucide-react"

const StatusPill = ({ status }) => {
  const map = {
    failed: { cls: "bg-red-100 text-red-700", icon: <XCircle className="w-3.5 h-3.5"/> },
    queued: { cls: "bg-amber-100 text-amber-700", icon: <Clock className="w-3.5 h-3.5"/> },
    sent: { cls: "bg-green-100 text-green-700", icon: <Check className="w-3.5 h-3.5"/> },
  }
  const m = map[status] || map.queued
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${m.cls}`}>
      {m.icon}{status}
    </span>
  )
}

export default function MessageItem({ m }) {
  return (
    <div className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-800">{m.to}</span>
        <StatusPill status={m.status} />
      </div>
      <p className="text-gray-700 mt-2 whitespace-pre-wrap break-words">{m.body}</p>
      <div className="text-xs text-gray-500 mt-2 flex gap-2 flex-wrap">
        {m.provider && <span>Provider: {m.provider}</span>}
        {m.sid && <span>SID: {m.sid}</span>}
        {m.error && <span className="text-red-600">Error: {m.error}</span>}
        {m.created_at && <span>{new Date(m.created_at).toLocaleString()}</span>}
      </div>
    </div>
  )
}
