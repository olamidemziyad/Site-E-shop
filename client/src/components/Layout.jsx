
import React from "react";
import Navbar from "./Navbar"; // Assurez-vous d'avoir une Navbar existante

const Layout = ({ children }) => {
  return (
    <div style={{ paddingTop: "64px" }}>
      <Navbar />
      <main className="container mx-auto py-4">{children}</main>
    </div>
  );
};

export default Layout;
