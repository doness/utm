import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ClipboardCopyIcon, CheckIcon } from "lucide-react"

interface GenerateButtonProps {
  isGenerating: boolean;
  generateUrls: () => void;
}

export default function GenerateButton({ 
  isGenerating, generateUrls 
}: GenerateButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={generateUrls}
        disabled={isGenerating}
        className="w-full md:w-auto px-8 py-6 text-lg"
      >
        {isGenerating ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2">Generating...</span>
          </div>
        ) : (
          "Generate URLs"
        )}
      </Button>
    </motion.div>
  )
}