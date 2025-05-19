import { Link } from "react-router-dom";
import { Github, Linkedin, Globe } from "lucide-react";

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

        <div className="flex items-center gap-3">
          <p className="text-sm font-medium">Developed By: Bibek samal</p>
          <div className="flex gap-3">
            <a
              href="https://github.com/Bibek-only"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/bibek-samal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://bibeksamal.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe size={20} />
              <span className="sr-only">Portfolio</span>
            </a>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BiBe Gallery
        </div>
      </div>
    </footer>
  );
}
