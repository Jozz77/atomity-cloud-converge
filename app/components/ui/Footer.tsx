import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-border-secondary bg-bg-secondary/50 py-8" aria-label="Main Footer">
      <div className="mx-auto max-w-7xl px-container flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-text-primary flex items-center justify-center text-[10px] font-bold text-bg-primary" aria-hidden="true">A</div>
          <p className="font-bold tracking-tight">Atomity &copy; 2026</p>
        </div>
        
        <nav aria-label="Social Media Links">
          <ul className="flex gap-8 list-none">
            <li><a href="#" aria-label="Visit Atomity's Twitter page" className="text-sm font-medium text-text-secondary hover:text-text-primary focus-visible:text-accent-primary outline-none transition-colors">Twitter</a></li>
            <li><a href="#" aria-label="Visit Atomity's GitHub profile" className="text-sm font-medium text-text-secondary hover:text-text-primary focus-visible:text-accent-primary outline-none transition-colors">GitHub</a></li>
            <li><a href="#" aria-label="Connect with Atomity on LinkedIn" className="text-sm font-medium text-text-secondary hover:text-text-primary focus-visible:text-accent-primary outline-none transition-colors">LinkedIn</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}