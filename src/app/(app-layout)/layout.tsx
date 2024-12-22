import React from "react";
import Navbar from "../components/Navbar/page";
import "../globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


interface LayoutProps {
  children: React.ReactNode;
  hasSidebar?: boolean;
}

const Layout = ({ children, hasSidebar }: LayoutProps) => (
  <div className="flex flex-col  min-h-screen">
    {/* Navbar */}
    
      <Navbar />
      
      <main>{children}</main>
    
      {/* Main Content */}
     
   
  </div>
);

export default Layout;
