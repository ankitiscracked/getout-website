import { useEffect, type ReactNode } from "react";
import Logo from "./Logo";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  useEffect(() => {
    document.title = `${title} - Getout`;
    return () => {
      document.title = "Getout - A Multitool for Professionals";
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-white px-3 sm:px-4 text-stone-800">
      <header className="mx-auto flex max-w-3xl items-center gap-3 pt-6">
        <a href="/" className="flex items-center gap-3">
          <div className="h-10 w-10">
            <Logo />
          </div>
          <span className="text-xl font-bold text-[--color-main]">Getout</span>
        </a>
      </header>

      <main className="mx-auto max-w-3xl pb-16 pt-10 leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-stone-800">
          {title}
        </h1>
        <div className="mt-6 space-y-6 text-base text-stone-700">{children}</div>
      </main>
    </div>
  );
}
