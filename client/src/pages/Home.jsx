//import Header from "../components/Header";

import Banner from "../components/Banner";
import ProductGrid from "../components/ProductGrid";
import Laptops from "../components/Laptops";
import Beauty from "../components/Beauty";
import ImageSlider from "../components/ImageSlider";


const Home= () => {

  return (
    <div>
   
      <Banner />
      <Beauty/>
      
        <ImageSlider />
     
      <ProductGrid title="Best Sellers" />
      <Laptops/>
    </div>
  );
};

export default Home;
