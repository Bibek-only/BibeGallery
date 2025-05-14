import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { getUserById, getUserImages } from "../services/mockData"
import type { User, Image } from "../services/type"
import MasonryGrid from "../components/MosonryGrid"
import ImageModal from "../components/ImageModal"

export default function UserPage() {
  const { userId } = useParams<{ userId: string }>()
  
  const [user, setUser] = useState<User | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      
      const foundUser = getUserById(Number.parseInt(userId))
      if (foundUser) {
        setUser(foundUser)
        // Get only public images for other users
        const userImages = getUserImages(Number.parseInt(userId), "PUBLIC")
        setImages(userImages)
      }
    }
  }, [userId])

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

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>User not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.profileImageUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n:any) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="mt-2 text-sm">
            <span className="font-medium">{images.length}</span>{" "}
            <span className="text-muted-foreground">public {images.length === 1 ? "image" : "images"}</span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-6 text-xl font-semibold">Public Gallery</h2>
        {images.length > 0 ? (
          <MasonryGrid images={images} onImageClick={handleImageClick} onUserClick={handleUserClick} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">This user hasn't shared any public images yet.</p>
          </div>
        )}
      </div>

      <ImageModal image={selectedImage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
