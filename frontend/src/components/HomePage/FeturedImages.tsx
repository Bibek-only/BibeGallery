import type { Image } from "../../services/type";
import { useState,useEffect } from "react";
import { getPublicImages } from "../../services/mockData";

const FeturedImages = () => {
    const [images, setImages] = useState<Image[]>([]);
    useEffect(() => {
            // Get a subset of public images for the hero section
            const publicImages = getPublicImages().slice(0, 12);
            setImages(publicImages);
          }, []);
  return (
    <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Featured Images</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.slice(0, 8).map((image) => (
            <div
              key={image.imageId}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={image.imageUrl || "/placeholder.svg"}
                alt={`Image ${image.imageId}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ aspectRatio: Math.random() > 0.5 ? "3/4" : "3/5" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    By {image.user.name}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {image.tags.map((tag: any) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/20 px-2 py-1 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default FeturedImages
