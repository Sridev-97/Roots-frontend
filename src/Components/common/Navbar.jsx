import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import auth from '../../Config/firebase'
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext'

function Navbar() {
  const [log, setlog] = useState(false);
  const [menu, setMenu] = useState(false);
  const [user, setuser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();



  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setlog(true)
        console.log("User Logged In")
      }
      else {
        setlog(false)
        console.log("User Logged Out")
      }
    })
  }, [])

  function logOut() {
    signOut(auth);
    setlog(false)
    navigate('/home')
  }

  return (
    <nav className='w-full py-5 flex justify-between items-center z-50 px-5 md:px-10 border-b shadow-md'>

      {/* Menu Icon */}
      <button className='md:hidden text-3xl focus:outline-none' onClick={() => setMenu(!menu)}>
        <img src="/assets/menu-icon.png" alt="Menu" className="w-8 h-8" />
      </button>

      <img src='..\assets\The Roots.png' className='hidden md:block'></img>
      <img src='..\assets\title.png' className='md:hidden w-16 h-16 mx-auto'></img>

      {/* Mobile Icons: Menu & User */}
      <div className="flex md:hidden items-center space-x-4">

        {/*Cart*/}
        <Link to="/cart" className="relative px-5">
          <FiShoppingCart size={30} />
          {
            cartItems.length > 0 && (
              <span className='absolute -top-2 -right-1 bg-red-800 text-white text-xs rounded-full px-1.5 py-0.5'>
                {cartItems.length}
              </span>
            )
          }
        </Link>

        {/* User Icon */}
        {log && (
          <div className="relative">
            <button onClick={() => setuser(!user)} className="focus:outline-none">
              <img src='/assets/user.png' alt='user' className='w-8 h-8 cursor-pointer' />
            </button>

            {/* User Dropdown */}
            {user && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setuser(false)}>Your Orders</Link>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={logOut}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:flex items-center'>
        <Link to="/home" className={`px-5 pb-2 ${location.pathname === "/home" ? "border-b-2 border-violet-900 font-semibold text-violet-900" : ""}`}>Home</Link>
        <Link to="/beauty" className={`px-5 pb-2 ${location.pathname === "/beauty" ? "border-b-2 border-violet-900 font-semibold text-violet-900" : ""}`}>Beauty</Link>
        <Link to="/bathroom" className={`px-5 pb-2 ${location.pathname === "/bathroom" ? "border-b-2 border-violet-900 font-semibold text-violet-900" : ""}`}>Bathroom</Link>
        <Link to="/kids" className={`px-5 pb-2 ${location.pathname === "/kids" ? "border-b-2 border-violet-900 font-semibold text-violet-900" : ""}`}>Kids</Link>
        <Link to="/about" className={`px-5 pb-2 ${location.pathname === "/about" ? "border-b-2 border-violet-900 font-semibold text-violet-900" : ""}`}>About</Link>
        <Link to="/cart" className={`relative px-5 pb-2 ${location.pathname === "/cart" ? "border-b-2 border-violet-900 font-semibold text-violet-900" : ""}`}>
          <FiShoppingCart size={30} />
          {
            cartItems.length > 0 && (
              <span className='absolute -top-2 -right-1 bg-red-800 text-white text-xs rounded-full px-1.5 py-0.5'>
                {cartItems.length}
              </span>
            )
          }
        </Link>

        {/* User Dropdown (Visible in all screen sizes) */}
        {log && (
          <div className="relative ml-5">
            <button onClick={() => setMenu(!menu)} className="focus:outline-none">
              <img src='/assets/user.png' alt='user' className='w-8 h-8 cursor-pointer' />
            </button>

            {menu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setMenu(false)}>Your Orders</Link>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={logOut}>Logout</button>
              </div>
            )}
          </div>
        )}

        {!log && (
          <button className='button-style text-white' onClick={() => navigate("/login")}>Login</button>
        )}
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className='absolute top-16 left-20 w-[80%] z-50 bg-white border border-violet-700 rounded-lg shadow-md flex flex-col md:hidden'>
          <Link to="/home" className="py-2 px-5 border-b" onClick={() => setMenu(false)}>Home</Link>
          <Link to="/beauty" className="py-2 px-5 border-b" onClick={() => setMenu(false)}>Beauty</Link>
          <Link to="/bathroom" className="py-2 px-5 border-b" onClick={() => setMenu(false)}>Bathroom</Link>
          <Link to="/kids" className="py-2 px-5 border-b" onClick={() => setMenu(false)}>Kids</Link>
          <Link to="/about" className="py-2 px-5 border-b" onClick={() => setMenu(false)}>About</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar