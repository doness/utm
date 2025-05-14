import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface UTMInputGroupProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function UTMInputGroup({ 
  id, label, value, onChange, placeholder 
}: UTMInputGroupProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}