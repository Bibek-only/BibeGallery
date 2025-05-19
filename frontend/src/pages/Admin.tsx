import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import type { User} from "../services/type";
import MasonryGrid from "../components/MosonryGrid";
import {
  getAllUsers,
  getSpecificPersonPublicImages,
} from "../services/export.services";
import { useSelector, useDispatch } from "react-redux";
import { setAllUsers } from "../store/reducers/user/userSlice";
import { setLoadingState } from "../store/reducers/Loader/loadingStatus";
import Loader from "@/components/Loader";
import { setSpecificPersonData } from "@/store/reducers/image/imageSlice";

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  

  const {specificPersonData} = useSelector((state:any)=>state.imageReducer);

  const { allUsers } = useSelector((state: any) => state.userReducer);
  const { isLoading } = useSelector((state: any) => state.loadingReducer);
  const dispatch = useDispatch();

  async function getUserImages(userId: any) {
    const res = await getSpecificPersonPublicImages(userId);
    
    if (res.success) {
      dispatch(setSpecificPersonData(res.data));
    }
  }

  useEffect(() => {
  getUserImages(selectedUser?.id)

  }, [selectedUser]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  async function getAllUsersFun() {
    dispatch(setLoadingState(true));
    const res = await getAllUsers();
    if (res.success) {
      dispatch(setAllUsers(res.data));
    }
    dispatch(setLoadingState(false));
  }

  // fetch the all users
  useEffect(() => {
    (async () => {
      if (allUsers.length <= 0) {
        await getAllUsersFun();
      }
    })();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Left Panel - User List */}
        <div className="md:col-span-1">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">Users</h2>

            <div className="space-y-4">
              {allUsers.length > 0 ? (
                allUsers.map((user: any) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer ${
                      selectedUser?.id === user.id
                        ? "bg-primary-100"
                        : "hover:bg-secondary-50"
                    }`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.profileImageUrl || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>No users</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - User Images */}
        {isLoading ? (
          <Loader isLoading={isLoading} message="Loading user images...." />
        ) : (
          <div className="md:col-span-3">
            {selectedUser ? (
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedUser.profileImageUrl || "/placeholder.svg"}
                      alt={selectedUser.name}
                    />
                    <AvatarFallback>
                      {selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedUser.name}'s Images
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {specificPersonData.images.length} total images
                    </p>
                  </div>
                </div>

                {specificPersonData.images.length > 0 ? (
                  <MasonryGrid images={specificPersonData.images} onImageClick={() => {}} />
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border py-12">
                    <p className="text-lg text-muted-foreground">
                      This user has no images yet.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border py-12">
                <p className="text-lg text-muted-foreground">
                  Select a user to view their images.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
