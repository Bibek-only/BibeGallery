import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import SideBar from "@/components/ProfilePage/SideBar";
import MasonryGrid from "../components/MosonryGrid";

import { useDispatch, useSelector } from "react-redux";
import {
  filterImageFunction,
  getUserPrivateImages,
  getUserPublicIMages,
} from "../services/export.services";
import {
  setUserPrivateImages,
  setUserPublicImages,
} from "../store/reducers/user/userSlice";
import { setLoadingState } from "../store/reducers/Loader/loadingStatus";
import Loader from "@/components/Loader";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");

  const { userPublicImages = [], userPrivateImages = [] } = useSelector(
    (state: any) => state.userReducer
  );
  const { isLoading } = useSelector((state: any) => state.loadingReducer);
  const dispatch = useDispatch();

  const { searchQuery, tagQuery } = useSelector(
    (state: any) => state.imageReducer
  );
  const [publicFilterdImages, setPublicFilteredImages] =
    useState(userPublicImages);
  const [privateFilterdImages, setPrivateFilteredImages] =
    useState(userPrivateImages);
  useEffect(() => {
    if (Array.isArray(userPublicImages)) {
      const publicFilterImages = filterImageFunction(
        searchQuery,
        tagQuery,
        userPublicImages
      );
      setPublicFilteredImages(publicFilterImages);
    }
    if (Array.isArray(userPrivateImages)) {
      const privateFilteredImages = filterImageFunction(
        searchQuery,
        tagQuery,
        userPrivateImages
      );
      setPrivateFilteredImages(privateFilteredImages);
    }
  }, [tagQuery, searchQuery, userPublicImages, userPrivateImages]);

  useEffect(() => {
    //get the public images
    (async () => {
      if (userPublicImages.length == 0) {
        dispatch(setLoadingState(true));
        const res = await getUserPublicIMages();
        if (res.success) {
          //set the data to the store
          dispatch(setUserPublicImages(res.data));
        }
      }
      //get the private images
      if (userPrivateImages.length == 0) {
        dispatch(setLoadingState(true));
        const res = await getUserPrivateImages();
        if (res.success) {
          //set the data to the store
          dispatch(setUserPrivateImages(res.data));
        }
      }

      dispatch(setLoadingState(false));
    })();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Loader isLoading={isLoading} message=""></Loader>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Sidebar */}
        <SideBar></SideBar>

        {/* Main Content */}
        <div className="md:col-span-3">
          <h2 className="mb-6 text-2xl font-bold">Your Gallery</h2>

          <Tabs
            defaultValue={activeTab}
            onValueChange={(value: any) =>
              setActiveTab(value as "PUBLIC" | "PRIVATE")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="PUBLIC">Public</TabsTrigger>
              <TabsTrigger value="PRIVATE">Private</TabsTrigger>
            </TabsList>

            <TabsContent value="PUBLIC" className="mt-0">
              {Array.isArray(userPublicImages) &&
              userPublicImages.length > 0 ? (
                <MasonryGrid
                  images={publicFilterdImages || []}
                  onImageClick={() => {}}
                  onUserClick={() => {}}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="mb-4 text-lg text-muted-foreground">
                    You don't have any public images yet.
                  </p>
                  <Button
                    onClick={() => {
                      //open the upload form here
                    }}
                  >
                    Upload Your First Image
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="PRIVATE" className="mt-0">
              {Array.isArray(userPrivateImages) &&
              userPrivateImages.length > 0 ? (
                <MasonryGrid
                  images={privateFilterdImages || []}
                  onImageClick={() => {}}
                  onUserClick={() => {}}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="mb-4 text-lg text-muted-foreground">
                    You don't have any private images yet.
                  </p>
                  <Button
                    onClick={() => {
                      // open the upload form
                    }}
                  >
                    Upload Your First Image
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
