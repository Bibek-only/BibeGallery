import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { Image } from "../services/type";
import MasonryGrid from "../components/MosonryGrid";
import ImageModal from "../components/ImageModal";
import { useSelector } from "react-redux";
import {filterImageFunction} from "../services/export.services"
import Loader from "@/components/Loader";


export default function HomePage() {
  const { publicImages } = useSelector((state: any) => state.imageReducer);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { searchQuery,tagQuery } = useSelector((state: any) => state.imageReducer);
  const {isLoading} = useSelector((state:any)=> state.loadingReducer)
  

  const [images,setImages] = useState(publicImages);
  useEffect(()=>{
    const filterImages = filterImageFunction(searchQuery,tagQuery,publicImages)
    setImages(filterImages)
  },[tagQuery,searchQuery,publicImages])
  

 

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return isLoading?(<Loader isLoading={isLoading} message="Loading the images" />):(
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Amazing Images</h1>

      <MasonryGrid
        images={images}
        onImageClick={()=>{}}
        onUserClick={handleUserClick}
      />

      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
