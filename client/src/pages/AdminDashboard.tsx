import React, { useState } from "react";
import {
  Package,
  ShoppingBag,
  Settings,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";
import { OrdersPage } from "./admin/Orders";
import AdminLogin from "../components/AdminLogin";

const AdminDashboard: React.FC = () => {
  const {
    isAuthenticated,
    authError,
    isAuthLoading,
    login,
    logout,
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useAdmin();
  const [activeTab, setActiveTab] = useState<
    "orders" | "products" | "settings"
  >("orders");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "",
    image_url: "",
    images: "",
    ingredients: "",
    benefits: "",
    usage_instructions: "",
    weight: "",
    expiry_date: "",
    stock_quantity: "",
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={login}
        error={authError || undefined}
        isLoading={isAuthLoading}
      />
    );
  }

  const handleAddProduct = async () => {
    if (
      !productForm.name ||
      !productForm.price ||
      !productForm.category ||
      !productForm.description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        original_price: productForm.original_price
          ? parseFloat(productForm.original_price)
          : undefined,
        category: productForm.category,
        image_url:
          productForm.image_url ||
          "https://images.pexels.com/photos/5946634/pexels-photo-5946634.jpeg?auto=compress&cs=tinysrgb&w=400",
        images: productForm.images
          ? productForm.images.split(",").map((img) => img.trim())
          : undefined,
        ingredients: productForm.ingredients
          ? productForm.ingredients.split(",").map((ing) => ing.trim())
          : [],
        benefits: productForm.benefits
          ? productForm.benefits.split(",").map((ben) => ben.trim())
          : [],
        usage_instructions:
          productForm.usage_instructions || "As directed by physician",
        weight: productForm.weight || "100ml",
        expiry_date: productForm.expiry_date || undefined,
        stock_quantity: parseInt(productForm.stock_quantity) || 0,
        is_active: productForm.is_active,
      };

      await addProduct(productData);

      setProductForm({
        name: "",
        description: "",
        price: "",
        original_price: "",
        category: "",
        image_url: "",
        images: "",
        ingredients: "",
        benefits: "",
        usage_instructions: "",
        weight: "",
        expiry_date: "",
        stock_quantity: "",
        is_active: true,
      });
      setShowAddProduct(false);
    } catch (err) {
      alert(
        "Failed to add product: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setProductForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        original_price: product.original_price?.toString() || "",
        category: product.category,
        image_url: product.image_url,
        images: product.images?.join(", ") || "",
        ingredients: product.ingredients.join(", "),
        benefits: product.benefits.join(", "),
        usage_instructions: product.usage_instructions,
        weight: product.weight,
        expiry_date: product.expiry_date || "",
        stock_quantity: product?.stock_quantity?.toString(),
        is_active: product.is_active,
      });
      setEditingProduct(productId);
      setShowAddProduct(true);
    }
  };

  const handleUpdateProduct = async () => {
    if (
      !editingProduct ||
      !productForm.name ||
      !productForm.price ||
      !productForm.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        original_price: productForm.original_price
          ? parseFloat(productForm.original_price)
          : undefined,
        category: productForm.category,
        image_url: productForm.image_url,
        images: productForm.images
          ? productForm.images.split(",").map((img) => img.trim())
          : undefined,
        ingredients: productForm.ingredients
          ? productForm.ingredients.split(",").map((ing) => ing.trim())
          : [],
        benefits: productForm.benefits
          ? productForm.benefits.split(",").map((ben) => ben.trim())
          : [],
        usage_instructions: productForm.usage_instructions,
        weight: productForm.weight,
        expiry_date: productForm.expiry_date || undefined,
        stock_quantity: parseInt(productForm.stock_quantity) || 0,
        is_active: productForm.is_active,
      };

      await updateProduct(editingProduct, productData);

      setProductForm({
        name: "",
        description: "",
        price: "",
        original_price: "",
        category: "",
        image_url: "",
        images: "",
        ingredients: "",
        benefits: "",
        usage_instructions: "",
        weight: "",
        expiry_date: "",
        stock_quantity: "",
        is_active: true,
      });
      setShowAddProduct(false);
      setEditingProduct(null);
    } catch (err) {
      alert(
        "Failed to update product: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
      } catch (err) {
        alert(
          "Failed to delete product: " +
            (err instanceof Error ? err.message : "Unknown error"),
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-antique-brown text-cream-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-cream-200/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-xl sm:text-2xl font-bold">
                Admin Dashboard
              </h1>
              <p className="font-noto text-xs sm:text-sm text-cream-200 mt-1">
                Sanchaaar Heritage
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="p-2 hover:bg-antique-brown/80 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-antique-brown/80 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          <button
            onClick={() => {
              setActiveTab("orders");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 sm:px-6 py-3 text-left font-noto transition-colors ${
              activeTab === "orders"
                ? "bg-ayur-red text-white"
                : "hover:bg-antique-brown/80"
            }`}
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            <span className="text-sm sm:text-base">Orders</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("products");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 sm:px-6 py-3 text-left font-noto transition-colors ${
              activeTab === "products"
                ? "bg-ayur-red text-white"
                : "hover:bg-antique-brown/80"
            }`}
          >
            <Package className="w-5 h-5 mr-3" />
            <span className="text-sm sm:text-base">
              Products ({products.length})
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("settings");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 sm:px-6 py-3 text-left font-noto transition-colors ${
              activeTab === "settings"
                ? "bg-ayur-red text-white"
                : "hover:bg-antique-brown/80"
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            <span className="text-sm sm:text-base">Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="font-playfair text-lg font-bold text-antique-brown">
            {activeTab === "orders" && "Orders Management"}
            {activeTab === "products" && "Products Management"}
            {activeTab === "settings" && "Settings"}
          </h2>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            {/* Orders Tab */}
            {activeTab === "orders" && <OrdersPage />}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                  <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-antique-brown">
                    Products Management
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddProduct(true);
                      setEditingProduct(null);
                      setProductForm({
                        name: "",
                        description: "",
                        price: "",
                        original_price: "",
                        category: "",
                        image_url: "",
                        images: "",
                        ingredients: "",
                        benefits: "",
                        usage_instructions: "",
                        weight: "",
                        expiry_date: "",
                        stock_quantity: "",
                        is_active: true,
                      });
                    }}
                    className="bg-ayur-red text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Add Product</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ayur-red"></div>
                  </div>
                )}

                {/* Products Grid */}
                {!loading && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {products.length === 0 ? (
                      <div className="col-span-full bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center border border-cream-200">
                        <Package className="w-12 h-12 sm:w-16 sm:h-16 text-cream-200 mx-auto mb-4" />
                        <h3 className="font-lora text-lg sm:text-xl text-antique-brown mb-2">
                          No Products Yet
                        </h3>
                        <p className="font-noto text-sm sm:text-base text-antique-brown/60">
                          Add your first product to get started.
                        </p>
                      </div>
                    ) : (
                      products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-cream-200 hover:shadow-xl transition-shadow"
                        >
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-32 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                          />
                          <h3 className="font-lora text-base sm:text-lg font-semibold text-antique-brown mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="font-noto text-xs sm:text-sm text-antique-brown/60 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <p className="font-noto text-xs text-antique-brown/50 mb-3">
                            Category: {product.category}
                          </p>
                          <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="font-playfair text-lg sm:text-xl font-bold text-ayur-red">
                              ₹{product.price}
                            </span>
                            {product.original_price && (
                              <span className="font-noto text-xs sm:text-sm text-gray-500 line-through">
                                ₹{product.original_price}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-xs sm:text-sm text-antique-brown/60 mb-3 sm:mb-4">
                            <span>Stock: {product.stock_quantity}</span>
                            <span className="truncate ml-2">
                              Weight: {product.weight}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product.id)}
                              className="flex-1 bg-ayur-gold text-white py-2 rounded-lg font-noto text-xs sm:text-sm hover:bg-ayur-gold/90 transition-colors flex items-center justify-center gap-1"
                            >
                              <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex-1 bg-red text-black py-2 rounded-lg font-noto text-xs sm:text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-antique-brown mb-6 sm:mb-8">
                  Settings
                </h2>
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-cream-200">
                  <h3 className="font-lora text-lg sm:text-xl font-semibold text-antique-brown mb-4">
                    Store Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                        Store Name
                      </label>
                      <input
                        type="text"
                        value="Sanchaaar - Ayurvedic Heritage"
                        className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value="info@sanchaaar.com"
                        className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value="+91 98765 43210"
                        className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="font-playfair text-lg sm:text-2xl font-bold text-antique-brown">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setShowAddProduct(false);
                  setEditingProduct(null);
                  setProductForm({
                    name: "",
                    description: "",
                    price: "",
                    original_price: "",
                    category: "",
                    image_url: "",
                    images: "",
                    ingredients: "",
                    benefits: "",
                    usage_instructions: "",
                    weight: "",
                    expiry_date: "",
                    stock_quantity: "",
                    is_active: true,
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 rotate-45" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select Category</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Powder">Powder</option>
                    <option value="Oil">Oil</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Cream">Cream</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                  Description *
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                    placeholder="₹0"
                  />
                </div>
                <div>
                  <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                    Original Price
                  </label>
                  <input
                    type="number"
                    value={productForm.original_price}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        original_price: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                    placeholder="₹0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                    Weight *
                  </label>
                  <input
                    type="text"
                    value={productForm.weight}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        weight: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                    placeholder="e.g., 100ml, 60 tablets"
                  />
                </div>
                <div>
                  <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={productForm.stock_quantity}
                    onChange={(e) =>
                      setProductForm((prev) => ({
                        ...prev,
                        stock_quantity: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                  Image URL
                </label>
                <input
                  type="url"
                  value={productForm.image_url}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      image_url: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                  Additional Images (comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.images}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      images: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>

              <div>
                <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                  Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.ingredients}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      ingredients: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                  placeholder="Ginger, Peppermint, Cardamom"
                />
              </div>

              <div>
                <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                  Benefits (comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.benefits}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      benefits: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                  placeholder="Relieves stomach ache, Aids digestion"
                />
              </div>

              <div>
                <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                  Usage Instructions
                </label>
                <textarea
                  value={productForm.usage_instructions}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      usage_instructions: e.target.value,
                    }))
                  }
                  rows={2}
                  className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                  placeholder="Take 1-2 teaspoons twice daily after meals"
                />
              </div>

              <div>
                <label className="block font-noto font-semibold text-antique-brown mb-2 text-sm sm:text-base">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={productForm.expiry_date}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      expiry_date: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-ayur-red focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={productForm.is_active}
                  onChange={(e) =>
                    setProductForm((prev) => ({
                      ...prev,
                      is_active: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-ayur-red border-cream-200 rounded focus:ring-ayur-red"
                />
                <label
                  htmlFor="is_active"
                  className="font-noto text-antique-brown text-sm sm:text-base"
                >
                  Product is active
                </label>
              </div>

              <button
                onClick={
                  editingProduct ? handleUpdateProduct : handleAddProduct
                }
                disabled={isSubmitting}
                className="w-full bg-ayur-red text-white py-3 rounded-full font-noto font-semibold hover:bg-ayur-red/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting
                  ? "Processing..."
                  : editingProduct
                    ? "Update Product"
                    : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
