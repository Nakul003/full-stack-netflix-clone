import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmbd.service.js";


export const searchMovie = async (req, res) => {

    const { query } = req.params

    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

        const data = resposne.results;

        if (data.length === 0) return res.status(404).send(null)

        const user = await User.findById(req.user._id)

        let isExist

        user.searchHistory.map((item) => {
            isExist = resposne.results[0].id === item.id
        })
        if (!isExist) {


            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: resposne.results[0].id,
                        image: resposne.results[0].poster_path,
                        title: resposne.results[0].title,
                        searchType: "movie",
                        createdAt: new Date()
                    }
                }
            })
        }



        res.status(200).json({ success: true, content: data })

    } catch (error) {
        console.log("Error in searchMovie controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const searchTv = async (req, res) => {

    const { query } = req.params

    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        const data = resposne.results;

        if (data.length === 0) return res.status(404).send(null)

        const user = await User.findById(req.user._id)

        let isExist

        user.searchHistory.map((item) => {
            isExist = resposne.results[0].id === item.id
        })
        if (!isExist) {

            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: resposne.results[0].id,
                        image: resposne.results[0].poster_path,
                        title: resposne.results[0].name,
                        searchType: "tv",
                        createdAt: new Date()
                    }
                }
            })
        }

        res.status(200).json({ success: true, content: data })

    } catch (error) {
        console.log("Error in searchTv controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const searchPerson = async (req, res) => {

    const { query } = req.params

    try {
        const resposne = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        const data = resposne.results;

        if (data.length === 0) return res.status(404).send(null)

        const user = await User.findById(req.user._id)

        let isExist

        user.searchHistory.map((item) => {
            isExist = resposne.results[0].id === item.id
        })
        if (!isExist) {

            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: resposne.results[0].id,
                        image: resposne.results[0].profile_path,
                        title: resposne.results[0].name,
                        searchType: "person",
                        createdAt: new Date()
                    }
                }
            })
        }

        res.status(200).json({ success: true, content: data })

    } catch (error) {
        console.log("Error in searchPerson controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const getSearchHistory = async (req, res) => {

    try {
        res.status(200).json({ success: true, history: req.user.searchHistory })
    } catch (error) {
        console.log("Error in searchHistory controller", error.message);
        res.status(500).json({ status: false, message: "Internal Server Error" })
    }

}

export const removeHistory = async (req, res) => {

    let { id } = req.params

    id = parseInt(id)

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }
            },
        })
        res.status(200).json({ success: true, message: "Search deleted successfully" })
    } catch (error) {
        console.log("Error in removeHistory controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
