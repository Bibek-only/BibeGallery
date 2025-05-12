import { LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelector } from "react-redux";




const PcView = () => {
  //own code
  
  const {isLogedIn,isAdmin} = useSelector((state:any)=>state.authReducer);
  
  const {userInfo} = useSelector((state:any)=> state.userReducer)
  function handelSignout() {}

  return (
    <div className="hidden md:flex">
      {isLogedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={userInfo.profileImageUrl || "/placeholder.svg"}
                  alt={userInfo.name}
                />
                <AvatarFallback>
                  {userInfo.name
                    .split(" ")
                    .map((n:any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/home">Home</Link>
            </DropdownMenuItem>
            {isAdmin ? (
              <DropdownMenuItem asChild>
                <Link to="/admin">Admin</Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={
                //pass the function that handel the signout
                handelSignout
              }
              className="text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PcView;
