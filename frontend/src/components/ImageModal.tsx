"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { X, ZoomIn, ZoomOut, User, Calendar, Tag } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { Image as ImageType } from "../services/type"

interface ImageModalProps {
  image: ImageType | null
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  if (!image) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute right-2 top-2 z-10 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-[3fr_1fr]">
            <div
              className="relative h-[70vh] overflow-auto bg-black"
              style={{
                cursor: isZoomed ? "zoom-out" : "zoom-in",
              }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt={`Image ${image.imageId}`}
                className={`transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                } h-full w-full object-contain`}
              />
            </div>

            <div className="bg-white p-6 overflow-y-auto max-h-[70vh] hidden md:block">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Image Details</h2>
                  <p className="mt-2 text-muted-foreground">
                    Uploaded {formatDistanceToNow(new Date(image.createdAt), { addSuffix: true })}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Link to={`/user/${image.userId}`} className="font-medium hover:underline" onClick={onClose}>
                      {image.user.name}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {image.tags.map((tag:any) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
