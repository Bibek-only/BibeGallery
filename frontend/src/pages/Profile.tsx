import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Upload, Trash2 } from "lucide-react"
import { getUserImages } from "../services/mockData"
import type { Image } from "../services/type"
import MasonryGrid from "../components/MosonryGrid"
import ImageModal from "../components/ImageModal"
import UploadForm from "../components/UploadForm"

// Mock user data
const user = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  profileImageUrl: "/placeholder.svg?height=100&width=100",
  imageCount: 15,
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"PUBLIC" | "PRIVATE">("PUBLIC")
  const [images, setImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userImages = getUserImages(user.id, activeTab)
    setImages(userImages)
  }, [activeTab])

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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="space-y-6 rounded-lg border p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profileImageUrl || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Images</span>
                <span className="font-medium">{images.length}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Upload a new image</DialogTitle>
                  </DialogHeader>
                  <UploadForm onSuccess={() => setIsUploadOpen(false)} />
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <h2 className="mb-6 text-2xl font-bold">Your Gallery</h2>

          <Tabs
            defaultValue={activeTab}
            onValueChange={(value:any) => setActiveTab(value as "PUBLIC" | "PRIVATE")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="PUBLIC">Public</TabsTrigger>
              <TabsTrigger value="PRIVATE">Private</TabsTrigger>
            </TabsList>

            <TabsContent value="PUBLIC" className="mt-0">
              {images.length > 0 ? (
                <MasonryGrid images={images} onImageClick={handleImageClick} onUserClick={handleUserClick} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="mb-4 text-lg text-muted-foreground">You don't have any public images yet.</p>
                  <Button onClick={() => setIsUploadOpen(true)}>Upload Your First Image</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="PRIVATE" className="mt-0">
              {images.length > 0 ? (
                <MasonryGrid images={images} onImageClick={handleImageClick} onUserClick={handleUserClick} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="mb-4 text-lg text-muted-foreground">You don't have any private images yet.</p>
                  <Button onClick={() => setIsUploadOpen(true)}>Upload Your First Image</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ImageModal image={selectedImage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
