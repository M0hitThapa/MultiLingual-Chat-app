import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";



export const useAuthStore = create((set) =>({
    authUser: null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,


    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null});
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
    
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
        } finally {
            set({ isSigningUp: false });
        }
    },


   login: async (data) => {
        set({ isLoggingIn: true });
    
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged In successfully");
        } catch (error) {
            
            toast.error ( error.response.data.message );
        } finally {
            set({ isLoggingIn: false });
        }
    },


     logout:async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null});
            toast.success("Logged out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    
}) )                                           