"use client";

import Link from "next/link";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-secondary bg-bg-primary/80 backdrop-blur-md">
      <nav aria-label="Main Navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-container">
        <Link href="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-lg p-1">
          <div className="h-8 w-8 rounded-lg bg-accent-primary flex items-center justify-center font-bold text-bg-primary select-none group-hover:scale-105 transition-transform" aria-hidden="true">A</div>
          <span className="text-lg font-bold tracking-tight text-text-primary">Atomity</span>
        </Link>
        
        {/* Desktop Links */}
        <ul className="hidden items-center gap-8 md:flex list-none">
          <li><Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:text-accent-primary outline-none">Platform</Link></li>
          <li><Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:text-accent-primary outline-none">Solutions</Link></li>
          <li><Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:text-accent-primary outline-none">Pricing</Link></li>
          <li><Link href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:text-accent-primary outline-none">Company</Link></li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <button aria-label="Log in to your account" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:text-accent-primary outline-none">Log In</button>
          <button className="rounded-full bg-text-primary px-5 py-2 text-sm font-semibold text-bg-primary hover:bg-text-secondary transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-accent-primary outline-none">Get Started</button>
        </div>

        {/* Mobile Toggle */}
        <button 
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text-primary md:hidden outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border-secondary bg-bg-secondary/95 backdrop-blur-lg ${isMenuOpen ? 'max-h-[400px] border-t' : 'max-h-0'}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-4 p-6">
          <Link href="#" className="text-base font-medium text-text-primary hover:text-accent-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Platform</Link>
          <Link href="#" className="text-base font-medium text-text-primary hover:text-accent-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Solutions</Link>
          <Link href="#" className="text-base font-medium text-text-primary hover:text-accent-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link href="#" className="text-base font-medium text-text-primary hover:text-accent-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Company</Link>
          <hr className="border-border-secondary my-2" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-3">
            <button className="w-full text-left text-base font-medium text-text-primary" onClick={() => setIsMenuOpen(false)}>Log In</button>
            <button className="w-full rounded-full bg-text-primary py-3 text-base font-semibold text-bg-primary hover:bg-text-secondary transition-all" onClick={() => setIsMenuOpen(false)}>Get Started</button>
          </div>
        </div>
      </div>
    </header>
  );
}
