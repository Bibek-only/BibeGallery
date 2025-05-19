import { useParams } from "react-router-dom";
import MasonryGrid from "../components/MosonryGrid";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterImageFunction,
  getSpecificPersonPublicImages,
} from "../services/export.services";
import { setSpecificPersonData } from "../store/reducers/image/imageSlice";
import { setLoadingState } from "../store/reducers/Loader/loadingStatus";
import Loader from "@/components/Loader";

export default function UserPage() {
  const { userId } = useParams<{ userId: string }>();
  const { specificPersonData = { images: [], name: "", profileImageUrl: "" } } =
    useSelector((state: any) => state.imageReducer);
  const { isLoading } = useSelector((state: any) => state.loadingReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      //call the service for getting the user's images data
      if (userId) {
        dispatch(setLoadingState(true));
        try {
          const res = await getSpecificPersonPublicImages(userId);
          if (res.success) {
            dispatch(setSpecificPersonData(res.data));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          dispatch(setLoadingState(false));
        }
      }
    })();
  }, [userId, dispatch]);

  const { searchQuery, tagQuery } = useSelector(
    (state: any) => state.imageReducer
  );
  const [images, setImages] = useState(specificPersonData.images || []);
  useEffect(() => {
    if (Array.isArray(specificPersonData.images)) {
      const filterImages = filterImageFunction(
        searchQuery,
        tagQuery,
        specificPersonData.images
      );
      setImages(filterImages);
    }
  }, [tagQuery, searchQuery, specificPersonData]);

  return isLoading ? (
    <Loader isLoading={isLoading} message="Loading the person Images"></Loader>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={specificPersonData.profileImageUrl || "/placeholder.svg"}
            alt={specificPersonData.name || "User"}
          />
          <AvatarFallback>
            {specificPersonData.name
              ? specificPersonData.name
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")
              : "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">
            {specificPersonData.name || "User"}
          </h1>
          <p className="mt-2 text-sm">
            <span className="font-medium">
              {specificPersonData.images?.length || 0}
            </span>{" "}
            <span className="text-muted-foreground">
              public{" "}
              {(specificPersonData.images?.length || 0) === 1
                ? "image"
                : "images"}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-6 text-xl font-semibold">Public Gallery</h2>
        {Array.isArray(specificPersonData.images) &&
        specificPersonData.images.length > 0 ? (
          <MasonryGrid
            images={images}
            onImageClick={() => {}}
            onUserClick={() => {}}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">
              This user hasn't shared any public images yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
