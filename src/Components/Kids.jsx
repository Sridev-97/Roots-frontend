import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import auth from "../Config/firebase";


function Kids() {
    const [kidsData, setkidsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const { addtocart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBathroomData = async () => {
            try {
                const response = await fetch("http://localhost:5000/kids");
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setkidsData(data);
            } catch (err) {
                setErr(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBathroomData();
    }, []);

    const addToCart = (item) => {
        const user = auth.currentUser;

        if(!user){
            alert("Please Login to Purchase");
            return;
        }
        addtocart(item);
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (err) return <div className="text-center mt-10 text-red-500">Error: {err}</div>;


    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-center text-3xl font-bold mb-5">Beauty Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {kidsData.map((kids, index) => (
                    <div key={index} className="flex flex-col justify-between items-center">
                        <img src={kids.icon} alt={`Logo ${index + 1}`} className="w-64 h-64 object-cover rounded-lg "
                            onError={(e) => { e.target.src = "https://via.placeholder.com/250?text=Image+Not+Found"; }} />
                        <p className=" p-3 text-gray-600 min-h-[60px] text-center text-sm max-w-xs">
                            {kids.title}
                        </p>
                        {/* Price / Cart Button with Hover Effect */}
                        <button
                            className="flex items-center justify-center w-24 h-12 bg-gray-200 hover:bg-violet-400 hover:text-white border
                             border-black rounded-lg transition duration-300 relative group" onClick={() => addToCart(kids)}
                        >
                            <span className="absolute group-hover:hidden text-gray-700">₹{kids.price}</span>
                            <FiShoppingCart size={20} className="hidden group-hover:block" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Kids;