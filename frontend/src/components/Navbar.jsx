import { Link } from "react-router-dom";
import Smile from "../assets/Smile.png"
import { useAuthStore } from "../store/useAuthStore";
import { LogOut,  User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-zinc-900  shadow-black shadow-md fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img className="rounded-md" src={Smile} alt="Logo" />
              </div>
              <h1 className="text-3xl font-black  text-teal-800 font-sans drop-shadow-lg">Link Up</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            
            
              
           
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-md gap-2 bg-teal-700 bg-opacity-90 hover:bg-teal-800 text-white`}>
                  <User className="size-6" />
                  <span className="hidden sm:inline text-lg">Profile</span>
                </Link>

                <button className="flex gap-2 items-center text-xl font-black  text-teal-600 font-mono drop-shadow-lg" onClick={logout}>
                  <LogOut className="size-6" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;