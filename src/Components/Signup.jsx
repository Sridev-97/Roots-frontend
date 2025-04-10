import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../Config/firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/home');
            } else {
                console.log('User Logged Out');
            }
        })
    }, []);

    const signUp = (e) => {
        e.preventDefault();

        //Validationg the Password
        if (pass !== confirm) {
            setErr("Passwords do not match");
            return;
        }

        //User Creation
        createUserWithEmailAndPassword(auth, email, pass).then((res) => {
            alert("Registered Successfully");
            // After successful registration, redirect to the login page
            navigate('/login');
        }).catch(() => {
            alert("Registration Failed");
        })     
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <form onSubmit={signUp} className="p-10 bg-green-200 rounded-3xl border border-black shadow-md" style={{ width: "75%" }}>
                <h2 className="text-center text-3xl font-bold mb-5 text-black">Register</h2>
                <div>
                    <label className="block text-black font-bold">Email</label>
                    <input type="email" value={email} className="mt-1 p-2 w-full border rounded-2xl border-black"
                        onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div>
                    <label className="block text-black font-bold">Password</label>
                    <input type="password" value={pass} className="mt-1 p-2 w-full border rounded-2xl border-black"
                        onChange={(e) => setPass(e.target.value)} required></input>
                </div>
                <div>
                    <label className="block text-black font-bold">Confirm Password</label>
                    <input type="password" value={confirm} className="mt-1 p-2 w-full border rounded-2xl border-black"
                        onChange={(e) => setConfirm(e.target.value)} required></input>
                    {err && <p className="text-red-600">{err}</p>}
                </div>
                <button type="submit" className="bg-green-600 text-black border border-black py-2 px-4 font-bold
                 hover:bg-white transition duration-200 ease-in-out rounded-2xl mt-4 w-full text-center">Register</button>
                <p className="mt-2 text-center cursor-pointer my-2  hover:text-orange-700  text-black" onClick={() => navigate("/login")}>Already have an account? Login here</p>
            </form>
        </div>
    )
}

export default Signup;