import * as React from "react"

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-4' : ''}`}
      />
    </button>
  )
}
