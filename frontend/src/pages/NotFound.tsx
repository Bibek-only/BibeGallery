import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-8 mt-4 text-xl text-muted-foreground">Page not found</p>
      <Button asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
}
