"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { User } from "lucide-react"
import type { Image as ImageType } from "../services/type"

interface MasonryGridProps {
  images: ImageType[]
  onImageClick?: (imageId: string) => void
  onUserClick?: (userId: number) => void
}

export default function MasonryGrid({ images, onImageClick, onUserClick }: MasonryGridProps) {
  const [columns, setColumns] = useState(4)
  const gridRef = useRef<HTMLDivElement>(null)

  // Determine number of columns based on viewport width
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 768) {
        setColumns(2)
      } else if (window.innerWidth < 1024) {
        setColumns(3)
      } else {
        setColumns(4)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Distribute images into columns
  const getColumnImages = () => {
    const columnImages: ImageType[][] = Array.from({ length: columns }, () => [])

    images.forEach((image, index) => {
      const columnIndex = index % columns
      columnImages[columnIndex].push(image)
    })

    return columnImages
  }

  const handleImageClick = (e: React.MouseEvent, imageId: string) => {
    e.preventDefault()
    if (onImageClick) {
      onImageClick(imageId)
    }
  }

  const handleUserClick = (e: React.MouseEvent, userId: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (onUserClick) {
      onUserClick(userId)
    }
  }

  const columnImages = getColumnImages()

  return (
    <div
      ref={gridRef}
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {columnImages.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {column.map((image) => (
            <div key={image.imageId} className="group relative overflow-hidden rounded-lg">
              <div
                
                className="block w-full"
                onClick={(e) => handleImageClick(e, image.id.toString())}
              >
                <img
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={`Image ${image.id}`}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onClick={(e) => handleUserClick(e, image.user.id)}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium cursor-pointer hover:underline">{image.user.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
