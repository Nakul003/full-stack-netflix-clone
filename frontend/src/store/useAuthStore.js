import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) =>({
    emailFromAuthScreen:null,
    user:null,
    isSigningUp:false,
    isLogging:false,
    isLoggingOut:false,
    isCheckingAuth:true,

    setEmailFromAuthScreen: (email) => set({ emailFromAuthScreen: email }),

    signUp: async (data) => {
        set({isSigningUp:true})
        try {
            const response = await axiosInstance.post("/auth/signup",data)
            set({user:response.data.user})
            toast.success("Account created successfully")
        } catch (error) {
            console.log("Error in signUp function",error.message);
            toast.error(error.response.data.message)
        } finally{
            set({isSigningUp:false})
        }
    },

    logIn: async (data) => {
        set({isLogging:true})
        const { user } = get()
        try {
            const response = await axiosInstance.post("/auth/login",data)
            set({user:response.data})
            toast.success("Welcome back")
        } catch (error) {
            console.log("Error in logIn function",error.message);
            toast.error(error.response.data.message)
        } finally{
            set({isLogging:false})
        }
    },

    logOut: async () => {
        set({isLoggingOut:true})
        try {
            await axiosInstance.post("/auth/logout")
            set({user:null})
            toast.success("Logout successfully")
        } catch (error) {
            console.log("Error in logOut function",error.message);
            toast.error(error.response.data.message)
        } finally{
            set({isLoggingOut:true})
        }
    },

    authCheck: async () => {
        try {
             const response = await axiosInstance.get("/auth/authCheck")
             set({user:response.data.user})
        } catch (error) {
            console.log("Error in authCheck function",error.message);
            set({user:null})
        } finally{
            set({isCheckingAuth:false})
        }

    },
}))