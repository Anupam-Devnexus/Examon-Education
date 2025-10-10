import React from "react";

const Card = ({ title, bgImage, icon, description, accentColor = "#e74c3c" }) => {
    return (
        <div
            className="w-72 md:w-80 bg-gray-100 rounded-2xl overflow-hidden shadow-md 
                 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        >
           
            <div
                className="h-40 relative flex items-center justify-center text-white font-bold text-2xl"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Gradient overlay with custom accent color */}
                <div
                    className="absolute inset-0 opacity-80"
                    style={{
                        background: `linear-gradient(to bottom, ${accentColor}, rgba(0,0,0,2.5))`,
                    }}
                ></div>

                {/* Title Text */}
                <span className="relative z-10 tracking-wider drop-shadow-lg">
                    {title}
                </span>
            </div>

            {/* 🔹 Hexagon Icon Section */}
            <div className="flex justify-center -mt-10">
                <div
                    className="w-24 h-24 flex bg-gray-100 items-center justify-center shadow-md"
                    style={{

                        clipPath:
                            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                >
                    <img
                        src={icon}
                        alt={`${title} icon`}
                        className="w-18 h-18 invert"
                        style={{
                            clipPath:
                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                        }}
                    />
                </div>
            </div>

            {/* 🔹 Description Section */}
            <div className="px-6 py-2 text-center">
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
