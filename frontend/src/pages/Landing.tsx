import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { getPublicImages } from "../services/mockData";
import type { Image } from "../services/type";
import Hero from "@/components/LandingPage/Hero";
import About from "@/components/LandingPage/About";
import FeturedImages from "@/components/LandingPage/FeturedImages";
import { useSelector, UseSelector } from "react-redux";

import Loader from "@/components/Loader";
export default function LandingPage() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    // Get a subset of public images for the hero section
    const publicImages = getPublicImages().slice(0, 12);
    setImages(publicImages);
  }, []);

  //state to set for the loader
  const { isLoading } = useSelector((state: any) => state.loadingReducer);

  return (
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
      <Loader isLoading={isLoading} message="Loading....."></Loader>
    </div>
  );
}
