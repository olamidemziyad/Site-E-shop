import React, { useState, useEffect } from "react";

const images = [
"https://images.pexels.com/photos/3052848/pexels-photo-3052848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
 "https://images.pexels.com/photos/3048210/pexels-photo-3048210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
 "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600", 
 "https://images.pexels.com/photos/7552324/pexels-photo-7552324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
 "https://images.pexels.com/photos/6169664/pexels-photo-6169664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
 "https://img.global.news.samsung.com/in/wp-content/uploads/2019/04/A70-Newsroom.jpg", // Samsung ad 
 "https://9to5google.com/wp-content/uploads/sites/4/2024/06/samsung-fold-flip-6-leaked-ad-1.jpg?quality=82&strip=all&w=1024", 
 "https://i.ytimg.com/vi/GDlkCkcIqTs/maxresdefault.jpg", // iPhone 16 
 "https://i.ytimg.com/vi/sXrasaDZxw0/maxresdefault.jpg", // Google Pixel 
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxwiVyXCWh9G04al-J7oBXLdenuVeursfQE4tKDuQplQh4Qz3X-b-AuDzpOajNZsbgkkk&usqp=CAU",
  "https://images.pexels.com/photos/3052848/pexels-photo-3052848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3048210/pexels-photo-3048210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/7552324/pexels-photo-7552324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6169664/pexels-photo-6169664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 3000; // Temps entre chaque slide (en ms)

  // Fonction pour passer à l'image suivante
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour passer à l'image précédente
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Fonction pour aller à une image spécifique via un bouton
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Slide automatique
  useEffect(() => {
    const interval = setInterval(nextSlide, delay);
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8">
      {/* Conteneur des images */}
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 35}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          ))}
        </div>
      </div>

      {/* Flèches de navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition z-10"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition z-10"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Boutons pour chaque image */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            } transition`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
