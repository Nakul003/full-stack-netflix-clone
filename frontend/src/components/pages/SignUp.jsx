import React, { useState } from 'react'
import { Link} from "react-router-dom"
import logo from "../../assets/netflix-logo.png"
import { useForm } from 'react-hook-form'
import { Loader2 } from "lucide-react"
import { useAuthStore } from "../../store/useAuthStore.js"

const SignUp = () => {

  const [Email, setEmail] = useState("")

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { emailFromAuthScreen, signUp , isSigningUp} = useAuthStore()

  const onSubmit = async (data) => {
      signUp(data)
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
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input type="email" {...register("email")} value={ !Email ? emailFromAuthScreen : Email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='you@email.com' id='email'/>
            </div>

            <div>
              <label htmlFor="name" className='text-sm font-medium text-gray-300 block'>
                User Name
              </label>
              <input type="text" {...register("userName")} className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='Your Name here' id='name'/>
            </div>

            <div>
              <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input type={true ?'password':"text"} {...register("password")}  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='********' id='password'/>
            </div>

            <button type='submit' className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 ' disabled={isSigningUp}> { isSigningUp ? (
            <div className='flex justify-center gap-2 items-center'>
              <Loader2 className='animate-spin' />
              SigningUp...
            </div>) : ("Sign Up")}</button>
          </form>
          <div className='text-center text-gray-400'>
            Already a member?{" "}
            <Link to={"/login"} className='text-red-500 hover:underline'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

