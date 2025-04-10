import React from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../data/data";

function Home() {
    const images = [
        "/assets/Slide1.jpg",
        "/assets/Slide2.jpg"
    ];

    const slides = [
        "/assets/Slide3.webp",
        "/assets/Slide4.webp"
    ];

    const logoCount = 6;
    const logos = Array.from({ length: logoCount }, (_, index) => `/assets/logos/logo${index + 1}.png`);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="w-full mx-auto mt-10">
            {/* Slider for medium and larger screens */}
            <div className="hidden md:block">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index} className="flex justify-center items-center h-[600px]">
                            <img src={img} alt={`Slide ${index + 1}`} className="rounded-lg w-full h-full object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Slider for small screens only */}
            <div className="block md:hidden">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="flex justify-center items-center h-[300px]">
                            <img src={slide} alt={`Slide ${index + 1}`} className="rounded-lg w-full h-full object-cover" />
                        </div>
                    ))}
                </Slider>
            </div>
            <p className="text-orange-600 px-3 mt-10 font-bold">Vetted. Trusted. Valued</p>
            <h3 className="text-5xl p-3">Popular Brands</h3>
            <div className="px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {logos.map((logo, index) => (
                    <div key={index} className="flex justify-center items-center">
                        <img src={logo} alt={`Logo ${index + 1}`} className="w-[250px] h-[250px] object-cover rounded-lg "
                            onError={(e) => { e.target.src = "https://via.placeholder.com/250?text=Image+Not+Found"; }} />
                    </div>
                ))}
            </div>

            <div className="px-3 grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10 rounded-lg">
                {data.featuresData.map((feature, index) => (
                    <div key={index} className="flex flex-col bg-gray-100 justify-center items-center border rounded-xl">
                        <img src={feature.icon} alt={`Logo ${index + 1}`} className="w-16 h-32 object-cover rounded-lg "
                            onError={(e) => { e.target.src = "https://via.placeholder.com/250?text=Image+Not+Found"; }} />
                        <p className=" p-3 text-gray-600 text-sm max-w-xs">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>


            <div className="bg-violet-1 00 px-10 py-5 border-black rounded-lg mt-10">
                <p className="text-orange-600 px-3 font-bold">Creating Impact Together</p>
                <h3 className="text-5xl py-3">A Commitment to our Planet</h3>
                <p className="text-black">Shopping at EarthHero helps create a more sustainable planet. Our commitment to certifications like 1% For the Planet and Climate Neutral shows our dedication
                    to a better future. These certifications demonstrate the environmental impact of our choices and each purchase from EarthHero is a step towards a greener,
                    brighter tomorrow. Thank you for joining us on this journey.</p>
            </div>
        </div>
    )
}

export default Home;