import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"

export const useContentStore = create((set,get) => ({
    contentType:"movies",
    trendingContent:null,

    setContentType: async (type) => set({ contentType:type }),

    getTrendingContent: async () => {

        const { contentType } = get()

        try {
            const response = await axiosInstance.get(`/${contentType}/trending`)
            set({trendingContent:response.data.content})
        } catch (error) {
            console.log("Error in getTrendingContent function",error.response.data.message);
            set({trendingContent:null})
        }
    },

}))