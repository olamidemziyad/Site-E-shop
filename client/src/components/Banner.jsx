import React from "react";

let img =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Banner = () => (
  <section className="relative h-[400px]">
    {/* Image en arrière-plan */}
    <img
      src={img}
      alt="Banner image of a woman with shopping bags"
      className="w-full h-full object-cover"
    />
    
    {/* Contenu texte centré */}
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-30">
      <h2 className="text-lg md:text-2xl">ICONIC MAKEUP COLLECTIONS:</h2>
      <h1 className="text-2xl md:text-5xl font-bold text-center px-4">
        Makeup Which Enhances Your Natural Beauty
      </h1>
      <button className="mt-4 bg-white text-gray-800 px-6 py-2 rounded shadow-md hover:bg-gray-100 transition">
        SHOP NOW
      </button>
    </div>
  </section>
);

export default Banner;
