import { Phone, Server, Send, Menu } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 px-6 py-3 border-b bg-white/70 backdrop-blur">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-gray-800">
          <div className="h-8 w-8 rounded-lg bg-blue-600 text-white grid place-items-center shadow-sm">
            <Phone className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight">Free SMS Messenger</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="/" className="hover:text-gray-900 flex items-center gap-1"><Send className="w-4 h-4"/>Send</a>
          <a href="/test" className="hover:text-gray-900 flex items-center gap-1"><Server className="w-4 h-4"/>Status</a>
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(v=>!v)}><Menu className="w-5 h-5"/></button>
      </div>
      {open && (
        <div className="md:hidden max-w-5xl mx-auto mt-2">
          <div className="rounded-lg border bg-white shadow-sm p-3 flex flex-col gap-2 text-sm">
            <a href="/" className="hover:text-gray-900 flex items-center gap-2"><Send className="w-4 h-4"/>Send</a>
            <a href="/test" className="hover:text-gray-900 flex items-center gap-2"><Server className="w-4 h-4"/>Status</a>
          </div>
        </div>
      )}
    </header>
  )
}
