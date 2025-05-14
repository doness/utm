import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface BaseURLInputProps {
  baseURL: string;
  setBaseURL: (value: string) => void;
}

export default function BaseURLInput({ baseURL, setBaseURL }: BaseURLInputProps) {
  const [isValidUrl, setIsValidUrl] = useState(true)

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setBaseURL(url)
    
    try {
      new URL(url)
      setIsValidUrl(true)
    } catch {
      setIsValidUrl(false)
    }
  }

  return (
    <div className="p-6 border-b">
      <div className="space-y-2">
        <Label htmlFor="baseURL">Base URL</Label>
        <Input
          id="baseURL"
          placeholder="https://example.com "
          value={baseURL}
          onChange={handleURLChange}
          className={!isValidUrl ? "border-red-500" : ""}
        />
        {!isValidUrl && (
          <p className="text-sm text-red-500">Please enter a valid URL</p>
        )}
      </div>
    </div>
  )
}