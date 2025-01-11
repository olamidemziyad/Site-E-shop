import React, { useState } from "react";

const products = [
  {
    image: "https://images.unsplash.com/photo-1631214499887-88e7084d7f64?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Vegan Lipsticks",
    price: "3,000",
    oldPrice: "",
    discount: "",
  },
  {
    image: "https://images.unsplash.com/photo-1650532092883-789d254a4931?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "TREW Baume a levre",
    price: "9,600",
    oldPrice: "12,000",
    discount: "-20%",
  },
  {
    image: "https://i.pinimg.com/736x/a0/b4/f7/a0b4f7ab75af3dc69333e6c688516698.jpg",
    title: "CeraVe Foarming Facial Cleanser",
    price: "9,720",
    oldPrice: "12,000",
    discount: "-19%",
  },
  {
    image: "https://i.pinimg.com/736x/b5/4d/42/b54d42b3071c8a03758409db5f95c83e.jpg",
    title: "CeraVe Gel de Limpeza",
    price: "6 400.",
    oldPrice: "8,000",
    discount: "-20%",
  },
  {
    image: "https://i.pinimg.com/736x/19/8d/f8/198df8ae568635a003f27aee29828396.jpg",
    title: "Victoria's Secret Bare Vanilla",
    price: "9,999",
    oldPrice: "",
    discount: "",
  },
  {
    image: "https://i.pinimg.com/736x/8a/0e/69/8a0e69b3e6007b25ef5ccf5e21234993.jpg",
    title: "Eyeshadow Palette Color: 18 Colors Palette",
    price: "4,559",
    oldPrice: "",
    discount: "",
  },
  {
    image: "https://i.pinimg.com/736x/8a/3a/7b/8a3a7b3cf4539db8348918f75fc2a6b9.jpg",
    title: "5x5 lace closure wigs with a large 5*5 inch front lace, perfect hairline, and new glueless processes",
    price: "35,450",
    oldPrice: "",
    discount: "",
  },
  {
    image: "https://i.pinimg.com/736x/cb/31/1e/cb311ec39024259e80dbe9bf7dcff2c4.jpg",
    title: "Magic Love Lace Front Wig Natural Curly Human Hair Wig Brazilian Remy Hair Jerry Curl Wig 180",
    price: "",
    oldPrice: "",
    discount: "",
  },
  
];

const Beauty = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < products.length - visibleCount) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      {/* En-tête de la section */}
      <div className="flex justify-between items-center mb-4 bg-pink-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-pink-900">Beauty & Health</h1>
        <button className="bg-pink-800 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          See More
        </button>
      </div>
  
      {/* Carousel des produits */}
      <div className="relative">
        {/* Bouton Précédent */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 transition hover:bg-gray-200 ${
            startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
  
        {/* Liste des produits */}
        <div className="flex space-x-4 overflow-hidden">
          {products.slice(startIndex, startIndex + visibleCount).map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md w-64 min-w-[16rem] max-w-[18rem] transition hover:scale-105 hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={`Image of ${product.title}`}
                className="w-full h-40 object-cover mb-4 rounded-lg transition hover:opacity-90"
              />
              <p className="text-sm font-medium text-gray-700 mb-2">
                {product.title || "No title available"}
              </p>
              <p className="text-xl font-bold text-gray-800">
                {product.price ? `${product.price} FCFA` : "Price not available"}
              </p>
              {product.oldPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {product.oldPrice}
                </p>
              )}
              {product.discount && (
                <p className="text-sm text-orange-500">{product.discount}</p>
              )}
            </div>
          ))}
        </div>
  
        {/* Bouton Suivant */}
        <button
          onClick={handleNext}
          disabled={startIndex >= products.length - visibleCount}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 transition hover:bg-gray-200 ${
            startIndex >= products.length - visibleCount ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
  
};

export default Beauty;
