export default function Home() {
  // State management
  const [baseURL, setBaseURL] = useState('')
  const [source, setSource] = useState('')
  const [medium, setMedium] = useState('')
  const [campaign, setCampaign] = useState('')
  const [term, setTerm] = useState('')
  const [content, setContent] = useState('')
  const [finalUrl, setFinalUrl] = useState('')
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <Card className="mb-8 shadow-lg">
          <BaseURLInput baseURL={baseURL} setBaseURL={setBaseURL} />
          
          <div className="grid gap-6 p-6">
            <div className="grid gap-4">
              <UTMInputGroup 
                id="source" 
                label="UTM Source" 
                value={source} 
                onChange={setSource}
                placeholder="e.g., Google, Facebook, Newsletter"
              />
              
              <UTMInputGroup 
                id="medium" 
                label="UTM Medium" 
                value={medium} 
                onChange={setMedium}
                placeholder="e.g., CPC, CPM, Email"
              />
              
              <UTMInputGroup 
                id="campaign" 
                label="UTM Campaign" 
                value={campaign} 
                onChange={setCampaign}
                placeholder="Campaign name"
              />
              
              <UTMInputGroup 
                id="term" 
                label="UTM Term" 
                value={term} 
                onChange={setTerm}
                placeholder="Campaign term"
              />
              
              <UTMInputGroup 
                id="content" 
                label="UTM Content" 
                value={content} 
                onChange={setContent}
                placeholder="Campaign content"
              />
            </div>
            
            <GenerateButton
              isGenerating={isGenerating}
              generateUrls={() => setIsGenerating(true)}
            />
          </div>
        </Card>
        
        <ResultsDisplay
          baseURL={baseURL}
          source={source}
          medium={medium}
          campaign={campaign}
          term={term}
          content={content}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          finalUrl={finalUrl}
          setFinalUrl={setFinalUrl}
          privacyPolicyUrl={privacyPolicyUrl}
          setPrivacyPolicyUrl={setPrivacyPolicyUrl}
        />
      </div>
    </main>
  )
}