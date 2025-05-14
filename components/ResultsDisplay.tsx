import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckIcon, ClipboardCopyIcon } from "lucide-react"
import { toast } from "@/components/ui/toast/use-toast"

interface ResultsDisplayProps {
  baseURL: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
  finalUrl: string;
  setFinalUrl: (value: string) => void;
  privacyPolicyUrl: string;
  setPrivacyPolicyUrl: (value: string) => void;
}

export default function ResultsDisplay({
  baseURL,
  source,
  medium,
  campaign,
  term,
  content,
  isGenerating,
  setIsGenerating,
  finalUrl,
  setFinalUrl,
  privacyPolicyUrl,
  setPrivacyPolicyUrl
}: ResultsDisplayProps) {
  const [copied, setCopied] = useState({ main: false, policy: false })

  // Generate URLs effect
  useEffect(() => {
    if (!isGenerating) return
    
    const timer = setTimeout(() => {
      if (!baseURL) {
        toast({
          title: "Missing URL",
          description: "Please enter a base URL",
          variant: "destructive"
        })
        setIsGenerating(false)
        return
      }
      
      const utmParams = new URLSearchParams()
      
      if (source) utmParams.append('utm_source', source)
      if (medium) utmParams.append('utm_medium', medium)
      if (campaign) utmParams.append('utm_campaign', campaign)
      if (term) utmParams.append('utm_term', term)
      if (content) utmParams.append('utm_content', content)
      
      const generatedUrl = `${baseURL}?${utmParams.toString()}`.replaceAll(' ', '-')
      const privacyPolicyUrl = `https://ciputradevelopment.com/privacy-policy/? ${utmParams.toString()}`.replaceAll(' ', '-')
      
      setFinalUrl(generatedUrl)
      setPrivacyPolicyUrl(privacyPolicyUrl)
      setIsGenerating(false)
      
      toast({
        title: "Success!",
        description: "URLs generated successfully",
        className: "bg-green-500 text-white"
      })
    }, 500)
    
    return () => clearTimeout(timer)
  }, [isGenerating])

  return (
    <div className={`${finalUrl ? 'animate-fade-in' : ''} space-y-6`}>
      {finalUrl && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Generated URLs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tracking URL</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={finalUrl}
                  className="font-mono text-sm truncate"
                />
                <Button
                  onClick={() => copyToClipboard(finalUrl, 'main')}
                  variant="outline"
                  size="icon"
                >
                  {copied.main ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ClipboardCopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Privacy Policy URL</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={privacyPolicyUrl}
                  className="font-mono text-sm truncate"
                />
                <Button
                  onClick={() => copyToClipboard(privacyPolicyUrl, 'policy')}
                  variant="outline"
                  size="icon"
                >
                  {copied.policy ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ClipboardCopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}