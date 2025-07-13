"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface PolicyModalProps {
  isOpen: boolean
  onAccept: () => void
}

export function PolicyModal({ isOpen, onAccept }: PolicyModalProps) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const canProceed = termsAccepted && privacyAccepted

  const handleAccept = () => {
    if (canProceed) {
      localStorage.setItem("trollify-policies-accepted", "true")
      onAccept()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#00DDEB] mb-2">Welcome to Trollify</DialogTitle>
          <DialogDescription className="text-gray-300 text-base">
            Before you start creating fake social media content, please review and accept our policies.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-96 pr-4">
          <div className="space-y-6">
            {/* Terms of Service Section */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                📋 Terms of Service
                <Link href="/terms" target="_blank" className="ml-2">
                  <ExternalLink className="w-4 h-4 text-[#00DDEB] hover:text-[#00DDEB]/80" />
                </Link>
              </h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>
                  <strong>Entertainment & Testing Only:</strong> Trollify is designed exclusively for entertainment,
                  educational, and testing purposes. All generated content is fake and fictional.
                </p>
                <p>
                  <strong>Prohibited Uses:</strong> You may NOT use this service for fraud, deception, defamation,
                  harassment, impersonation without consent, or any illegal activities.
                </p>
                <p>
                  <strong>Your Responsibility:</strong> You are solely responsible for how you use the generated content
                  and must add appropriate disclaimers when sharing.
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                  className="border-gray-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                  I have read and accept the Terms of Service
                </label>
              </div>
            </div>

            {/* Privacy Policy Section */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                🔒 Privacy Policy
                <Link href="/privacy" target="_blank" className="ml-2">
                  <ExternalLink className="w-4 h-4 text-[#00DDEB] hover:text-[#00DDEB]/80" />
                </Link>
              </h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>
                  <strong>Privacy-First Design:</strong> We don't collect personal information, require registration, or
                  store your created content on our servers.
                </p>
                <p>
                  <strong>Local Processing:</strong> All image processing and content creation happens locally in your
                  browser. Your uploaded images never leave your device.
                </p>
                <p>
                  <strong>Minimal Data:</strong> We only collect minimal technical information (IP addresses, browser
                  type) for security and service operation, which is automatically deleted after 30 days.
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="privacy"
                  checked={privacyAccepted}
                  onCheckedChange={setPrivacyAccepted}
                  className="border-gray-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-300 cursor-pointer">
                  I have read and accept the Privacy Policy
                </label>
              </div>
            </div>

            {/* Important Disclaimer */}
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-400 mb-2">⚠️ Important Disclaimer</h3>
              <p className="text-sm text-gray-300">
                By proceeding, you acknowledge that all content generated by Trollify is fake and fictional. Misuse of
                this service for illegal purposes may result in legal consequences. Always use responsibly and
                ethically.
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
          <Button
            onClick={handleAccept}
            disabled={!canProceed}
            className={`px-6 py-2 ${
              canProceed
                ? "bg-gradient-to-r from-[#00DDEB] to-[#A100F2] hover:from-[#00DDEB]/80 hover:to-[#A100F2]/80 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Accept & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
