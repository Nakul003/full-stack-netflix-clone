import { fetchFromTMDB } from "../services/tmbd.service.js";

export const getPersonDetails = async (req,res) => {
    const { id } = req.params

    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}?language=en-US`);

        res.status(200).json({
            success: true, details: resposne
        })
    } catch (error) {

        console.log("Error in getPersonDetails controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getPersonMovies = async (req,res) => {
    const { id } = req.params

    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`);

        res.status(200).json({
            success: true, movies: resposne.cast
        })
    } catch (error) {

        console.log("Error in getPersonMovies controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getPersonTv = async (req,res) => {
    const { id } = req.params

    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`);

        res.status(200).json({
            success: true, tvshows: resposne.cast
        })
    } catch (error) {

        console.log("Error in getPersonTv controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}