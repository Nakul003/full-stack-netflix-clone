import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from "../store/useContentStore.js"
import { Link } from 'react-router-dom'
import { SMALL_IMG_BASE_URL } from '../utils/constants.js'
import { axiosInstance } from '../lib/axios.js'
import { ChevronLeft, ChevronRight } from "lucide-react"

const MovieSlider = ({ category }) => {

    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false)
    const sliderRef = useRef(null)

    const formattedCategoryName = category[0].toUpperCase() + category.replaceAll("_", " ").slice(1)
    const formattedCategoryType = contentType === "movies" ? "Movies" : "TV Shows"


    useEffect(() => {
        const getContent = async () => {
            const res = await axiosInstance.get(`/${contentType}/${category}`)
            setContent(res.data.content)
        }
        getContent()
    }, [contentType, category])

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

    return (
        <div className='text-white bg-black relative px-5 md:px-20 '
            onMouseEnter={() => { setShowArrows(true) }}
            onMouseLeave={() => { setShowArrows(false) }}>
            <h2 className='mb-4 text-2xl font-bold'>{formattedCategoryName} {formattedCategoryType}</h2>

            <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
                {content.map((item) => (
                    <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                        <div className='rounded-lg overflow-hidden'>
                            <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt="content-image" className='transition-transform duration-300 ease-in-out group-hover:scale-125' />
                        </div>

                        <p className='mt-2 text-center'>
                            {item.title || item.name}
                        </p>
                    </Link>
                ))}
            </div>

            {
                showArrows && (
                    <>
                        <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10' onClick={scrollLeft}>
                            <ChevronLeft className='w-24 h-24' />
                        </button>

                        <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center w-12 h-12 rounded-full bg-black/50 hover:bg-black/75 text-white z-10' onClick={scrollRight}>
                            <ChevronRight className='w-24 h-24' />
                        </button>
                    </>
                )
            }

        </div>
    )
}

export default MovieSlider