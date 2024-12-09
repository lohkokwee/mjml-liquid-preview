"use client"

import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { LiquidManager } from "@/components/liquid/liquid-manager"
import { ViewportManager } from "@/components/previewer/viewport-manager"
import { CopyManager } from "@/components/layout/copy-manager"
import { InfoButton } from "@/components/layout/info"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 justify-between">
        <div className="flex items-center">
          <Link className="flex items-center space-x-2" href="/">
            <span className="font-sans font-bold sm:inline-block">
              MJML + Liquid
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <ViewportManager />
            <LiquidManager />
            <CopyManager />
            <ThemeSwitcher />
            <InfoButton />
          </nav>
        </div>
      </div>
    </header>
  )
} 