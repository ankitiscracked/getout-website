import { Download } from "lucide-react";
import Logo from "./Logo";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

export default function App() {
  const path = window.location.pathname;
  if (path === "/privacy") {
    return <PrivacyPolicy />;
  }

  if (path === "/terms") {
    return <TermsOfService />;
  }

  // The DMG file URL - replace with your actual storage location
  // Options: GitHub Releases, Cloudflare R2, or any public CDN
  const DMG_URL =
    "https://github.com/yourusername/getout/releases/download/v1.0.0/getout.dmg";

  // Claude Monet - Water Lilies (1906) - Public Domain
  const monetPainting =
    "https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = DMG_URL;
    link.download = "getout.dmg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-4">
      <div className="flex items-center gap-3 pt-6 mx-auto">
        <div className="h-12 w-12">
          <Logo />
        </div>
        <span className="text-2xl font-bold text-[--color-main]">Getout</span>
      </div>

      <h1 className="mt-8 text-5xl font-light text-stone-800 text-center tracking-tight">
        A Multi-Tool for Professionals
      </h1>
      <button
        onClick={handleDownload}
        className="mt-6 mx-auto flex items-center gap-2 rounded-full bg-stone-800 px-4 py-2 font-semibold text-white shadow-lg hover:bg-stone-700 transition-colors tracking-tight"
      >
        <Download size={20} />
        Download for Mac
      </button>

      <div className="relative mb-12 flex items-center justify-center mx-auto rounded-lg mt-24 overflow-hidden p-12 w-[80%] min-h-[36rem]">
        <div
          className="absolute inset-0 opacity-75"
          style={{
            backgroundImage: `url(${monetPainting})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <img
          src="/app.jpeg"
          alt="App"
          className="relative z-10 w-[70%] rounded-lg shadow-lg"
        />
      </div>

      <footer className="mx-auto mb-10 flex gap-6 text-sm text-stone-500">
        <a href="/privacy" className="hover:text-stone-700">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-stone-700">
          Terms of Service
        </a>
      </footer>
    </div>
  );
}
