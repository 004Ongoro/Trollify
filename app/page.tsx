"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Twitter, Facebook, Instagram, Sparkles, Download, Eye } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { PolicyModal } from "@/components/policy-modal"

const platforms = [
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: Twitter,
    color: "bg-black",
    description: "Create realistic X posts with dark mode styling",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    description: "Generate Facebook posts and comments",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    description: "Design Instagram posts with authentic styling",
  },
]

export default function HomePage() {
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [showPolicyModal, setShowPolicyModal] = useState(false)

  useEffect(() => {
    // Check if user has already accepted policies
    const policiesAccepted = localStorage.getItem("trollify-policies-accepted")
    if (!policiesAccepted) {
      setShowPolicyModal(true)
    }
  }, [])

  const handlePolicyAccept = () => {
    setShowPolicyModal(false)
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      <PolicyModal isOpen={showPolicyModal} onAccept={handlePolicyAccept} />

      {/* Header */}
      <header className="border-b border-gray-800 bg-[#1A1A2E]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Trollify" width={120} height={40} className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-200 hover:text-[#00DDEB] transition-colors font-medium">
              Features
            </Link>
            <Link href="/terms" className="text-gray-200 hover:text-[#00DDEB] transition-colors font-medium">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-200 hover:text-[#00DDEB] transition-colors font-medium">
              Privacy
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-[#A100F2] text-white mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Entertainment & Testing Only
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00DDEB] to-[#A100F2] bg-clip-text text-transparent">
              Create Fake Social Posts
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Generate ultra-realistic fake social media posts, accounts, and screenshots for entertainment and testing
              purposes.
            </p>
          </div>

          {/* Platform Selection */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-[#00DDEB]">Choose Your Platform</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {platforms.map((platform) => {
                const IconComponent = platform.icon
                return (
                  <Card
                    key={platform.id}
                    className={`bg-gray-900/50 border-gray-700 hover:border-[#00DDEB] transition-all cursor-pointer transform hover:scale-105 ${
                      selectedPlatform === platform.id ? "border-[#00DDEB] ring-2 ring-[#00DDEB]/20" : ""
                    }`}
                    onClick={() => setSelectedPlatform(platform.id)}
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`w-16 h-16 rounded-full ${platform.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-white">{platform.name}</CardTitle>
                      <CardDescription className="text-gray-400">{platform.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Start Creating Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={selectedPlatform ? `/create/${selectedPlatform}` : "#"}>
              <Button
                size="lg"
                className={`bg-gradient-to-r from-[#00DDEB] to-[#A100F2] hover:from-[#00DDEB]/80 hover:to-[#A100F2]/80 text-white px-8 py-3 text-lg ${
                  !selectedPlatform ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!selectedPlatform}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating
              </Button>
            </Link>
            {!selectedPlatform && <p className="text-sm text-gray-400">Select a platform to continue</p>}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#00DDEB]">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Eye className="w-8 h-8 text-[#00DDEB] mb-2" />
                <CardTitle className="text-white">Ultra-Realistic Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Pixel-perfect replicas of popular social media platforms with authentic styling and layouts.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Sparkles className="w-8 h-8 text-[#A100F2] mb-2" />
                <CardTitle className="text-white">Easy Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Edit text, upload images, customize numbers, and adjust themes with our intuitive interface.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <Download className="w-8 h-8 text-[#00DDEB] mb-2" />
                <CardTitle className="text-white">Instant Download</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Generate and download high-quality PNG images instantly without any registration required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12 px-4 bg-red-900/20 border-t border-red-800/30">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4 text-red-400">⚠️ Important Disclaimer</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            This content is fake and for entertainment/testing purposes only. Do not use for fraud, defamation, or any
            illegal activities. By using this service, you agree to our Terms of Service and acknowledge that all
            generated content is fictional.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/terms" className="text-gray-400 hover:text-[#00DDEB] transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-[#00DDEB] transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-gray-500">© 2025 Neontek. All rights reserved. For entertainment purposes only.</p>
        </div>
      </footer>
    </div>
  )
}
