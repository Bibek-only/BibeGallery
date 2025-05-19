import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

import Hero from "@/components/LandingPage/Hero";
import About from "@/components/LandingPage/About";
import FeturedImages from "@/components/LandingPage/FeturedImages";
import { useSelector } from "react-redux";

import Loader from "@/components/Loader";
export default function LandingPage() {
  //state to set for the loader
  const { isLoading } = useSelector((state: any) => state.loadingReducer);
  
  
  return isLoading ? (
    <Loader isLoading={true} message="Loading....."></Loader>
  ) : (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <Hero></Hero>

      {/* Demo Slider Section */}
      <FeturedImages></FeturedImages>

      {/* About Section */}
      <About></About>

      <div className="container mx-auto flex justify-center px-4">
        <Link to="/home">
          <Button size="lg" className="gap-2 text-lg">
            Explore Gallery <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
