import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-border-secondary bg-bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-container flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-text-primary flex items-center justify-center text-[10px] font-bold text-bg-primary">A</div>
            <span className="font-bold tracking-tight">Atomity &copy; 2026</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Twitter</a>
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">GitHub</a>
            <a href="#" className="text-sm text-text-secondary hover:text-text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
  )
}   