"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-secondary bg-bg-primary/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-container">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent-primary flex items-center justify-center font-bold text-bg-primary select-none">A</div>
          <span className="text-lg font-bold tracking-tight text-text-primary">Atomity</span>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Platform</Link>
          <Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Solutions</Link>
          <Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Pricing</Link>
          <Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Company</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Log In</button>
          <button className="rounded-full bg-text-primary px-5 py-2 text-sm font-semibold text-bg-primary hover:bg-text-secondary transition-all active:scale-95">Get Started</button>
        </div>
      </nav>
    </header>
  );
}
