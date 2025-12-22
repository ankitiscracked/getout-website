import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import Logo from './Logo'

export default function App() {
  const [version, setVersion] = useState('1.0.0')

  // The DMG file URL - replace with your actual storage location
  // Options: GitHub Releases, Cloudflare R2, or any public CDN
  const DMG_URL = 'https://github.com/yourusername/getout/releases/download/v1.0.0/getout.dmg'

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = DMG_URL
    link.download = 'getout.dmg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white px-4">
      {/* Logo and app name in top-left */}
      <div className="flex items-center gap-3 pt-6">
        <div className="h-12 w-12">
          <Logo />
        </div>
        <span className="text-2xl font-bold text-[--color-main]">Getout</span>
      </div>

      {/* Header */}
      <div className="mb-12 flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="mb-4 text-5xl font-bold text-[--color-main]">Getout</h1>
        <p className="mb-2 text-3xl font-semibold text-[--color-main]">
          Productivity on tap, ready to get out of way
        </p>
        <p className="text-lg text-[--color-secondary]">
          Login + OAuth Integration System
        </p>
      </div>

      {/* Screenshot Area */}
      <div className="mb-12 w-full max-w-2xl">
        <div className="rounded-lg border border-[--color-muted] bg-[--color-shade] p-8">
          <img
            src="https://via.placeholder.com/800x600?text=App+Screenshot"
            alt="Getout app screenshot"
            className="h-auto w-full rounded-md"
          />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 rounded-md bg-[--color-main] px-6 py-3 text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        <Download size={20} />
        Download for macOS
      </button>

      {/* Version info */}
      <p className="mt-6 text-sm text-[--color-secondary]">
        Version {version}
      </p>

      {/* Footer */}
      <footer className="mt-16 border-t border-[--color-muted] pt-8 text-center text-sm text-[--color-secondary]">
        <p>
          A complete implementation of Google Sign-In authentication with secure OAuth integration
        </p>
      </footer>
    </div>
  )
}
