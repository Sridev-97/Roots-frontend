import React from "react";

function About() {

    return(
    <div className="bg-green-50 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center">
            <h1 className="text-4xl font-bold text-green-700 mb-4">About Us</h1>
            <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to <span className="font-semibold text-green-600">Roots</span>, your trusted destination for
                natural and reusable products. Our mission is to promote sustainability by offering eco-friendly
                alternatives that reduce waste and protect the environment.
                <br /><br />
                At Roots, we believe in the power of small changes to make a big impact. That's why we carefully curate
                a range of products that are ethically sourced, biodegradable, and reusable—helping you lead a greener
                lifestyle without compromising on quality.
                <br /><br />
                Whether you're looking for everyday essentials or sustainable lifestyle products, we are here to support
                your journey toward a cleaner, healthier planet. Join us in making conscious choices for a better future!
                <br /><br />
                <span className="text-green-800 font-semibold text-xl">Go Green. Stay Rooted.</span>
            </p>
        </div>
    </div>
    )
}

export default About;


