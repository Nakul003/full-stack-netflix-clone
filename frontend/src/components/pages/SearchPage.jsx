import React, { useState } from 'react'
import { useContentStore } from '../../store/useContentStore'
import Navbar from "../Navbar"
import { Search } from 'lucide-react'
import { axiosInstance } from '../../lib/axios'
import toast from 'react-hot-toast'
import {ORIGINAL_IMG_BASE_URL} from "../../utils/constants.js"
import { Link } from "react-router-dom"

const SearchPage = () => {

    const [activeTab, setActiveTab] = useState("movies")
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const { setContentType } = useContentStore()


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === "movies" ? setContentType("movies") : setContentType("tvshows")
        setResults([])
    }

    const handleSearch = async(e) => {
        e.preventDefault()
        try {
            const res = await axiosInstance.get(`/search/${activeTab}/${searchTerm}`)
            setResults(res.data.content)
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Nothing found, make sure you are searching under the right category")
            }
            else{
                toast.error("Oops, please try again later")
            }
        }
    }
    
    return (
        <div className='bg-black min-h-screen text-white'>
            <Navbar />
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center gap-3 mb-4'>
                    <button className={`py-2 px-2 rounded ${activeTab === "movies" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => {handleTabClick("movies")}}>Movies</button>

                    <button className={`py-2 px-2 rounded ${activeTab === "tvshows" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => {handleTabClick("tvshows")}}>Tv Shows</button>

                    <button className={`py-2 px-2 rounded ${activeTab === "persons" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`} onClick={() => {handleTabClick("persons")}}>Persons</button>
                </div>

                <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
                    <input type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={`search for a ${activeTab.slice(0,-1)}`}
                    className='w-full p-2 rounded bg-gray-800 text-white' />

                    <button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
                        <Search className='w-6 h-6'/>
                    </button>
                </form>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        results.map((result) => {
                            if(!result?.poster_path && !result?.profile_path) return null;

                            return(
                                <div key={result?.id} className='bg-gray-800 p-4 rounded'>
                                    {
                                        activeTab === "persons" ? (
                                            <Link to={"/person/" + result?.id} className='flex flex-col items-center'>
                                                <img src={ORIGINAL_IMG_BASE_URL + result?.profile_path} alt={result?.name}
                                                className='max-h-96 rounded mx-auto' />
                                                <h2 className='mt-2 text-xl font-bold'>{result?.name}</h2>
                                            </Link>
                                        ) : (
                                            <Link to={"/watch/" + result?.id} onClick={() => setContentType(activeTab)}>
                                                <img src={ORIGINAL_IMG_BASE_URL + result?.poster_path} alt={result?.title || result?.name}
                                                className='w-full h-auto rounded' />
                                                <h2 className='mt-2 text-xl font-bold'>{result?.title || result?.name}</h2>
                                            </Link>
                                        ) 
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage