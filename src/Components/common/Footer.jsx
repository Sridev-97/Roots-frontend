import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import auth from '../../Config/firebase'
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext'

function Footer() {
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
    <footer className="bg-green-700 text-white py-8 mt-10">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold mb-2">The Roots</h2>
        <p className="text-sm text-gray-300">
          Bringing you reusable, sustainable, and earth-friendly products for a better tomorrow.
        </p>
      </div>
  
      {/* Links */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="/beauty" className="hover:underline">Shop</a></li>
          <li><a href="/orders" className="hover:underline">Orders</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
        </ul>
      </div>
  
      {/* Contact */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Get in Touch</h3>
        <p className="text-sm text-gray-300">Email: theroots@eco.com</p>
        <p className="text-sm text-gray-300">Phone: +91 98765 43210</p>
        <p className="text-sm text-gray-300 mt-2">© {new Date().getFullYear()} The Roots</p>
      </div>
    </div>
  </footer>
  
  )
}

export default Footer