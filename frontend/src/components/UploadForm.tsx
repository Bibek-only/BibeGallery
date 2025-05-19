import { useState } from "react";
import { X, Upload, ImageIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { API } from "@/API";
import {setLoadingState} from "../store/reducers/Loader/loadingStatus"
import {setIsuploadFormOpen, setPublicImages} from "../store/reducers/image/imageSlice"
import { useSelector,useDispatch } from "react-redux";
import Loader from "./Loader";
import { getAllPublicImages, getUserPrivateImages, getUserPublicIMages } from "@/services/export.services";
import { setUserPrivateImages, setUserPublicImages } from "@/store/reducers/user/userSlice";

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
];

enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

type Inputs = {
  image: FileList;
  tags: string[];
  visibility: Visibility;
};

// Max file size: 2MB
const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function UploadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [customTag, setCustomTag] = useState("");
  const {isLoading} = useSelector((state:any)=> state.loadingReducer);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      tags: [],
      visibility: Visibility.PUBLIC,
    },
  });

  const selectedTags = watch("tags") || [];

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return; // Size validation will be handled by the register validation
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    const currentTags = [...selectedTags];
    const tagIndex = currentTags.indexOf(tag);

    if (tagIndex > -1) {
      currentTags.splice(tagIndex, 1);
    } else {
      currentTags.push(tag);
    }

    setValue("tags", currentTags);
  };

  // Add custom tag
  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setValue("tags", [...selectedTags, customTag.trim().toLowerCase()]);
      setCustomTag("");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Form Data:", {
      image: data.image[0],
      tags: data.tags,
      visibility: data.visibility,
    });
    const formData = new FormData();
    formData.append("image", data.image[0]);
    data.tags.forEach((tag) => {
      formData.append("tags", tag); 
    });
    formData.append("visibility", data.visibility);


    //send the backend request
    try {
      dispatch(setLoadingState(true))
      const res = await axios.post(`${API}/user/upload-image`,
        formData,{
          withCredentials: true,
      })
      console.log("Image upload res",res.data);
      if(res.data.success){
        //show success toast
        dispatch(setIsuploadFormOpen(false))
        console.log("file upload successfull"); 
        //load the profiles image again and show it up here
        try {
          const publicImageRes = await getUserPublicIMages();
        if (publicImageRes.success) {
          //set the data to the store
          dispatch(setUserPublicImages(publicImageRes.data));
        }
        } catch (error:any) {
          console.log("error in gettng public images of profile catch upload form",error);
        }
        try {
          const res = await getUserPrivateImages();
        if (res.success) {
          //set the data to the store
          dispatch(setUserPrivateImages(res.data));
         
        }
        } catch (error) {
          console.log("gettgin privateimage error incatch upload form",error);
        }
        try {
        const allPOublicImageRes = await getAllPublicImages()
        if(allPOublicImageRes.success){
          dispatch(setPublicImages(allPOublicImageRes.data));
        }
      
        } catch (error) {
          console.log("Error in catch in getting all users public images catch uplaod form",error);
        }
      }
    } catch (error:any) {
      // show error toast
      console.log("Error in form subbmition",error);
    }finally{
      dispatch(setLoadingState(false))
    }
  };

  return isLoading ?(<Loader isLoading={isLoading} message="Uploading form" />): (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="image-upload">Image</Label>
        <div className="flex items-center justify-center">
          {imagePreview ? (
            <div className="relative h-48 w-full overflow-hidden rounded-lg border">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80"
                onClick={() => {
                  setImagePreview(null);
                  setValue("image", undefined as any);
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG or GIF (MAX. 2MB)
                </p>
              </div>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", {
                  required: "An image is required",
                  validate: {
                    fileSize: (files) => {
                      if (!files?.[0]) return true;
                      return (
                        files[0].size <= MAX_FILE_SIZE ||
                        "Image size should be less than 2MB"
                      );
                    },
                  },
                  onChange: handleImageChange,
                })}
              />
            </label>
          )}
        </div>
        {errors.image && (
          <p className="text-sm text-destructive">
            {errors.image.message as string}
          </p>
        )}
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
                e.preventDefault();
                addCustomTag();
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
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => handleTagToggle(tag)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        {errors.tags && (
          <p className="text-sm text-destructive">
            {errors.tags.message as string}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="visibility"
          control={control}
          render={({ field }) => (
            <Switch
              id="visibility"
              checked={field.value === Visibility.PUBLIC}
              onCheckedChange={(checked) => {
                field.onChange(
                  checked ? Visibility.PUBLIC : Visibility.PRIVATE
                );
              }}
            />
          )}
        />
        <Label htmlFor="visibility">Make this image public</Label>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={!imagePreview}>
        <Upload className="h-4 w-4" /> Upload Image
      </Button>
    </form>
  );
}
