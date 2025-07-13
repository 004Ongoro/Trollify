"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Shuffle, Upload, Eye, Palette } from "lucide-react"
import html2canvas from "html2canvas"

const templates = {
  twitter: [
    { id: "text-post", name: "Text Post", type: "text" },
    { id: "image-post", name: "Image Post", type: "image" },
    { id: "text-image-post", name: "Text + Image Post", type: "text-image" },
  ],
  facebook: [
    { id: "text-post", name: "Text Post", type: "text" },
    { id: "image-post", name: "Image Post", type: "image" },
    { id: "text-image-post", name: "Text + Image Post", type: "text-image" },
  ],
  instagram: [
    { id: "image-post", name: "Image Post", type: "image" },
    { id: "text-image-post", name: "Text + Image Post", type: "text-image" },
  ],
}

const themes = {
  twitter: ["Dark", "Light"],
  facebook: ["Light", "Dark"],
  instagram: ["Light", "Dark"],
}

const fonts = ["Arial", "Helvetica", "Roboto", "Open Sans", "Montserrat"]

export default function CreatePage({ params }: { params: { platform: string } }) {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [postData, setPostData] = useState({
    username: "johndoe",
    displayName: "John Doe",
    handle: "@johndoe",
    postText: "This is a sample post for testing purposes!",
    likes: 42,
    comments: 8,
    shares: 3,
    timestamp: "2h",
    verified: false,
    followers: "1.2K",
    following: "890",
    posts: "156",
  })
  const [selectedTheme, setSelectedTheme] = useState("Dark")
  const [selectedFont, setSelectedFont] = useState("Arial")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const platform = params.platform
  const platformTemplates = templates[platform as keyof typeof templates] || []
  const platformThemes = themes[platform as keyof typeof themes] || ["Light"]

  useEffect(() => {
    if (platformTemplates.length > 0) {
      setSelectedTemplate(platformTemplates[0].id)
    }
  }, [platform])

  const generateRandomNumbers = () => {
    setPostData((prev) => ({
      ...prev,
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 500),
      followers: `${(Math.random() * 100).toFixed(1)}K`,
      following: Math.floor(Math.random() * 2000).toString(),
      posts: Math.floor(Math.random() * 500).toString(),
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadImage = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: selectedTheme === "Dark" ? "#000000" : "#ffffff",
          scale: 2,
          useCORS: true,
        })

        const link = document.createElement("a")
        link.download = `trollify-${platform}-post.png`
        link.href = canvas.toDataURL()
        link.click()
      } catch (error) {
        console.error("Error generating image:", error)
        alert("Error generating image. Please try again.")
      }
    }
  }

  const renderPreview = () => {
    const isDark = selectedTheme === "Dark"
    const currentTemplate = platformTemplates.find((t) => t.id === selectedTemplate)

    if (platform === "twitter") {
      return (
        <div
          className={`max-w-md mx-auto ${isDark ? "bg-black text-white" : "bg-white text-black"} rounded-xl border ${isDark ? "border-gray-800" : "border-gray-200"} p-4`}
          style={{ fontFamily: selectedFont }}
        >
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{postData.displayName.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="font-bold">{postData.displayName}</span>
                {postData.verified && <span className="text-blue-500">✓</span>}
                <span className={isDark ? "text-gray-500" : "text-gray-600"}>
                  {postData.handle} · {postData.timestamp}
                </span>
              </div>
              {(currentTemplate?.type === "text" || currentTemplate?.type === "text-image") && (
                <p className="mt-2 text-base leading-relaxed">{postData.postText}</p>
              )}
              {(currentTemplate?.type === "image" || currentTemplate?.type === "text-image") && uploadedImage && (
                <div className="mt-3 rounded-2xl overflow-hidden">
                  <img src={uploadedImage || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
                </div>
              )}
              <div
                className={`flex items-center justify-between mt-4 max-w-md ${isDark ? "text-gray-500" : "text-gray-600"}`}
              >
                <div className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>{postData.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>🔄</span>
                  <span>{postData.shares}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>❤️</span>
                  <span>{postData.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>📤</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (platform === "facebook") {
      return (
        <div
          className={`max-w-md mx-auto ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"} rounded-lg border ${isDark ? "border-gray-700" : "border-gray-300"} overflow-hidden`}
          style={{ fontFamily: selectedFont }}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{postData.displayName.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold">{postData.displayName}</span>
                  {postData.verified && <span className="text-blue-500">✓</span>}
                </div>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {postData.timestamp} ago
                </span>
              </div>
            </div>
            {(currentTemplate?.type === "text" || currentTemplate?.type === "text-image") && (
              <p className="mb-3">{postData.postText}</p>
            )}
          </div>
          {(currentTemplate?.type === "image" || currentTemplate?.type === "text-image") && uploadedImage && (
            <div className="w-full">
              <img src={uploadedImage || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
            </div>
          )}
          <div className={`p-3 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <div className={`flex items-center justify-between text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <div className="flex items-center space-x-4">
                <span>👍 {postData.likes}</span>
                <span>💬 {postData.comments}</span>
                <span>↗️ {postData.shares}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (platform === "instagram") {
      return (
        <div
          className={`max-w-sm mx-auto ${isDark ? "bg-black text-white" : "bg-white text-black"} border ${isDark ? "border-gray-800" : "border-gray-200"} rounded-lg overflow-hidden`}
          style={{ fontFamily: selectedFont }}
        >
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5">
                <div
                  className={`w-full h-full ${isDark ? "bg-black" : "bg-white"} rounded-full flex items-center justify-center`}
                >
                  <span className="text-xs font-bold">{postData.displayName.charAt(0)}</span>
                </div>
              </div>
              <span className="font-semibold text-sm">{postData.username}</span>
              {postData.verified && <span className="text-blue-500">✓</span>}
            </div>
            <span className="text-lg">⋯</span>
          </div>
          {uploadedImage && (
            <div className="w-full aspect-square">
              <img src={uploadedImage || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <span className="text-xl">❤️</span>
                <span className="text-xl">💬</span>
                <span className="text-xl">📤</span>
              </div>
              <span className="text-xl">🔖</span>
            </div>
            <div className="text-sm font-semibold mb-1">{postData.likes.toLocaleString()} likes</div>
            {currentTemplate?.type === "text-image" && (
              <div className="text-sm">
                <span className="font-semibold">{postData.username}</span> {postData.postText}
              </div>
            )}
            <div className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{postData.timestamp} ago</div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#1A1A2E]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Image src="/logo.png" alt="Trollify" width={100} height={32} className="h-8 w-auto" />
            <Badge className="bg-[#A100F2] text-white capitalize">{platform}</Badge>
          </div>
          <Button
            onClick={downloadImage}
            className="bg-gradient-to-r from-[#00DDEB] to-[#A100F2] hover:from-[#00DDEB]/80 hover:to-[#A100F2]/80"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#00DDEB] flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Template Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {platformTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      className={`justify-start ${
                        selectedTemplate === template.id
                          ? "bg-[#00DDEB] text-black"
                          : "border-gray-600 text-gray-300 hover:border-[#00DDEB]"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Editing */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#00DDEB]">Content Editing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={postData.username}
                      onChange={(e) => setPostData((prev) => ({ ...prev, username: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={postData.displayName}
                      onChange={(e) => setPostData((prev) => ({ ...prev, displayName: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                </div>

                {(selectedTemplate === "text-post" || selectedTemplate === "text-image-post") && (
                  <div>
                    <Label htmlFor="postText">Post Text</Label>
                    <Textarea
                      id="postText"
                      value={postData.postText}
                      onChange={(e) => setPostData((prev) => ({ ...prev, postText: e.target.value }))}
                      className="bg-gray-800 border-gray-600"
                      rows={3}
                    />
                  </div>
                )}

                {(selectedTemplate === "image-post" || selectedTemplate === "text-image-post") && (
                  <div>
                    <Label>Post Image</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-gray-600"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                      {uploadedImage && <span className="text-sm text-green-400">Image uploaded</span>}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}

                <Separator className="bg-gray-700" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Engagement Numbers</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateRandomNumbers}
                      className="border-gray-600 bg-transparent"
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      Random
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="likes">Likes</Label>
                      <Input
                        id="likes"
                        type="number"
                        value={postData.likes}
                        onChange={(e) =>
                          setPostData((prev) => ({ ...prev, likes: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="comments">Comments</Label>
                      <Input
                        id="comments"
                        type="number"
                        value={postData.comments}
                        onChange={(e) =>
                          setPostData((prev) => ({ ...prev, comments: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shares">Shares</Label>
                      <Input
                        id="shares"
                        type="number"
                        value={postData.shares}
                        onChange={(e) =>
                          setPostData((prev) => ({ ...prev, shares: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customization Options */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#A100F2] flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger className="bg-gray-800 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {platformThemes.map((theme) => (
                          <SelectItem key={theme} value={theme}>
                            {theme}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="font">Font</Label>
                    <Select value={selectedFont} onValueChange={setSelectedFont}>
                      <SelectTrigger className="bg-gray-800 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#00DDEB]">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={previewRef} className="bg-gray-100 p-8 rounded-lg">
                  {renderPreview()}
                </div>
              </CardContent>
            </Card>

            {/* Legal Disclaimer */}
            <Card className="bg-red-900/20 border-red-800/30">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-red-400">⚠️ Disclaimer</h3>
                  <p className="text-sm text-gray-300">
                    This content is fake and for entertainment/testing purposes only. Do not use for fraud, defamation,
                    or illegal activities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
