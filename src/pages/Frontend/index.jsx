import { Route, Routes } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Services from "./Services"
import Products from "./Products"
import Cart from "./Cart"
import PageNotFound from "@/components/Misc/PageNotFound"


const Frontend = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default Frontend