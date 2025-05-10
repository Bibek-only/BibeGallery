"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Search, Menu, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import TagFilter from "./TagFilter"

// Mock user data - would come from auth context in a real app
const user = {
  isLoggedIn: true,
  name: "John Doe",
  image: "/placeholder.svg?height=40&width=40",
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const location = useLocation()
  const navigate = useNavigate()
  const isLandingPage = location.pathname === "/"
  const showSearch = !isLandingPage

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSignOut = () => {
    // In a real app, this would call your auth service's signOut method
    console.log("Signing out...")
    // Redirect to landing page
    navigate("/")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || !isLandingPage ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">BiBe Gallery</span>
          </Link>
        </div>

        {showSearch && (
          <div className="hidden flex-1 max-w-md px-4 md:block">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            {user.isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/home">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/signin">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                {showSearch && (
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search images..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                )}
                <nav className="flex flex-col gap-4">
                  <Link to="/" className="text-lg font-medium">
                    Home
                  </Link>
                  <Link to="/home" className="text-lg font-medium">
                    Gallery
                  </Link>
                  {user.isLoggedIn ? (
                    <>
                      <Link to="/profile" className="text-lg font-medium">
                        Profile
                      </Link>
                      <Link to="/admin" className="text-lg font-medium">
                        Admin
                      </Link>
                      <Button
                        variant="ghost"
                        className="justify-start gap-2 px-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="text-lg font-medium">
                        Sign in
                      </Link>
                      <Link to="/signup" className="text-lg font-medium">
                        Sign up
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {showSearch && (
        <div className="container mx-auto overflow-hidden pb-2 px-4">
          <TagFilter selectedTags={selectedTags} onTagSelect={handleTagSelect} />
        </div>
      )}
    </header>
  )
}
