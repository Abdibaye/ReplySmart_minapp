'use client'

import { useState } from 'react'

interface ReplyCardProps {
  text: string
}

export default function ReplyCard({ text }: ReplyCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <p className="text-gray-700 mb-3">{text}</p>
      <button
        onClick={handleCopy}
        className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
    </div>
  )
} 