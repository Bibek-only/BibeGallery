import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { mockUsers, getUserImages } from "../services/mockData"
import type { User, Image } from "../services/type"
import MasonryGrid from "../components/MosonryGrid"
import ImageModal from "../components/ImageModal"

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userImages, setUserImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setUsers(mockUsers)
    // Select the first user by default
    if (mockUsers.length > 0) {
      setSelectedUser(mockUsers[0])
    }
  }, [])

  useEffect(() => {
    if (selectedUser) {
      // Get all images (both public and private) for the selected user
      const images = getUserImages(selectedUser.id)
      setUserImages(images)
    }
  }, [selectedUser])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }

  const handleImageClick = (imageId: string) => {
    const image = userImages.find((img) => img.imageId === imageId)
    if (image) {
      setSelectedImage(image)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Left Panel - User List */}
        <div className="md:col-span-1">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">Users</h2>

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer ${
                    selectedUser?.id === user.id ? "bg-primary-100" : "hover:bg-secondary-50"
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.profileImageUrl || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - User Images */}
        <div className="md:col-span-3">
          {selectedUser ? (
            <div>
              <div className="mb-6 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedUser.profileImageUrl || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedUser.name}'s Images</h2>
                  <p className="text-sm text-muted-foreground">{userImages.length} total images</p>
                </div>
              </div>

              {userImages.length > 0 ? (
                <MasonryGrid images={userImages} onImageClick={handleImageClick} />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border py-12">
                  <p className="text-lg text-muted-foreground">This user has no images yet.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border py-12">
              <p className="text-lg text-muted-foreground">Select a user to view their images.</p>
            </div>
          )}
        </div>
      </div>

      <ImageModal image={selectedImage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
