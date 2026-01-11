import { Download, Command, Link, Bot, Keyboard } from "lucide-react";
import Logo from "./Logo";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

function Cross({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function App() {
  const path = window.location.pathname;
  if (path === "/privacy") {
    return <PrivacyPolicy />;
  }

  if (path === "/terms") {
    return <TermsOfService />;
  }

  // Download URL - automatically redirects to the latest release
  const DMG_URL = "/download/latest";

  const heroImage = "/hero.jpg";

  const handleDownload = () => {
    window.location.href = DMG_URL;
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      {/* Main content wrapper with vertical lines */}
      <div className="relative max-w-5xl mx-auto w-full px-4">
        {/* Left vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-stone-200" />
        {/* Right vertical line */}
        <div className="absolute right-4 top-0 bottom-0 w-px bg-stone-200" />

        <div className="py-10 px-8">
          <div className="flex items-center gap-4 mx-auto w-fit">
            <div className="h-16 w-16">
              <Logo />
            </div>
            <span className="text-2xl font-bold text-[--color-main]">Getout</span>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
              Beta
            </span>
          </div>

          {/* Hero section with diagonal crosses */}
          <div className="relative mt-12 py-10 -mx-8">
            {/* Top horizontal line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-stone-200" />
            {/* Bottom horizontal line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200" />
            {/* Top-left cross */}
            <div className="absolute -top-2.5 -left-2.5">
              <Cross className="text-stone-400" />
            </div>
            {/* Bottom-right cross */}
            <div className="absolute -bottom-2.5 -right-2.5">
              <Cross className="text-stone-400" />
            </div>

            <h1 className="text-5xl text-stone-800 text-center tracking-[-0.125rem] font-medium">
              A{" "}
              <span className="inline-flex items-center gap-2 bg-stone-100 px-4 py-1 rounded-full">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-stone-600"
                >
                  <rect x="3" y="8" width="14" height="8" rx="4" />
                  <path d="M17 10l4-4" />
                  <path d="M17 12h5" />
                  <path d="M17 14l4 4" />
                </svg>
                multitool
              </span>{" "}
              for Professionals
            </h1>
            <p className="mt-4 text-lg text-stone-600 text-center max-w-xl mx-auto tracking-tight">
              One hotkey. All your tools. Stop hopping, start doing.
            </p>
            <button
              onClick={handleDownload}
              className="mt-8 mx-auto flex items-center gap-2 rounded-full bg-stone-800 px-6 py-3 font-semibold text-white shadow-lg hover:bg-stone-700 transition-colors tracking-tight cursor-pointer"
            >
              <Download size={20} />
              Download for Mac
            </button>
          </div>

          <div className="relative mb-8 flex items-center justify-center mx-auto rounded-lg mt-16 overflow-hidden p-12 w-full min-h-[36rem]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <img
              src="/app.jpeg"
              alt="App"
              className="relative z-10 w-[85%] rounded-lg shadow-lg"
            />
          </div>

          <div className="mb-12 mx-auto max-w-md rounded-lg bg-white/50 px-4 py-3 text-sm text-stone-400 text-center">
            <p>After moving to Applications, run:</p>
            <code className="mt-1 block font-mono bg-white px-2 py-1 rounded text-stone-500">
              xattr -cr /Applications/Getout.app
            </code>
          </div>
        </div>

        {/* Section divider with crosses */}
        <div className="relative h-px bg-stone-200">
          <div className="absolute left-0 -top-2.5 -translate-x-1/2">
            <Cross className="text-stone-400" />
          </div>
          <div className="absolute right-0 -top-2.5 translate-x-1/2">
            <Cross className="text-stone-400" />
          </div>
        </div>

        <section className="py-16 px-8">
          <div className="mx-auto w-[75%]">
            <h2 className="text-2xl font-semibold text-stone-800 text-center mb-8">
              See it in action
            </h2>
            <div className="flex flex-col gap-10">
              <div className="relative bg-white rounded-md p-6 shadow-xs border border-stone-100">
                <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-stone-50 border border-stone-300 text-stone-500 rounded-full flex items-center justify-center text-xs font-medium">
                  1
                </div>
                <img
                  src="/product-image-1.png"
                  alt="Write once, ship anywhere"
                  className="rounded-lg w-full h-auto object-cover border border-stone-200"
                />
                <div className="border-t border-stone-100 mt-4 pt-4 -mx-6 px-6">
                  <p className="text-sm font-medium text-stone-700 text-center">Write once. Ship anywhere.</p>
                  <p className="text-sm text-stone-500 text-center mt-1">Jot down a thought, then send it to Linear, Slack, or AI Chat without copy-pasting.</p>
                </div>
              </div>
              <div className="relative bg-white rounded-md p-6 shadow-xs border border-stone-100">
                <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-stone-50 border border-stone-300 text-stone-500 rounded-full flex items-center justify-center text-xs font-medium">
                  2
                </div>
                <img
                  src="/product-image-2.png"
                  alt="AI that knows your tools"
                  className="rounded-lg w-full h-auto object-cover border border-stone-200"
                />
                <div className="border-t border-stone-100 mt-4 pt-4 -mx-6 px-6">
                  <p className="text-sm font-medium text-stone-700 text-center">AI that knows your tools</p>
                  <p className="text-sm text-stone-500 text-center mt-1">Ask it to find Slack threads, check your Linear tasks, or send a message. It actually does it.</p>
                </div>
              </div>
              <div className="relative bg-white rounded-md p-6 shadow-xs border border-stone-100">
                <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-stone-50 border border-stone-300 text-stone-500 rounded-full flex items-center justify-center text-xs font-medium">
                  3
                </div>
                <img
                  src="/product-image-3.png"
                  alt="Sketch ideas fast"
                  className="rounded-lg w-full h-auto object-cover border border-stone-200"
                />
                <div className="border-t border-stone-100 mt-4 pt-4 -mx-6 px-6">
                  <p className="text-sm font-medium text-stone-700 text-center">Sketch ideas fast</p>
                  <p className="text-sm text-stone-500 text-center mt-1">Quick drawings when you need to think visually. No app switching.</p>
                </div>
              </div>
              <div className="relative bg-white rounded-md p-6 shadow-xs border border-stone-100">
                <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-stone-50 border border-stone-300 text-stone-500 rounded-full flex items-center justify-center text-xs font-medium">
                  4
                </div>
                <img
                  src="/product-image-4.png"
                  alt="Your issues, searchable"
                  className="rounded-lg w-full h-auto object-cover border border-stone-200"
                />
                <div className="border-t border-stone-100 mt-4 pt-4 -mx-6 px-6">
                  <p className="text-sm font-medium text-stone-700 text-center">Your issues, searchable</p>
                  <p className="text-sm text-stone-500 text-center mt-1">Linear tickets at your fingertips. Search by ID, title, or description.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section divider with crosses */}
        <div className="relative h-px bg-stone-200">
          <div className="absolute left-0 -top-2.5 -translate-x-1/2">
            <Cross className="text-stone-400" />
          </div>
          <div className="absolute right-0 -top-2.5 translate-x-1/2">
            <Cross className="text-stone-400" />
          </div>
        </div>

        <section className="py-16 px-8">
          <h2 className="text-2xl font-semibold text-stone-800 text-center mb-8">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 rounded-md bg-white shadow-sm">
              <Command className="text-stone-700 mb-3" size={28} />
              <h3 className="text-base font-medium text-stone-800 mb-1">
                Command Palette
              </h3>
              <p className="text-sm text-stone-500">
                Type /slack, /issues, /calendar—everything one keystroke away
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-md bg-white shadow-sm">
              <Link className="text-stone-700 mb-3" size={28} />
              <h3 className="text-base font-medium text-stone-800 mb-1">
                Connected Tools
              </h3>
              <p className="text-sm text-stone-500">
                Notes become tickets. Threads become follow-ups. Tools talk to each other.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-md bg-white shadow-sm">
              <Bot className="text-stone-700 mb-3" size={28} />
              <h3 className="text-base font-medium text-stone-800 mb-1">
                AI That Acts
              </h3>
              <p className="text-sm text-stone-500">
                Not just answers—actions. Schedule meetings, create issues, send messages.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-md bg-white shadow-sm">
              <Keyboard className="text-stone-700 mb-3" size={28} />
              <h3 className="text-base font-medium text-stone-800 mb-1">
                Keyboard-First
              </h3>
              <p className="text-sm text-stone-500">
                Arrow keys, enter, escape. Mouse optional.
              </p>
            </div>
          </div>
        </section>

      </div>

      <footer className="mt-auto w-full bg-stone-100 border-t border-stone-200">
        <div className="mx-auto py-8 flex flex-col items-center gap-4 text-sm text-stone-500">
          <div className="flex items-center gap-6">
            <span className="text-stone-400">Contact:</span>
            <a
              href="mailto:support@trygetout.app"
              className="hover:text-stone-700"
            >
              support@trygetout.app
            </a>
            <a
              href="https://twitter.com/ankitiscracked"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-700"
            >
              @ankitiscracked
            </a>
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-stone-700">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-stone-700">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
