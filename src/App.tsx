import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/layout/Layout";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import Main from "./components/common/main/Main";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Layout title="Магазин">
       <Main/>
        </Layout>
      </div>
    </CartProvider>
  );
}

export default App;
