import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileView from "./NavBar/MobileView";
import PcView from "./NavBar/PcView";
import TagFilter from "./TagFilter";
import { Input } from "./ui/input";

// Mock user data - would come from auth context in a real app
const user = {
  name: "John Doe",
  image: "/placeholder.svg?height=40&width=40",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";
  const showSearch = !isLandingPage;

  //own code

  const [isLogedin, setisLogedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSignOut = () => {
    // In a real app, this would call your auth service's signOut method
    console.log("Signing out...");
    // Redirect to landing page
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || !isLandingPage
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/home" className="flex items-center gap-2">
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
          <PcView></PcView>
          <MobileView></MobileView>
        </div>
      </div>

      {showSearch && (
        <div className="container mx-auto overflow-hidden pb-2 px-4">
          <TagFilter
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>
      )}
    </header>
  );
}

//show the register button if the user is not logeed in
//show the show the profile button if the user is loged in
//show the admin button in the profile if the user is admin
