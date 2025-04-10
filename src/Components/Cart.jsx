import React from "react";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
    const navigate = useNavigate();

    console.log("Cart items:", cartItems);
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const checkOut = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/checkout`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({ items: cartItems })
            });
            const result = await response.json();
            if (response.ok) {
                navigate("/checkout"); // 👈 navigate to success page
            } else {
                alert(result.message);
            }
        } catch (e) {
            console.error("Checkout Failed", e);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-red-600 font-bold">No items in cart</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cartItems.map((item, index) => {
                            return (
                                <div key={index} className="border rounded p-4 flex flex-col items-center">
                                    <img src={item.icon} alt={item.title} className="w-48 h-48 object-cover rounded" />
                                    <h2 className="text-lg font-semibold my-2">{item.title}</h2>
                                    <p className="text-gray-600">{item.price}</p>

                                    <div className="flex items-center my-2">
                                        <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => decreaseQty(index)}>-</button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => increaseQty(index)}>+</button>
                                    </div>

                                    <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => removeFromCart(index)}>
                                        Remove
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer Section */}
                    <div className="mt-8 p-4 border-t flex justify-between items-center">
                        <p className="text-xl font-bold">Total: ₹{totalAmount}</p>
                        <button onClick={checkOut} className="bg-green-600 text-white px-6 py-2 rounded">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;