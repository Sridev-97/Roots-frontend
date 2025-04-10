import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderData();
  }, []);

  const Delete = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this order?");
      if (!confirm) return;

      const response = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete order");

      // Remove the deleted order from state
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      alert("Error deleting order: " + err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (err) return <div className="text-center mt-10 text-red-500">Error: {err}</div>;

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-center text-3xl font-bold mb-8">Your Orders</h1>

      {orders.map((order, index) => (
        <div key={order._id || index} className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold mb-2">Order #{index + 1}</h2>            
              <button
                onClick={() => Delete(order._id)}
                className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-100 text-sm"
              > Delete Order
              </button>            
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Placed on: {new Date(order.createdOn).toLocaleString()}
          </p>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {order.items.map((item, itemIndex) => (
              <div
                key={item._id || itemIndex}
                className="flex flex-col justify-center items-center border border-gray-300 p-3 rounded"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-40 h-40 object-cover rounded"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/250?text=Image+Not+Found";
                  }}
                />
                <p className="text-center text-sm mb-2 font-medium">{item.title}</p>
                <p className="p-2 text-sm text-black border mb-2 border-black rounded-lg">₹{item.price}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
