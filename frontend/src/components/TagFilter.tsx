import { X } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

// Mock data for available tags
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
  "macro",
  "street",
  "night",
  "vintage",
  "minimalist",
]

interface TagFilterProps {
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}

export default function TagFilter({ selectedTags, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              #{tag}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => onTagSelect(tag)}>
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {tag} filter</span>
              </Button>
            </Badge>
          ))}
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => selectedTags.forEach((tag) => onTagSelect(tag))}
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex gap-2">
          {availableTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              className="h-7 rounded-full text-xs"
              onClick={() => onTagSelect(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
