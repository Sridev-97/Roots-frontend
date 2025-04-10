import React from "react";
import { Link } from "react-router-dom";

function Checkout() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-5">
            <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Order Placed Successfully!</h1>
            <p className="text-lg text-gray-700 mb-6">Thank you for shopping with us. Your items will be delivered soon.</p>

            <Link to="/">
                <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300">
                    Go to Home
                </button>
            </Link>
        </div>
    );
}

export default Checkout;