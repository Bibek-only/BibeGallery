import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileView from "./NavBar/MobileView";
import PcView from "./NavBar/PcView";
import TagFilter from "./TagFilter";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  toggleTagInQuery,
} from "../store/reducers/image/imageSlice";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  
  const isLandingPage = location.pathname === "/";
  const showSearch = !isLandingPage;

  //search state
  const dispatch = useDispatch();
  const { searchQuery, tagQuery } = useSelector(
    (state: any) => state.imageReducer
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTagSelect = (tag: string) => {
    // Use the toggleTagInQuery action to handle both adding and removing tags
    dispatch(toggleTagInQuery(tag));
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
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
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
          <TagFilter selectedTags={tagQuery} onTagSelect={handleTagSelect} />
        </div>
      )}
    </header>
  );
}

//show the register button if the user is not logeed in
//show the show the profile button if the user is loged in
//show the admin button in the profile if the user is admin
