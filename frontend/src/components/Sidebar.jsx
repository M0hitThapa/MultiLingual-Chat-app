import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading} = useChatStore();

    const {onlineUsers} = useAuthStore()

    useEffect(() => {
        getUsers()
    },[getUsers])
    if(isUserLoading) return <SidebarSkeleton />
  return (
    <aside className="h-full w-20 lg:w-96 border-r border-zinc-800
    flex flex-col transition-all duration-200 bg-zinc-900">
        <div className="border-b border-zinc-800 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className="size-6 text-slate-200" />
                <span className="font-medium hidden text-slate-200 lg:block">Contacts</span>
            </div>
        </div>
        <div className="overflow-y-auto w-full py-3 text-slate-200 text-lg">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-4 flex items-center gap-3
              hover:bg-zinc-800 transition-colors
              ${selectedUser?._id === user._id ? "bg-zinc-800" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full "
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
        </div>
    </aside>
  )
}

export default Sidebar