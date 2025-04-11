import axios from "axios"

export const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    };

    const res = await axios.get(url, options)

    if (res.status!==200) throw new Error("failed to fetch data")

    return res.data
}