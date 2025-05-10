"use client"

import type React from "react"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { X, Upload, ImageIcon, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Badge } from "./ui/badge"

// Available tags for selection
const availableTags = [
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
]

interface UploadFormProps {
  onSuccess?: () => void
}

interface FormValues {
  image: FileList
  tags: string[]
  isPublic: boolean
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [customTag, setCustomTag] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tags: [],
      isPublic: true,
    },
  })

  const selectedTags = watch("tags")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTagToggle = (tag: string) => {
    const currentTags = [...selectedTags]
    const tagIndex = currentTags.indexOf(tag)

    if (tagIndex > -1) {
      currentTags.splice(tagIndex, 1)
    } else {
      currentTags.push(tag)
    }

    setValue("tags", currentTags)
  }

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setValue("tags", [...selectedTags, customTag.trim()])
      setCustomTag("")
    }
  }

  const onSubmit = (data: FormValues) => {
    setIsUploading(true)

    // Log form data for now
    console.log("Form submitted:", {
      image: data.image[0],
      tags: data.tags,
      visibility: data.isPublic ? "PUBLIC" : "PRIVATE",
    })

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      if (onSuccess) onSuccess()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="image-upload">Image</Label>
        <div className="flex items-center justify-center">
          {imagePreview ? (
            <div className="relative h-48 w-full overflow-hidden rounded-lg border">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                onClick={() => {
                  setImagePreview(null)
                  setValue("image", {} as FileList)
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ) : (
            <label
              htmlFor="image-upload"
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <ImageIcon className="mb-3 h-10 w-10 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", { required: "Image is required" })}
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
        {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Add custom tag"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCustomTag()
              }
            }}
          />
          <Button type="button" size="icon" onClick={addCustomTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => handleTagToggle(tag)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>

        <Controller
          name="tags"
          control={control}
          rules={{ required: "At least one tag is required" }}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => <Switch id="visibility" checked={field.value} onCheckedChange={field.onChange} />}
        />
        <Label htmlFor="visibility">Make this image public</Label>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isUploading || !imagePreview}>
        {isUploading ? (
          <>Uploading...</>
        ) : (
          <>
            <Upload className="h-4 w-4" /> Upload Image
          </>
        )}
      </Button>
    </form>
  )
}
