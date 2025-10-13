import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContext";
import { AdminProvider } from "./contexts/AdminContext";
import { ProductProvider } from "./contexts/ProductContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ProductsPage from "./pages/ProductsPage";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  return (
    <HelmetProvider>
      <AdminProvider>
        <CartProvider>
          <ProductProvider>
            <Router>
              <div className="min-h-screen bg-gradient-to-br from-aged-paper via-vintage-beige to-cream-100 bg-ayurveda-texture">
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-failed" element={<PaymentFailed />} />
                </Routes>
                <Footer />
              </div>
            </Router>
          </ProductProvider>
        </CartProvider>
      </AdminProvider>
    </HelmetProvider>
  );
}

export default App;
