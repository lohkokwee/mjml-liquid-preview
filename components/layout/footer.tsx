"use client"

import { useLayout } from "@/hooks/use-layout"
import { Github, BookHeart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const { isFullScreen } = useLayout();

  if (isFullScreen) return null;

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <a
            href="https://kokwee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80"
          >
            <BookHeart className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/lohkokwee/mjml-liquid-preview"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80"
          >
            <Github className="h-4 w-5" />
          </a>
        </div>
        <a
          href="https://buymeacoffee.com/kokwee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm">
            <span className="font-sans">Buy me a coffee :)</span>
          </Button>
        </a>
      </div>
    </footer>
  )
} 