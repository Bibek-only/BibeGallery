import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { Image } from "../services/type";
import MasonryGrid from "../components/MosonryGrid";
import ImageModal from "../components/ImageModal";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { publicImages } = useSelector((state: any) => state.imageReducer);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { searchQuery,tagQuery } = useSelector((state: any) => state.imageReducer);
  const normalizedQuery = searchQuery.toLowerCase(); // make it case-insensitive
  
  const images = publicImages.filter((image: any) => {
    const hasSearch = normalizedQuery.length > 0;
    const hasTagQuery = tagQuery.length > 0;
  
    // If neither search nor tag filtering is requested, show all
    if (!hasSearch && !hasTagQuery) return true;
  
    // Search matches
    const tagMatch = image.tags.some(
      (tag: string) =>
        tag.toLowerCase().includes(normalizedQuery) ||
        tag.toLowerCase().startsWith(normalizedQuery)
    );
    const nameMatch = image.user?.name?.toLowerCase().includes(normalizedQuery);
    const emailMatch = image.user?.email
      ?.toLowerCase()
      .includes(normalizedQuery);
  
    // Tag array match
    const tagMatch2 = image.tags.some((tag: string) =>
      tagQuery.some(
        (matchTag: string) => tag.toLowerCase() === matchTag.toLowerCase()
      )
    );
  
    return (hasSearch && (tagMatch || nameMatch || emailMatch)) || tagMatch2;
  });
  
  

  const handleImageClick = (imageId: string) => {
    const image = images.find((img: any) => img.imageId === imageId);
    if (image) {
      setSelectedImage(image);
      setIsModalOpen(true);
    }
  };

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Amazing Images</h1>

      <MasonryGrid
        images={images}
        onImageClick={handleImageClick}
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
