import { Outlet } from "react-router-dom";
import Footer from "../Share/Footer";
import Navbar from "../Share/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">{<Outlet />}</div>
      <Footer />
    </>
  );
}
