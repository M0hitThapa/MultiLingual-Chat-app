import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Smile from "../assets/Smile.png"
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen justify-center mt-10 ">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center grou[-hover:bg-primary/20 transition-colors">
            <img src={Smile} alt="Logo" className="rounded-md size-17 text-primary" /></div>
            <h1 className="text-3xl font-black  text-teal-700 font-sans drop-shadow-lg">Link Up</h1>
            <h2 className="text-3xl font-bold text-slate-200 mt-1 font-sans drop-shadow-lg  ">Create Account</h2>
            <p className="text-rose-700 text-xl font-semibold ">Chat, connect, and be heard.</p>
          </div>
        </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-200 font-bold">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40"/>
                </div>
                <input type="text"
                className={`input input-bordered w-full pl-10 bg-zinc-900 `}
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  font-bold text-slate-200">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input type={showPassword ? "text" : "password"} className={`input input-bordered w-full bg-zinc-900 pl-10`} placeholder="Enter Your Password" value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}  />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (

                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn text-white text-xl bg-teal-700 w-full hover:bg-teal-800" disabled={isLoggingIn}>
              {isLoggingIn? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "SignIn"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-lg font-medium text-slate-200">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link text-purple-500">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      
    </div>
  );
};
export default LoginPage;