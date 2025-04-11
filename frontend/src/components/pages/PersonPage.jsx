import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosInstance } from '../../lib/axios.js'
import WatchPageSkeleton from '../skeletons/WatchPageSkeleton.jsx';
import Navbar from '../Navbar.jsx';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../../utils/constants.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PersonPage = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [movies, setMovies] = useState([]);
    const [tv, setTv] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoadingImg, setIsLoadingImg] = useState(true);
    const sliderRef = useRef(null);
    const slideRef = useRef(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axiosInstance.get(`/persons/${id}/details`)
                setDetails(res.data.details)
            } catch (error) {
                setDetails({})
            }
        }

        getDetails()
    }, [id])

    useEffect(() => {
        const getMovies = async () => {
            try {
                const res = await axiosInstance.get(`/persons/${id}/movies`)
                setMovies(res.data.movies)
            } catch (error) {
                setMovies([])
            }
        }

        getMovies()
    }, [id])

    useEffect(() => {
        const getTv = async () => {
            try {
                const res = await axiosInstance.get(`/persons/${id}/tvshows`)
                setTv(res.data.tvshows)
            } catch (error) {
                setTv([])
            } finally {
                setLoading(false)
            }
        }
        getTv()
    }, [id])

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        const month = monthNames[date.getUTCMonth()];
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
    
        return `${month} ${day}, ${year}`
    }

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' })
        }
    }

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' })
        }
    }
    const scrolltoLeft = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: -slideRef.current.offsetWidth, behavior: 'smooth' })
        }
    }

    const scrolltoRight = () => {
        if (slideRef.current) {
            slideRef.current.scrollBy({ left: slideRef.current.offsetWidth, behavior: 'smooth' })
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-black p-10'>
                <WatchPageSkeleton />
            </div>)
    }

    if (!details) {
        return (
            <div className='bg-black text-white h-screen'>
                <div className='max-w-6xl mx-auto'>
                    <Navbar />
                    <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                        <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content Not Found</h2>
                    </div>
                </div>
            </div>)
    }

    return (
        <div className='bg-black min-h-screen text-white'>
            <div className='mx-auto container px-4 py-8 h-full'>
                <Navbar />
                <div className='flex flex-col md:flex-row  justify-between gap-20 max-w-6xl mx-auto'>

                    {
                        isLoadingImg && <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />}
                    
                    <div className='mt-20'>
                        <h2 className='text-4xl font-bold text-balance'>{details.name}</h2>
                        <p className='mt-2 text-lg'>{details.place_of_birth} | {formatDate(details.birthday)}</p>
                        <p className='mt-4 text-lg'>{details.biography}</p>
                    </div>

                    <img src={ORIGINAL_IMG_BASE_URL + details.profile_path} alt="img" className='max-h-[600px] rounded-md ' onLoad={() => { setIsLoadingImg(false) }} />
                </div>

                {
                    movies?.length > 0 && (
                        <div className='mt-12 max-w-5xl mx-auto relative'>
                            <h3 className='font-bold mb-4 text-3xl'>Movies</h3>

                            <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={slideRef}>
                                {movies.map((item) => {
                                    if (item?.poster_path === null) return null
                                    return (
                                        <Link key={item.credit_id} to={`/watch/${item.id}`} className='w-52 flex-none'>
                                            <img src={SMALL_IMG_BASE_URL + item?.poster_path} alt="poster image" className='w-full h-auto rounded-md' />
                                            <h4 className='mt-2 text-lg font-semibold'>{item?.title}</h4>
                                        </Link>)
                                }
                                )}

                                <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 rounded-full text-white' onClick={scrolltoRight} />

                                <ChevronLeft className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 rounded-full text-white' onClick={scrolltoLeft} />

                            </div>
                        </div>
                    )}
                {
                    tv?.length > 0 && (
                        <div className='mt-12 max-w-5xl mx-auto relative'>
                            <h3 className='font-bold mb-4 text-3xl'>Tv Shows</h3>

                            <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                                {tv.map((item) => {
                                    if (item?.poster_path === null) return null
                                    return (
                                        <Link key={item.credit_id} to={`/watch/${item.id}`} className='w-52 flex-none'>
                                            <img src={SMALL_IMG_BASE_URL + item?.poster_path} alt="poster image" className='w-full h-auto rounded-md' />
                                            <h4 className='mt-2 text-lg font-semibold'>{item?.name}</h4>
                                        </Link>)
                                }
                                )}

                                <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 rounded-full text-white' onClick={scrollRight} />

                                <ChevronLeft className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 rounded-full text-white' onClick={scrollLeft} />

                            </div>
                        </div>
                    )}
            </div>

        </div>
    )
}

export default PersonPage