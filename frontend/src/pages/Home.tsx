import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "@/components/Loader";
import { useSelector } from "react-redux";
import MasonryGrid from "../components/MosonryGrid";
import { filterImageFunction } from "../services/export.services";


export default function HomePage() {
  const { publicImages } = useSelector((state: any) => state.imageReducer);
  
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

  return isLoading?(<Loader isLoading={true} message="Loading the images" />):(
    <div className="container mx-auto px-4 py-8">
      {
        publicImages.length == 0?(
          <div className="flex items-center justify-center md:h-100 ">

          <p className="mb-8 text-3xl font-bold">
            There Is No Image's Yet
          </p>
         
          </div>
        ):(
          <h1 className="mb-8 text-3xl font-bold">Discover Amazing Images</h1>
        )
      }

      <MasonryGrid
        images={images}
        onImageClick={()=>{}}
        onUserClick={handleUserClick}
      />

      
    </div>
  );
}
