import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, GripVertical, CheckCircle, AlertCircle } from "lucide-react";
import { useAdmin } from "../../../contexts/AdminContext";

// Inline Toast component
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onDismiss: () => void }> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border animate-[slideIn_0.3s_ease-out] ${
      type === 'error' 
        ? 'bg-red-50 border-red-200 text-red-800' 
        : 'bg-green-50 border-green-200 text-green-800'
    }`}>
      {type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle className="w-5 h-5 shrink-0" />}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export const MarketingData: React.FC = () => {
  const { 
    marketingProducts, 
    addMarketingProduct, 
    deleteMarketingProduct, 
    reorderMarketingProducts,
    fetchMarketingProducts,
    marketingTeam, 
    addMarketingTeamMember, 
    deleteMarketingTeamMember, 
    fetchMarketingTeam,
    marketingAreas,
    addMarketingArea,
    deleteMarketingArea,
    fetchMarketingAreas,
    loading 
  } = useAdmin();
  
  const [newProductName, setNewProductName] = useState("");
  const [newTeamMemberName, setNewTeamMemberName] = useState("");
  const [newAreaName, setNewAreaName] = useState("");
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [isSubmittingTeam, setIsSubmittingTeam] = useState(false);
  const [isSubmittingArea, setIsSubmittingArea] = useState(false);

  const [localProducts, setLocalProducts] = useState(marketingProducts);
  const [draggedProductId, setDraggedProductId] = useState<string | null>(null);

  // Opt 7: Inline toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Opt 5: Debounce ref for reorder API calls
  const reorderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Opt 3: Lazy-load marketing data when this admin page mounts
  useEffect(() => {
    fetchMarketingProducts();
    fetchMarketingTeam();
    fetchMarketingAreas();
  }, []);

  useEffect(() => {
    setLocalProducts(marketingProducts);
  }, [marketingProducts]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (reorderTimeoutRef.current) clearTimeout(reorderTimeoutRef.current);
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    
    setIsSubmittingProduct(true);
    try {
      await addMarketingProduct(newProductName);
      setNewProductName("");
      showToast("Product added successfully", "success");
    } catch (err) {
      showToast("Failed to add product", "error");
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
      showToast("Team member added successfully", "success");
    } catch (err) {
      showToast("Failed to add team member", "error");
    } finally {
      setIsSubmittingTeam(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMarketingProduct(id);
        showToast(`"${name}" deleted`, "success");
      } catch (err) {
        showToast("Failed to delete product", "error");
      }
    }
  };

  const handleDeleteTeamMember = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMarketingTeamMember(id);
        showToast(`"${name}" removed`, "success");
      } catch (err) {
        showToast("Failed to delete team member", "error");
      }
    }
  };

  const handleAddArea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAreaName.trim()) return;
    
    setIsSubmittingArea(true);
    try {
      await addMarketingArea(newAreaName);
      setNewAreaName("");
      showToast("Area added successfully", "success");
    } catch (err) {
      showToast("Failed to add area", "error");
    } finally {
      setIsSubmittingArea(false);
    }
  };

  const handleDeleteArea = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteMarketingArea(id);
        showToast(`"${name}" deleted`, "success");
      } catch (err) {
        showToast("Failed to delete area", "error");
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedProductId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedProductId || draggedProductId === id) return;

    const draggedIndex = localProducts.findIndex(p => p.id === draggedProductId);
    const targetIndex = localProducts.findIndex(p => p.id === id);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newProducts = [...localProducts];
    const [draggedItem] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, draggedItem);
    
    setLocalProducts(newProducts);
  };

  // Opt 5: Debounced drop handler — waits 500ms after last drop before calling API
  const handleDrop = () => {
    setDraggedProductId(null);

    // Clear any pending reorder call
    if (reorderTimeoutRef.current) clearTimeout(reorderTimeoutRef.current);

    reorderTimeoutRef.current = setTimeout(async () => {
      const newOrderPayload = localProducts.map((p, index) => ({
        id: p.id,
        sequence: index
      }));
      try {
        await reorderMarketingProducts(newOrderPayload);
        showToast("Order saved", "success");
      } catch (err) {
        showToast("Failed to save new sequence", "error");
      }
    }, 500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-12">
      {/* Opt 7: Inline Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

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

        {/* AREAS SECTION */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-cream-200 mb-8 mt-8">
          <h3 className="font-lora text-xl font-semibold mb-4 text-antique-brown">Add New Area</h3>
          <form onSubmit={handleAddArea} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Area Name</label>
              <input
                type="text"
                required
                value={newAreaName}
                onChange={e => setNewAreaName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
                placeholder="e.g. Mathura City"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmittingArea}
              className="bg-ayur-red text-white px-6 py-3 rounded-lg font-medium hover:bg-ayur-red/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {isSubmittingArea ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-cream-200 overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-lora text-xl font-semibold text-antique-brown">Active Areas</h3>
            <span className="text-sm text-gray-500">{(marketingAreas || []).length} areas</span>
          </div>
          {loading && (marketingAreas || []).length === 0 ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {(marketingAreas || []).map(area => (
                <li key={area.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">{area.name}</h4>
                    <p className="text-sm text-gray-500">Added: {new Date(area.created_at || '').toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteArea(area.id, area.name)}
                    className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition-colors"
                    title="Delete area"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
              {(marketingAreas || []).length === 0 && (
                <li className="p-8 text-center text-gray-500">No areas added yet.</li>
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
            <h3 className="font-lora text-xl font-semibold text-antique-brown">Active Products (Drag to Reorder)</h3>
            <span className="text-sm text-gray-500">{localProducts.length} items</span>
          </div>
          {loading && localProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {localProducts.map(product => (
                <li 
                  key={product.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, product.id)}
                  onDragOver={(e) => handleDragOver(e, product.id)}
                  onDrop={handleDrop}
                  className={`p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 cursor-grab active:cursor-grabbing ${draggedProductId === product.id ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="text-gray-400 w-5 h-5 cursor-grab" />
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">Added: {new Date(product.created_at || '').toLocaleDateString()}</p>
                    </div>
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
              {localProducts.length === 0 && (
                <li className="p-8 text-center text-gray-500">No products added yet.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
