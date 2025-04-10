import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Config/firebase";

function Login() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        auth.onAuthStateChanged((id) => {
            if (id) {
                navigate('/home');
            }
            else {
                console.log("user logged out");
            }
        })
    }, []);

    const userLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, user, pass).then((res)=>{
            navigate("/home");
        }).catch(()=>{
            setErr("Error Signing In. Please Signup")
        })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <form onSubmit={userLogin} className="p-10 bg-green-200 rounded-3xl border border-black shadow-md" style={{ width: "75%" }}>
                <h2 className="text-center text-3xl font-bold mb-5 text-black">Login</h2>
                <div>
                    <label className="block text-black font-bold">Email: </label>
                    <input type="email" onChange={(e)=>setUser(e.target.value)} className="mt-1 p-2 w-full border rounded-2xl border-black" required></input>
                </div>
                <div>
                    <label className="block text-black font-bold">Password: </label>
                    <input type="password" onChange={(e)=>setPass(e.target.value)} className="mt-1 p-2 w-full border rounded-2xl border-black" required></input>
                </div>
                <p className="text-red-600 mt-2">{err}</p>
                <button type="submit" className="bg-green-600 text-black border border-black py-2 px-4 font-bold
                 hover:bg-white transition duration-200 ease-in-out rounded-2xl mt-4 w-full text-center">Login</button>
                <p className="mt-2 text-center cursor-pointer my-2 hover:text-orange-700  text-black" onClick={() => navigate("/signup")}>New user? Register Here</p>
            </form>
        </div>
    )
}

export default Login;