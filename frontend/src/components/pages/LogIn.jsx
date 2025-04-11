import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/netflix-logo.png"
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../store/useAuthStore'
const LogIn = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { logIn } = useAuthStore()

  const onSubmit = async (data) => {
    logIn(data)
  };

  return (
    <div className='min-h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
          <img src={logo} alt="logo" className='w-52'/>
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold  mb-4'>
            Log In
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input type="email" {...register("email")}  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='you@email.com' id='email'/>
            </div>

            <div>
              <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input type={true ?'password':"text"} {...register("password")}  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='********' id='password'/>
            </div>

            <button type='submit' className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 '>Sign In</button>
          </form>
          <div className='text-center text-gray-400'>
            Don't have an account?{" "}
            <Link to={"/signup"} className='text-red-500 hover:underline'>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn