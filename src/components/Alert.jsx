import { CheckCircle2, AlertCircle } from "lucide-react"

export default function Alert({ type = "success", text }) {
  if (!text) return null
  const isSuccess = type === "success"
  return (
    <div
      className={`flex items-start gap-2 mb-4 text-sm px-3 py-2 rounded border ${
        isSuccess
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }`}
      role="alert"
    >
      {isSuccess ? (
        <CheckCircle2 className="w-4 h-4 mt-0.5" />
      ) : (
        <AlertCircle className="w-4 h-4 mt-0.5" />
      )}
      <span>{text}</span>
    </div>
  )
}
