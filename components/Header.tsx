import { RocketIcon } from "lucide-react"

export default function Header() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
        <RocketIcon className="h-10 w-10 text-primary" />
        UTM URL Generator
      </h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Create trackable URLs with custom UTM parameters
      </p>
    </div>
  )
}