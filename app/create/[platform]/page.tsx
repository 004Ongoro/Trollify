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
import { ArrowLeft, Download, Shuffle, Upload, Eye, Palette, User, Clock } from "lucide-react"
import html2canvas from "html2canvas"
import { ThemeToggle } from "@/components/theme-toggle"

const templates = {
  twitter: [
    { id: "text-post", name: "Text Post", type: "text" },
    { id: "image-post", name: "Image Post", type: "image" },
    { id: "text-image-post", name: "Text + Image Post", type: "text-image" },
    { id: "comment-only", name: "Comment Only", type: "comment" },
    { id: "post-with-comments", name: "Post with Comments", type: "post-comments" },
  ],
  facebook: [
    { id: "text-post", name: "Text Post", type: "text" },
    { id: "image-post", name: "Image Post", type: "image" },
    { id: "text-image-post", name: "Text + Image Post", type: "text-image" },
    { id: "comment-only", name: "Comment Only", type: "comment" },
    { id: "post-with-comments", name: "Post with Comments", type: "post-comments" },
  ],
  instagram: [
    { id: "image-post", name: "Image Post", type: "image" },
    { id: "text-image-post", name: "Text + Image Post", type: "text-image" },
    { id: "comment-only", name: "Comment Only", type: "comment" },
    { id: "post-with-comments", name: "Post with Comments", type: "post-comments" },
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
  const [commentData, setCommentData] = useState({
    username: "janedoe",
    displayName: "Jane Doe",
    text: "Great post! Thanks for sharing this.",
    likes: 5,
    timestamp: "1h",
    verified: false,
  })
  const [selectedTheme, setSelectedTheme] = useState("Dark")
  const [selectedFont, setSelectedFont] = useState("Arial")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [commentProfilePicture, setCommentProfilePicture] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const profilePicInputRef = useRef<HTMLInputElement>(null)
  const commentProfilePicInputRef = useRef<HTMLInputElement>(null)

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
    setCommentData((prev) => ({
      ...prev,
      likes: Math.floor(Math.random() * 100),
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

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCommentProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCommentProfilePicture(e.target?.result as string)
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
        link.download = `trollify-${platform}-${selectedTemplate}.png`
        link.href = canvas.toDataURL()
        link.click()
      } catch (error) {
        console.error("Error generating image:", error)
        alert("Error generating image. Please try again.")
      }
    }
  }

  const renderProfilePicture = (picture: string | null, displayName: string, size = "w-12 h-12") => {
    if (picture) {
      return (
        <img
          src={picture || "/placeholder.svg"}
          alt={`${displayName} profile`}
          className={`${size} rounded-full object-cover`}
        />
      )
    }
    return (
      <div
        className={`${size} bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0`}
      >
        <span className="text-white font-bold text-lg">{displayName.charAt(0)}</span>
      </div>
    )
  }

  const renderComment = () => {
    const isDark = selectedTheme === "Dark"

    if (platform === "twitter") {
      return (
        <div className={`mt-4 border-t ${isDark ? "border-gray-800" : "border-gray-200"} pt-4`}>
          <div className="flex items-start space-x-3">
            {renderProfilePicture(commentProfilePicture, commentData.displayName, "w-10 h-10")}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 flex-wrap">
                <span className="font-bold text-sm">{commentData.displayName}</span>
                {commentData.verified && (
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.5-1.668c-.265-.177-.335-.538-.156-.804.178-.266.538-.336.804-.156l1.921 1.281 3.957-5.936c.178-.267.538-.336.804-.156.267.179.336.538.156.804z" />
                  </svg>
                )}
                <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  @{commentData.username} · {commentData.timestamp}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed">{commentData.text}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full px-2 py-1 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full px-2 py-1 transition-colors cursor-pointer">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>{commentData.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (platform === "facebook") {
      return (
        <div className={`mt-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"} pt-4`}>
          <div className="flex items-start space-x-3">
            {renderProfilePicture(commentProfilePicture, commentData.displayName, "w-8 h-8")}
            <div className={`flex-1 ${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-2xl px-3 py-2`}>
              <div className="flex items-center space-x-1 mb-1">
                <span className="font-semibold text-sm">{commentData.displayName}</span>
                {commentData.verified && (
                  <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.68 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5l-4-4 1.41-1.41L13 14.17l6.59-6.59L21 9l-8 8z" />
                  </svg>
                )}
              </div>
              <p className="text-sm">{commentData.text}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 ml-11 text-xs text-gray-500">
            <span className="hover:underline cursor-pointer">Like</span>
            <span className="hover:underline cursor-pointer">Reply</span>
            <span>{commentData.timestamp}</span>
            {commentData.likes > 0 && (
              <div className="flex items-center space-x-1">
                <span>👍</span>
                <span>{commentData.likes}</span>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (platform === "instagram") {
      return (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex items-start space-x-3">
            {renderProfilePicture(commentProfilePicture, commentData.displayName, "w-8 h-8")}
            <div className="flex-1">
              <div className="text-sm">
                <span className="font-semibold">{commentData.username}</span>
                {commentData.verified && (
                  <svg className="w-3 h-3 text-blue-500 inline ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.68 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5l-4-4 1.41-1.41L13 14.17l6.59-6.59L21 9l-8 8z" />
                  </svg>
                )}
                <span className="ml-2">{commentData.text}</span>
              </div>
              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                <span>{commentData.timestamp}</span>
                {commentData.likes > 0 && <span>{commentData.likes} likes</span>}
                <span className="hover:text-gray-700 cursor-pointer">Reply</span>
              </div>
            </div>
            <svg
              className="w-3 h-3 text-gray-400 hover:text-red-500 cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>
      )
    }

    return null
  }

  const renderPreview = () => {
    const isDark = selectedTheme === "Dark"
    const currentTemplate = platformTemplates.find((t) => t.id === selectedTemplate)

    // Comment-only templates
    if (currentTemplate?.type === "comment") {
      return (
        <div
          className={`max-w-md mx-auto ${isDark ? "bg-black text-white" : "bg-white text-black"} rounded-2xl border ${isDark ? "border-gray-800" : "border-gray-200"} p-4 font-sans`}
          style={{ fontFamily: selectedFont }}
        >
          {renderComment()}
        </div>
      )
    }

    if (platform === "twitter") {
      return (
        <div
          className={`max-w-md mx-auto ${isDark ? "bg-black text-white" : "bg-white text-black"} rounded-2xl border ${isDark ? "border-gray-800" : "border-gray-200"} p-4 font-sans`}
          style={{ fontFamily: selectedFont }}
        >
          <div className="flex items-start space-x-3">
            {renderProfilePicture(profilePicture, postData.displayName)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 flex-wrap">
                <span className="font-bold text-base">{postData.displayName}</span>
                {postData.verified && (
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-2.5-1.668c-.265-.177-.335-.538-.156-.804.178-.266.538-.336.804-.156l1.921 1.281 3.957-5.936c.178-.267.538-.336.804-.156.267.179.336.538.156.804z" />
                  </svg>
                )}
                <span className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                  @{postData.username} · {postData.timestamp}
                </span>
              </div>
              {(currentTemplate?.type === "text" || currentTemplate?.type === "text-image") && (
                <p className="mt-3 text-base leading-relaxed whitespace-pre-wrap">{postData.postText}</p>
              )}
              {(currentTemplate?.type === "image" || currentTemplate?.type === "text-image") && uploadedImage && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200">
                  <img src={uploadedImage || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
                </div>
              )}
              <div
                className={`flex items-center justify-between mt-4 max-w-md ${isDark ? "text-gray-500" : "text-gray-600"} text-sm`}
              >
                <div className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full px-3 py-1 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>{postData.comments}</span>
                </div>
                <div className="flex items-center space-x-1 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full px-3 py-1 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                  <span>{postData.shares}</span>
                </div>
                <div className="flex items-center space-x-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full px-3 py-1 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span>{postData.likes}</span>
                </div>
                <div className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full px-3 py-1 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17l9.2-9.2M17 17H7V7" />
                  </svg>
                </div>
              </div>
              {currentTemplate?.type === "post-comments" && renderComment()}
            </div>
          </div>
        </div>
      )
    }

    if (platform === "facebook") {
      return (
        <div
          className={`max-w-md mx-auto ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"} rounded-lg shadow-sm border ${isDark ? "border-gray-700" : "border-gray-300"} overflow-hidden font-sans`}
          style={{ fontFamily: selectedFont }}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              {renderProfilePicture(profilePicture, postData.displayName, "w-10 h-10")}
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-base">{postData.displayName}</span>
                  {postData.verified && (
                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.68 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5l-4-4 1.41-1.41L13 14.17l6.59-6.59L21 9l-8 8z" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {postData.timestamp} ago · 🌍
                </span>
              </div>
            </div>
            {(currentTemplate?.type === "text" || currentTemplate?.type === "text-image") && (
              <p className="mb-3 text-base leading-relaxed">{postData.postText}</p>
            )}
          </div>
          {(currentTemplate?.type === "image" || currentTemplate?.type === "text-image") && uploadedImage && (
            <div className="w-full">
              <img src={uploadedImage || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
            </div>
          )}
          <div className={`px-4 py-2 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <div
              className={`flex items-center justify-between text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}
            >
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                    </svg>
                  </div>
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                </div>
                <span>{postData.likes}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>{postData.comments} comments</span>
                <span>{postData.shares} shares</span>
              </div>
            </div>
            <div
              className={`flex items-center justify-around py-2 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
            >
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
                <span>Like</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Comment</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17l9.2-9.2M17 17H7V7" />
                </svg>
                <span>Share</span>
              </button>
            </div>
            {currentTemplate?.type === "post-comments" && renderComment()}
          </div>
        </div>
      )
    }

    if (platform === "instagram") {
      return (
        <div
          className={`max-w-sm mx-auto ${isDark ? "bg-black text-white" : "bg-white text-black"} border ${
            isDark ? "border-gray-800" : "border-gray-200"
          } rounded-lg overflow-hidden font-sans`}
          style={{ fontFamily: selectedFont }}
        >
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full p-0.5">
                <div
                  className={`w-full h-full ${isDark ? "bg-black" : "bg-white"} rounded-full flex items-center justify-center overflow-hidden`}
                >
                  {profilePicture ? (
                    <img
                      src={profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-xs font-bold">{postData.displayName.charAt(0)}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm">{postData.username}</span>
                {postData.verified && (
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.68 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5l-4-4 1.41-1.41L13 14.17l6.59-6.59L21 9l-8 8z" />
                  </svg>
                )}
              </div>
            </div>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </div>
          {uploadedImage && (
            <div className="w-full aspect-square">
              <img src={uploadedImage || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <svg
                  className="w-6 h-6 hover:text-gray-500 cursor-pointer transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-500 cursor-pointer transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-500 cursor-pointer transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17l9.2-9.2M17 17H7V7" />
                </svg>
              </div>
              <svg
                className="w-6 h-6 hover:text-gray-500 cursor-pointer transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7z" />
              </svg>
            </div>
            <div className="text-sm font-semibold mb-1">{postData.likes.toLocaleString()} likes</div>
            {currentTemplate?.type === "text-image" && (
              <div className="text-sm mb-2">
                <span className="font-semibold">{postData.username}</span> {postData.postText}
              </div>
            )}
            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} uppercase tracking-wide`}>
              {postData.timestamp} ago
            </div>
            {currentTemplate?.type === "post-comments" && renderComment()}
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
              <Button variant="ghost" size="sm" className="text-gray-200 hover:text-[#00DDEB]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <Image src="/logo.png" alt="Trollify" width={100} height={32} className="h-8 w-auto" />
            <Badge className="bg-[#A100F2] text-white capitalize">{platform}</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={downloadImage}
              className="bg-gradient-to-r from-[#00DDEB] to-[#A100F2] hover:from-[#00DDEB]/80 hover:to-[#A100F2]/80 text-white font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="bg-gray-900/70 border-gray-600 shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#00DDEB] flex items-center text-lg">
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
                      className={`justify-start font-medium ${
                        selectedTemplate === template.id
                          ? "bg-[#00DDEB] text-black hover:bg-[#00DDEB]/90"
                          : "border-gray-500 text-gray-200 hover:border-[#00DDEB] hover:text-[#00DDEB] bg-gray-800/50"
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
                      className="bg-gray-800/70 border-gray-500 text-gray-100 placeholder:text-gray-400 focus:border-[#00DDEB] focus:ring-[#00DDEB]"
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

                <div>
                  <Label htmlFor="timestamp" className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Timestamp
                  </Label>
                  <Input
                    id="timestamp"
                    value={postData.timestamp}
                    onChange={(e) => setPostData((prev) => ({ ...prev, timestamp: e.target.value }))}
                    className="bg-gray-800 border-gray-600"
                    placeholder="e.g., 2h, 1d, 3m"
                  />
                </div>

                {/* Profile Picture Upload */}
                <div>
                  <Label className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Profile Picture
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => profilePicInputRef.current?.click()}
                      className="border-gray-600"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Profile Picture
                    </Button>
                    {profilePicture && <span className="text-sm text-green-400">Profile picture uploaded</span>}
                  </div>
                  <input
                    ref={profilePicInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
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

                {/* Comment Section for comment templates */}
                {(selectedTemplate === "comment-only" || selectedTemplate === "post-with-comments") && (
                  <>
                    <Separator className="bg-gray-700" />
                    <div>
                      <Label className="text-[#A100F2] font-semibold">Comment Settings</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label htmlFor="commentUsername">Comment Username</Label>
                          <Input
                            id="commentUsername"
                            value={commentData.username}
                            onChange={(e) => setCommentData((prev) => ({ ...prev, username: e.target.value }))}
                            className="bg-gray-800 border-gray-600"
                          />
                        </div>
                        <div>
                          <Label htmlFor="commentDisplayName">Comment Display Name</Label>
                          <Input
                            id="commentDisplayName"
                            value={commentData.displayName}
                            onChange={(e) => setCommentData((prev) => ({ ...prev, displayName: e.target.value }))}
                            className="bg-gray-800 border-gray-600"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="commentText">Comment Text</Label>
                        <Textarea
                          id="commentText"
                          value={commentData.text}
                          onChange={(e) => setCommentData((prev) => ({ ...prev, text: e.target.value }))}
                          className="bg-gray-800 border-gray-600"
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="commentTimestamp">Comment Timestamp</Label>
                          <Input
                            id="commentTimestamp"
                            value={commentData.timestamp}
                            onChange={(e) => setCommentData((prev) => ({ ...prev, timestamp: e.target.value }))}
                            className="bg-gray-800 border-gray-600"
                            placeholder="e.g., 1h, 30m"
                          />
                        </div>
                        <div>
                          <Label htmlFor="commentLikes">Comment Likes</Label>
                          <Input
                            id="commentLikes"
                            type="number"
                            value={commentData.likes}
                            onChange={(e) =>
                              setCommentData((prev) => ({ ...prev, likes: Number.parseInt(e.target.value) || 0 }))
                            }
                            className="bg-gray-800 border-gray-600"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>Comment Profile Picture</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => commentProfilePicInputRef.current?.click()}
                            className="border-gray-600"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Comment Profile Picture
                          </Button>
                          {commentProfilePicture && (
                            <span className="text-sm text-green-400">Comment profile picture uploaded</span>
                          )}
                        </div>
                        <input
                          ref={commentProfilePicInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCommentProfilePictureUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </>
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
