"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const { setTheme } = useTheme()

  return (
    <header className="w-full border-b bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition">
          Traffic Visualizer
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Dashboard</Link>
          <Link href="/analytics" className="hover:text-primary transition-colors">Analytics</Link>
          <Link href="/settings" className="hover:text-primary transition-colors">Settings</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
            <Sun className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
            <Moon className="h-5 w-5" />
          </Button>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="md:hidden">
              <DropdownMenuItem asChild><Link href="/">Dashboard</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/analytics">Analytics</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
