import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/netflix-logo.png"
import { LogOut, Menu, Search } from "lucide-react"
import avatar from "../assets/avatar1.png"
import { useAuthStore } from "../store/useAuthStore.js"
import { useContentStore } from "../store/useContentStore.js"

const Navbar = () => {

  const { logOut } = useAuthStore()
  const { setContentType} = useContentStore()

  const[isMobileMenu, setIsMobileMenu] = useState(false)

  const toogleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  }

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-10 z-50'>
        <Link to="/">
          <img src={logo} alt="logo" className='w-32 sm:w-40' />
        </Link>

        <div className='hidden sm:flex gap-2 items-center'>
          <Link to="/" className='hover:underline' onClick={ () => setContentType("movies")}>Movies</Link>
          <Link to="/" className='hover:underline' onClick={ () => setContentType("tvshows")}>Tv Shows</Link>
          <Link to="/history" className='hover:underline'>Search History</Link>
        </div>
      </div>

      <div className='flex gap-2 items-center z-50'>
        <Link to={"/search"}>
          <Search className='w-6 h-6 cursor-pointer' />
        </Link>
        <img src={avatar} alt="Avatar" className='h-8 rounded cursor-pointer' />
        <LogOut className='w-6 h-6 cursor-pointer' onClick={logOut}/>

        <div className='sm:hidden'>
          <Menu className='w-6 h-6 cursor-pointer' onClick={toogleMobileMenu}/>
        </div>
      </div>


      {isMobileMenu && (
        <div className='w-full sm:hidden mt-4 z-50 bg-black rounded border border-gray-800'>
          <Link to="/" className='block hover:underline p-2' onClick={toogleMobileMenu}>Movies</Link>
          <Link to="/" className='block hover:underline p-2' onClick={toogleMobileMenu}>Tv Shows</Link>
          <Link to="/history" className='block hover:underline p-2' onClick={toogleMobileMenu}>Search History</Link>
        </div>
      )}

    </header>
  )
}

export default Navbar
