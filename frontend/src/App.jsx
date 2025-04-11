import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home/HomeScreen"
import AuthScreen from "./components/pages/Home/AuthScreen"
import SignUp from "./components/pages/SignUp"
import LogIn from "./components/pages/LogIn"
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAuthStore } from "./store/useAuthStore.js"
import { Loader } from 'lucide-react';
import WatchPage from './components/pages/watchPage';
import SearchPage from './components/pages/SearchPage';
import HistoryPage from './components/pages/HistoryPage';
import NotFoundPage from './components/pages/404';
import PersonPage from './components/pages/PersonPage';

const App = () => {
  const { user, authCheck, isCheckingAuth } = useAuthStore()
  
  useEffect(() => {
    authCheck()
  }, [authCheck])
  
  if (isCheckingAuth) {
    return(
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 w-10 h-10' />
        </div>
      </div>
    )
  }

  return (
    <main>
      <Routes>
        <Route path='/' element={ user ?  <Home/> : <AuthScreen/>}></Route>
        <Route path='/signup' element={ !user ? <SignUp /> : <Navigate to={"/"} />}></Route>
        <Route path='/login' element={!user ? <LogIn /> : <Navigate to={"/"} />}></Route>
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />}></Route>
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />}></Route>
        <Route path='/history' element={user ? <HistoryPage /> : <Navigate to={"/login"} />}></Route>
        <Route path='/person/:id' element={user ? <PersonPage /> : <Navigate to={"/login"} />}></Route>
        <Route path='/*' element={<NotFoundPage />}></Route>
      </Routes>
      <Footer />
      <Toaster/>
    </main>
  )
}

export default App
