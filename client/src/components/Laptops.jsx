import React, { useState } from "react";

const products = [
  {
    image: "https://i5.walmartimages.com/seo/Restored-Dell-XPS-9720-Laptop-2022-17-FHD-Core-i7-1TB-SSD-32GB-RAM-RTX-3050-14-Cores-4-7-GHz-12th-Gen-CPU-Refurbished_33549550-ef66-4eab-9136-d7a1be35404c.b5f81cf725ebfe0c4ca6d37985183c2c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    title: "Restored Dell XPS 9720 Laptop (2022) 17 FHD+ Core i7 - 1TB SSD - 32GB RAM - RTX 3050 14 Cores @ 4.7 GHz - 12th Gen CPU",
    price: "234,990 FCFA",
    oldPrice: "312,500 FCFA",
    discount: "-25%",
  },
  {
    image: "https://target.scene7.com/is/image/Target/GUEST_23c0cc73-1c14-4e9b-9512-529b07e6fd95?wid=1200&hei=1200&qlt=80&fmt=webp",
    title: "Acer Nitro 5 - 15.6 Laptop AMD Ryzen 7 6800H 3.20GHz 16GB RAM 1TB SSD W11H - Manufacturer Refurbished",
    price: "350,000 FCFA",
    oldPrice: "437,500 FCFA",
    discount: "-20%",
  },
  {
    image: "https://target.scene7.com/is/image/Target/GUEST_3a35b2cb-92e5-46f4-9cbe-39de7d539a52?wid=1000&hei=1000&qlt=80&fmt=webp",
    title: "Acer Predator Helios 16 Laptop Intel Core i7-13700HX 2.10GHz 16GB 1TB SSD W11H - Manufacturer Refurbished",
    price: "335,000 FCFA",
    oldPrice: "412,500 FCFA",
    discount: "-19%",
  },
  {
    image: "https://target.scene7.com/is/image/Target/GUEST_722a7cf6-bd1b-451c-a663-ead06b83738b?wid=1200&hei=1200&qlt=80&fmt=webp",
    title: "Lenovo Ideapad 5x 2-in-1 14 WUXGA OLED Touchscreen Copilot+ PC Qualcomm Snapdragon X Plus 16GB RAM 1TB SSD Luna Grey",
    price: "165,000 FCFA",
    oldPrice: "206,250 FCFA",
    discount: "-20%",
  },
  {
    image: "https://target.scene7.com/is/image/Target/GUEST_75ec4ce3-3d69-4a02-beff-41dc00d2dcf6?wid=1200&hei=1200&qlt=80&fmt=webp",
    title: "HP Envy x360 2-in-1 Laptop - 512GB SSD - 16GB RAM - Intel Core Ultra - 15.6\"",
    price: "525,000 FCFA",
    oldPrice: "687,500 FCFA",
    discount: "-24%",
  },
  {
    image: "https://i5.walmartimages.com/seo/Restored-Dell-XPS-9720-Laptop-2022-17-FHD-Core-i7-1TB-SSD-32GB-RAM-RTX-3050-14-Cores-4-7-GHz-12th-Gen-CPU-Refurbished_33549550-ef66-4eab-9136-d7a1be35404c.b5f81cf725ebfe0c4ca6d37985183c2c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    title: "Restored Dell XPS 9720 Laptop (2022) 17 FHD+ Core i7 - 1TB SSD - 32GB RAM - RTX 3050 14 Cores @ 4.7 GHz - 12th Gen CPU",
    price: "234,990 FCFA",
    oldPrice: "312,500 FCFA",
    discount: "-25%",
  },
  {
    image: "https://target.scene7.com/is/image/Target/GUEST_23c0cc73-1c14-4e9b-9512-529b07e6fd95?wid=1200&hei=1200&qlt=80&fmt=webp",
    title: "Acer Nitro 5 - 15.6 Laptop AMD Ryzen 7 6800H 3.20GHz 16GB RAM 1TB SSD W11H - Manufacturer Refurbished",
    price: "350,000 FCFA",
    oldPrice: "437,500 FCFA",
    discount: "-20%",
  },
  {
    image: "https://target.scene7.com/is/image/Target/GUEST_3a35b2cb-92e5-46f4-9cbe-39de7d539a52?wid=1000&hei=1000&qlt=80&fmt=webp",
    title: "Acer Predator Helios 16 Laptop Intel Core i7-13700HX 2.10GHz 16GB 1TB SSD W11H - Manufacturer Refurbished",
    price: "335,000 FCFA",
    oldPrice: "412,500 FCFA",
    discount: "-19%",
  },
  {
    image: "https://mediatechlb.com/wp-content/uploads/Lenovo-5-14Q8X9-2-IN-1-83GH0009US-4.webp",
    title: "Lenovo Ideapad 5x 2-in-1 14 WUXGA OLED Touchscreen Copilot+ PC Qualcomm Snapdragon X Plus 16GB RAM 1TB SSD Luna Grey",
    price: "165,000 FCFA",
    oldPrice: "206,250 FCFA",
    discount: "-20%",
  },
  {
    image: "https://target.scene7.com/is/image/Target/GUEST_75ec4ce3-3d69-4a02-beff-41dc00d2dcf6?wid=1200&hei=1200&qlt=80&fmt=webp",
    title: "HP Envy x360 2-in-1 Laptop - 512GB SSD - 16GB RAM - Intel Core Ultra - 15.6\"",
    price: "525,000 FCFA",
    oldPrice: "687,500 FCFA",
    discount: "-24%",
  },
];

const Laptops = () => {
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
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Laptops for every budget and work
        </h1>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
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
                {product.price || "N/A"}
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

export default Laptops;
