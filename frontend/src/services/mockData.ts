import {User,Image} from "./type"

// Mock users
export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    profileImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&q=80",
    createdAt: new Date(2023, 0, 15).toISOString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    profileImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=80",
    createdAt: new Date(2023, 1, 20).toISOString(),
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=80",
    createdAt: new Date(2023, 2, 10).toISOString(),
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&q=80",
    createdAt: new Date(2023, 3, 5).toISOString(),
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&q=80",
    createdAt: new Date(2023, 4, 25).toISOString(),
  },
]

// Real image URLs for the gallery
const imageUrls = [
  // Nature
  // "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=700&fit=crop&q=80",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/your_bookings_qB7N8ZRAS.png",// Tall
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/bibek_samal-min_rIGaIqOWMp.jpeg",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/hotel_C8bTMvrymq.jpg",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/booking_jjxI2fDPb.png",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/booking_L0FuL1c2B.png",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/payment_HaqqbH9ykd.png",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/review_WSTlFF0Iz.png",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/signup_oJ6aT-WZP.png",
  "https://ik.imagekit.io/Bibekabcsik09/bibe-gallery/your_bookings_qB7N8ZRAS.png",
  
  // Architecture
  // "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?w=500&h=700&fit=crop&q=80", // Tall
  
  // Urban
  // "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=700&fit=crop&q=80", // Tall
  
  // Portrait
  // "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=700&fit=crop&q=80", // Tall
  
  // Abstract
  // "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1507908708918-778587c9e563?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=700&fit=crop&q=80", // Tall
  
  // Food
  // "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=700&fit=crop&q=80", // Tall
  
  // // Travel
  // "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=700&fit=crop&q=80", // Tall
  
  // // Animals
  // "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=500&h=700&fit=crop&q=80", // Tall
  
  // // Black and White
  // "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1469817805249-72b7df1c3c05?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=500&h=700&fit=crop&q=80", // Tall
  
  // // Night
  // "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500&h=700&fit=crop&q=80", // Tall
  
  // // Vintage
  // "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=500&h=750&fit=crop&q=80", // Tall
  // "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=500&h=400&fit=crop&q=80", // Wide
  // "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&h=600&fit=crop&q=80", // Medium
  // "https://images.unsplash.com/photo-1531335773500-23410807357a?w=500&h=700&fit=crop&q=80", // Tall
]

// Generate random images
const generateRandomImages = (): Image[] => {
  const images: Image[] = []
  const visibilityOptions: ("PUBLIC" | "PRIVATE")[] = ["PUBLIC", "PRIVATE"]
  const tagOptions = [
    "nature",
    "portrait",
    "landscape",
    "urban",
    "architecture",
    "travel",
    "food",
    "animals",
    "abstract",
    "black-and-white",
    "macro",
    "street",
    "night",
    "vintage",
    "minimalist",
  ]

  // Generate 50 random images
  for (let i = 1; i <= 50; i++) {
    const userId = Math.floor(Math.random() * 5) + 1 // Random user ID between 1 and 5
    const user = mockUsers.find((u) => u.id === userId)!

    // Generate 1-3 random tags
    const numTags = Math.floor(Math.random() * 3) + 1
    const tags: string[] = []
    for (let j = 0; j < numTags; j++) {
      const randomTag = tagOptions[Math.floor(Math.random() * tagOptions.length)]
      if (!tags.includes(randomTag)) {
        tags.push(randomTag)
      }
    }

    // Random visibility
    const visibility = visibilityOptions[Math.floor(Math.random() * visibilityOptions.length)]

    // Random date within the last year
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 365))

    // Get a random image URL from our collection
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]

    // Create image
    images.push({
      id: i,
      imageId: `img-${i}`,
      imageUrl,
      tags,
      visibility,
      userId,
      user,
      createdAt: date.toISOString(),
    })
  }

  return images
}

export const mockImages = generateRandomImages()

// Helper functions to get data
export const getUserImages = (userId: number, visibility?: "PUBLIC" | "PRIVATE") => {
  if (visibility) {
    return mockImages.filter((img) => img.userId === userId && img.visibility === visibility)
  }
  return mockImages.filter((img) => img.userId === userId)
}

export const getPublicImages = () => {
  return mockImages.filter((img) => img.visibility === "PUBLIC")
}

export const getImageById = (imageId: string) => {
  return mockImages.find((img) => img.imageId === imageId)
}

export const getUserById = (userId: number) => {
  return mockUsers.find((user) => user.id === userId)
}
