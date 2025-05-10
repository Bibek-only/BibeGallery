import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link to="/" className="text-xl font-bold">
            BiBe Gallery
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            A simple image upload and user-specific image gallery
          </p>
        </div>
        <div className="flex gap-6">
          <Link to="/home" className="text-sm text-muted-foreground hover:text-foreground">
            Gallery
          </Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} BiBe Gallery</div>
      </div>
    </footer>
  )
}

