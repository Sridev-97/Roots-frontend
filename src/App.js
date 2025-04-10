import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/common/Navbar";
import Home from "./Components/Home";
import Bathroom from "./Components/Bathroom";
import Beauty from "./Components/Beauty";
import About from "./Components/About";
import Kids from "./Components/Kids";
import Cart from "./Components/Cart";
import { CartProvider } from "./Components/context/CartContext";
import Checkout from "./Components/Checkout";
import Orders from "./Components/Orders";
import Footer from "./Components/common/Footer";

function Layout({ children }) {
  const location = useLocation();
  const noNavbar = ["/login", "/signup"];
  const noFooter = ["/login", "/signup", "/cart"];


  return (
    <div>
      {!noNavbar.includes(location.pathname) && <Navbar />}      
      {children}
      {!noFooter.includes(location.pathname) && <Footer />}
    </div>
  )
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />}></Route>
            <Route path="/bathroom" element={<Bathroom />}></Route>
            <Route path="/beauty" element={<Beauty />}></Route>
            <Route path="/kids" element={<Kids />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            <Route path="/orders" element={<Orders/>}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
