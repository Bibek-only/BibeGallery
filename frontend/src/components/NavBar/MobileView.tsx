import { LogOut, Menu, Search } from "lucide-react"
import {  useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { useSelector } from "react-redux"

const MobileView = () => {
    
    const [searchQuery, setSearchQuery] = useState("")
    
    const location = useLocation()
    const navigate = useNavigate()
    const isLandingPage = location.pathname === "/"
    const showSearch = !isLandingPage
  
    //own code
  
    const {isLogedIn,isAdmin} = useSelector((state:any)=>state.authReducer);

    
    
      const handleSignOut = () => {
        // In a real app, this would call your auth service's signOut method
        
        // Redirect to landing page
        navigate("/")
      }
  return (
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
                          onChange={(e:any) => setSearchQuery(e.target.value)}
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
                      {isLogedIn ? (
                        <>
                          <Link to="/profile" className="text-lg font-medium">
                            Profile
                          </Link>
                          {isAdmin?(<Link to="/admin" className="text-lg font-medium">
                            Admin
                          </Link>):null}
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
  )
}

export default MobileView
