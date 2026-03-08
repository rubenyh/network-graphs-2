'use client'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white text-black relative">
      
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm" />
     
      <div className="relative bg-white/95 p-12 rounded-2xl text-center shadow-lg max-w-md">    
        <h1 className="text-5xl font-semibold mb-4">
          404
        </h1>

        <h2 className="text-2xl font-medium mb-2">
          Page not found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <Link href="/">
          <button className="bg-black text-white text-lg px-7 py-2 rounded-full cursor-pointer hover:scale-110 transition">
            Go Home
          </button>
        </Link>

      </div>
    </div>
  )
}
