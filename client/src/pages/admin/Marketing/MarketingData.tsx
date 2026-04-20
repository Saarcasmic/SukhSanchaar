import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAdmin } from "../../../contexts/AdminContext";

export const MarketingData: React.FC = () => {
  const { 
    marketingProducts, 
    addMarketingProduct, 
    deleteMarketingProduct, 
    marketingTeam, 
    addMarketingTeamMember, 
    deleteMarketingTeamMember, 
    loading 
  } = useAdmin();
  
  const [newProductName, setNewProductName] = useState("");
  const [newTeamMemberName, setNewTeamMemberName] = useState("");
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [isSubmittingTeam, setIsSubmittingTeam] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    
    setIsSubmittingProduct(true);
    try {
      await addMarketingProduct(newProductName);
      setNewProductName("");
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamMemberName.trim()) return;
    
    setIsSubmittingTeam(true);
    try {
      await addMarketingTeamMember(newTeamMemberName);
      setNewTeamMemberName("");
    } catch (err) {
      alert("Failed to add team member");
    } finally {
      setIsSubmittingTeam(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMarketingProduct(id);
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  const handleDeleteTeamMember = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMarketingTeamMember(id);
      } catch (err) {
        alert("Failed to delete team member");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-12">
      <div>
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-antique-brown mb-6 sm:mb-8">
          Marketing Data Settings
        </h2>
        
        {/* MARKETING TEAM SECTION */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-cream-200 mb-8">
          <h3 className="font-lora text-xl font-semibold mb-4 text-antique-brown">Add New Team Member</h3>
          <form onSubmit={handleAddTeamMember} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Member Name</label>
              <input
                type="text"
                required
                value={newTeamMemberName}
                onChange={e => setNewTeamMemberName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
                placeholder="e.g. Rahul Kumar"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmittingTeam}
              className="bg-ayur-red text-white px-6 py-3 rounded-lg font-medium hover:bg-ayur-red/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {isSubmittingTeam ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-cream-200 overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-lora text-xl font-semibold text-antique-brown">Active Team Members</h3>
            <span className="text-sm text-gray-500">{marketingTeam.length} members</span>
          </div>
          {loading && marketingTeam.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {marketingTeam.map(member => (
                <li key={member.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-500">Added: {new Date(member.created_at || '').toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTeamMember(member.id, member.name)}
                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                    title="Delete member"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
              {marketingTeam.length === 0 && (
                <li className="p-8 text-center text-gray-500">No team members added yet.</li>
              )}
            </ul>
          )}
        </div>

        <hr className="border-cream-200" />
      </div>

      {/* PRODUCTS SECTION */}
      <div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-cream-200 mb-8 mt-8">
          <h3 className="font-lora text-xl font-semibold mb-4 text-antique-brown">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                required
                value={newProductName}
                onChange={e => setNewProductName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
                placeholder="e.g. Sukh Sancharak Syrup"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmittingProduct}
              className="bg-ayur-red text-white px-6 py-3 rounded-lg font-medium hover:bg-ayur-red/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {isSubmittingProduct ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-cream-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-lora text-xl font-semibold text-antique-brown">Active Products</h3>
            <span className="text-sm text-gray-500">{marketingProducts.length} items</span>
          </div>
          {loading && marketingProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {marketingProducts.map(product => (
                <li key={product.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">Added: {new Date(product.created_at || '').toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id, product.name)}
                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
              {marketingProducts.length === 0 && (
                <li className="p-8 text-center text-gray-500">No products added yet.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
