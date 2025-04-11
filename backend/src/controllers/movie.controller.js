import { fetchFromTMDB } from "../services/tmbd.service.js";

export const getTrendingMovie = async (req,res) => {
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`);

        const data = resposne.results[Math.floor(Math.random() * resposne.results?.length)]

        res.status(200).json({success:true,content:data})
    } catch (error) {
        console.log("Error in getTrendingMovie controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getMovieTrailers = async (req,res) => {
    const { id } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

        res.status(200).json({success:true,trailers:resposne.results
        })
    } catch (error) {
        if (error.message.includes("404")) {
            
            console.log("No trailers found",error.message);
            return res.status(404).send(null)
        }
        console.log("Error in getMovieTrailers controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getMovieDetails = async (req,res) => {
    const { id } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

        res.status(200).json({success:true,details:resposne
        })
    } catch (error) {
        if (error.message.includes("404")) {
            
            console.log("No details found",error.message);
            return res.status(404).send(null)
        }
        console.log("Error in getMovieDetails controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getSimilarMovies = async (req,res) => {
    const { id } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);

        res.status(200).json({success:true,similar:resposne.results
        })
    } catch (error) {
        console.log("Error in getSimilarMovies controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export const getMoviesByCategory = async (req,res) => {
    const { category } = req.params
    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);

        res.status(200).json({success:true,content:resposne.results})
    } catch (error) {
        console.log("Error in getMoviesByCategory controller",error.message);
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}