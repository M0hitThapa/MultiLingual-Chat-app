import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile} = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
const file = e.target.files[0];
if(!file) return;

const reader = new FileReader();
reader.readAsDataURL(file);

reader.onload = async () => {
  const base64Image = reader.result;
  setSelectedImg(base64Image);
  await updateProfile({profilePic:base64Image});
}
  };
  return (
    <div className="h-screen pt-20 ">
      
        <div className="  rounded-2xl max-w-lg max-h-full mx-auto pt-3 p-8 space-y-8 shadow-black shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white text-opacity-80">Profile</h1>
            <p className="mt-1 text-white text-opacity-80 font-semibold text-xl">Your Profile information</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img  src={selectedImg || authUser.profilePic || "/avatar.png"} alt="profile" className="size-28 m-auto rounded-3xl object-cover border-2 " />
              <label htmlFor="avatar-upload"  className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}>
                   <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
                </label>
            </div>
            <p className="text-md font-medium text-white text-opacity-80 ">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-1">
            <div className="space-y-1.5">
              <div className="text-sm text-white flex items-center gap-2">
                <User className="w-3 h-3" />
                Full Name
              </div>
              <p className="px-4 py-2.5 text-white bg-black/30 rounded-lg border border-black/50">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-white flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </div>
              <p className="px-4 py-2.5 text-white bg-black/30 rounded-lg border border-black/50">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-black/30 rounded-xl p-8 h-40">
            <h2 className="text-lg font-bold  text-white">Account Information</h2>
            <div className=" text-sm">
              <div className="flex items-center justify-between py-2 border-b-4 border-teal-800 ">
                <span className="text-lg text-white">Member Since</span>
                <span className="text-lg text-white">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-lg text-white">Account Status</span>
                <span className="text-green-600 text-lg">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  )
}

export default ProfilePage