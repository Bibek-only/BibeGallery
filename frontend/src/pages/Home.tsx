import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getPublicImages } from "../services/mockData"
import type { Image } from "../services/type"
import MasonryGrid from "../components/MosonryGrid"
import ImageModal from "../components/ImageModal"

export default function HomePage() {
  const [images, setImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const publicImages = getPublicImages()
    setImages(publicImages)
  }, [])

  const handleImageClick = (imageId: string) => {
    const image = images.find((img) => img.imageId === imageId)
    if (image) {
      setSelectedImage(image)
      setIsModalOpen(true)
    }
  }

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Amazing Images</h1>

      <MasonryGrid images={images} onImageClick={handleImageClick} onUserClick={handleUserClick} />

      <ImageModal image={selectedImage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
