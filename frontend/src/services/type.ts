export interface User {
    id: number
    name: string
    email: string
    profileImageUrl?: string
    createdAt: string
  }
  
  export interface Image {
    id: number
    imageId: string
    imageUrl: string
    tags: string[]
    visibility: "PUBLIC" | "PRIVATE"
    userId: number
    user: User
    createdAt: string
  }
0  