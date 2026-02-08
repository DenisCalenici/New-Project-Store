import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/common/product/Product";
import CheckoutForm from "./components/common/checkout/CheckoutForm";
import Home from "./pages/home";
import App from "./App";
import Catalog from "./components/catalog/Catalog";
import About from "./components/common/about/About";
import Wholesale from "./components/common/wholesale/Wholesale";
import Favorites from "./components/common/favorites/Favorites";
import Cart from "./components/common/cart/Cart";
import { CartProvider } from "../src/context/CartContext"; 

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="product" element={<Product />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
