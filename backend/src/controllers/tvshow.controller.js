import { fetchFromTMDB } from "../services/tmbd.service.js";

export const getTrendingTv = async (req,res) => {
    try {
        const resposne = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

        const data = resposne.results[Math.floor(Math.random() * resposne.results?.length)]

        res.status(200).json({success:true,content:data})
    } catch (error) {
        console.log("Error in getTrendingTv controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getTvTrailers = async (req,res) => {
    const { id } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        res.status(200).json({success:true,trailers:resposne.results
        })
    } catch (error) {
        if (error.message.includes("404")) {
            
            console.log("No trailers found",error.message);
            return res.status(404).send(null)
        }
        console.log("Error in getTvTrailers controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getTvDetails = async (req,res) => {
    const { id } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

        res.status(200).json({success:true,details:resposne
        })
    } catch (error) {
        if (error.message.includes("404")) {
            
            console.log("No details found",error.message);
            return res.status(404).send(null)
        }
        console.log("Error in getTvDetails controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getSimilarTv = async (req,res) => {
    const { id } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

        res.status(200).json({success:true,similar:resposne.results
        })
    } catch (error) {
        console.log("Error in getSimilarTv controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getTvByCategory = async (req,res) => {
    const { category } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

        res.status(200).json({success:true,content:resposne.results})
    } catch (error) {
        console.log("Error in getTvByCategory controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}