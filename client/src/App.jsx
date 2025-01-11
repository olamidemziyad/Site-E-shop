import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"; // Remplacez par votre composant principal
import Signup from "./pages/Signup";
import { UserProvider } from "./context/UserContext";
import ProductDetail from "./components/ProductDetail";
import Layout from "./components/Layout";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./pages/PayementSucess";
import CategoryPage from "./categories/CategoryPage";


const App = () => {
  return (
    <UserProvider>
    <Router>
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/sign-in' element={<Signup/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
      </Layout>
    </Router>
    </UserProvider>
  );
};

export default App;
