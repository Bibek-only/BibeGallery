import { Trash2, Upload } from "lucide-react";
import { setIsuploadFormOpen } from "../../store/reducers/image/imageSlice";
import { useSelector, useDispatch } from "react-redux";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import UploadForm from "../../components/UploadForm";

const SideBar = () => {
  const { userInfo } = useSelector((state: any) => state.userReducer);
  const {  name, email, profileImageUrl, imageCount } = userInfo;
  const { isUploadFormOpen } = useSelector((state: any) => state.imageReducer);
  const dispatch = useDispatch();

  return (
    <div className="md:col-span-1">
      <div className="space-y-6 rounded-lg border p-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={profileImageUrl || "/placeholder.svg"}
              alt={name}
            />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n: any) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Images</span>
            <span className="font-medium">{imageCount}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Dialog
            open={isUploadFormOpen}
            onOpenChange={(isOpen) => {
              dispatch(setIsuploadFormOpen(isOpen));
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="w-full gap-2"
                onClick={() => {
                  dispatch(setIsuploadFormOpen(true));
                }}
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload a new image</DialogTitle>
              </DialogHeader>
              <UploadForm />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
