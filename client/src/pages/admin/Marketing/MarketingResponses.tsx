import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, MapPin, Eye, ExternalLink, Trash2, X, CheckCircle, AlertCircle } from "lucide-react";
import { useAdmin } from "../../../contexts/AdminContext";
import { MarketingResponse } from "../../../contexts/AdminContext";

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

export const MarketingResponses: React.FC = () => {
  const { marketingResponses, updateMarketingResponseStatus, deleteMarketingResponse, fetchMarketingResponses, loading } = useAdmin();

  // Opt 7: Inline toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  // Opt 3: Lazy-load marketing responses when this admin page mounts
  useEffect(() => {
    fetchMarketingResponses();
  }, []);
  
  // Basic Search
  const [searchTerm, setSearchTerm] = useState("");
  
  // Advanced Filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    status: "all",
    area: [] as string[],
    person: [] as string[],
    location: [] as string[],
    startDate: "",
    endDate: ""
  });

  const [selectedResponse, setSelectedResponse] = useState<MarketingResponse | null>(null);

  const filteredResponses = marketingResponses.filter(r => {
    // Basic search on doctor shop name
    const matchesSearch = r.doctor_shop_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Advanced filters
    const matchesStatus = advancedFilters.status === "all" || r.status === advancedFilters.status;
    const matchesArea = advancedFilters.area.length === 0 || (r.area && advancedFilters.area.includes(r.area));
    const matchesPerson = advancedFilters.person.length === 0 || (r.marketing_person_name && advancedFilters.person.includes(r.marketing_person_name));
    
    const rLocStr = r.location ? `${r.location.latitude.toFixed(6)}, ${r.location.longitude.toFixed(6)}` : null;
    const matchesLocation = advancedFilters.location.length === 0 || (rLocStr && advancedFilters.location.includes(rLocStr));
    
    let matchesDate = true;
    if (advancedFilters.startDate || advancedFilters.endDate) {
      const rDate = new Date(r.date).getTime();
      const sDate = advancedFilters.startDate ? new Date(advancedFilters.startDate).getTime() : 0;
      // For end date, we add 86400000 (1 day) minus 1 ms to include the entire end date
      const eDate = advancedFilters.endDate ? new Date(advancedFilters.endDate).getTime() + 86399999 : Infinity;
      matchesDate = rDate >= sDate && rDate <= eDate;
    }

    return matchesSearch && matchesStatus && matchesArea && matchesPerson && matchesLocation && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "pending":
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateMarketingResponseStatus(id, status);
      if (selectedResponse?.id === id) {
        setSelectedResponse(prev => prev ? { ...prev, status } : null);
      }
      showToast(`Status updated to "${status}"`, "success");
    } catch (err) {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this response? This action cannot be undone.")) {
      try {
        await deleteMarketingResponse(id);
        if (selectedResponse?.id === id) {
          setSelectedResponse(null);
        }
        showToast("Response deleted", "success");
      } catch (err) {
        showToast("Failed to delete response", "error");
      }
    }
  };

  const uniqueAreas = Array.from(new Set(marketingResponses.map(r => r.area).filter(Boolean) as string[])).sort();
  const uniquePersons = Array.from(new Set(marketingResponses.map(r => r.marketing_person_name).filter(Boolean) as string[])).sort();
  const uniqueLocations = Array.from(new Set(marketingResponses.map(r => r.location ? `${r.location.latitude.toFixed(6)}, ${r.location.longitude.toFixed(6)}` : null).filter(Boolean) as string[])).sort();

  const activeFiltersCount = (advancedFilters.status !== "all" ? 1 : 0) + 
    (advancedFilters.startDate ? 1 : 0) + 
    (advancedFilters.endDate ? 1 : 0) + 
    advancedFilters.area.length + 
    advancedFilters.person.length +
    advancedFilters.location.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Opt 7: Inline Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-antique-brown">
          Marketing Responses
        </h2>
      </div>
      
      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-cream-200 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Quick search by doctor / shop name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ayur-red"
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 p-2 px-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-ayur-red font-medium text-gray-700 w-full sm:w-auto"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-ayur-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-antique-brown">Advanced Filters</h3>
              <button 
                onClick={() => setIsFilterModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={advancedFilters.status}
                  onChange={e => setAdvancedFilters({...advancedFilters, status: e.target.value})}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ayur-red"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marketing Person</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
                  {uniquePersons.map(person => (
                    <label key={person} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md shadow-sm border border-gray-200 text-sm cursor-pointer hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox"
                        checked={advancedFilters.person.includes(person)}
                        onChange={(e) => {
                          if (e.target.checked) setAdvancedFilters(prev => ({...prev, person: [...prev.person, person]}));
                          else setAdvancedFilters(prev => ({...prev, person: prev.person.filter(p => p !== person)}));
                        }}
                        className="rounded text-ayur-red focus:ring-ayur-red w-4 h-4 cursor-pointer"
                      />
                      {person}
                    </label>
                  ))}
                  {uniquePersons.length === 0 && <span className="text-gray-400 text-sm italic">No people found</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
                  {uniqueAreas.map(area => (
                    <label key={area} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md shadow-sm border border-gray-200 text-sm cursor-pointer hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox"
                        checked={advancedFilters.area.includes(area)}
                        onChange={(e) => {
                          if (e.target.checked) setAdvancedFilters(prev => ({...prev, area: [...prev.area, area]}));
                          else setAdvancedFilters(prev => ({...prev, area: prev.area.filter(a => a !== area)}));
                        }}
                        className="rounded text-ayur-red focus:ring-ayur-red w-4 h-4 cursor-pointer"
                      />
                      {area}
                    </label>
                  ))}
                  {uniqueAreas.length === 0 && <span className="text-gray-400 text-sm italic">No areas found</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Coordinates</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
                  {uniqueLocations.map(loc => (
                    <label key={loc} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md shadow-sm border border-gray-200 text-xs font-mono cursor-pointer hover:bg-gray-50 transition-colors">
                      <input 
                        type="checkbox"
                        checked={advancedFilters.location.includes(loc)}
                        onChange={(e) => {
                          if (e.target.checked) setAdvancedFilters(prev => ({...prev, location: [...prev.location, loc]}));
                          else setAdvancedFilters(prev => ({...prev, location: prev.location.filter(l => l !== loc)}));
                        }}
                        className="rounded text-ayur-red focus:ring-ayur-red w-4 h-4 cursor-pointer"
                      />
                      {loc}
                    </label>
                  ))}
                  {uniqueLocations.length === 0 && <span className="text-gray-400 text-sm italic">No locations found</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={advancedFilters.startDate}
                    onChange={e => setAdvancedFilters({...advancedFilters, startDate: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ayur-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={advancedFilters.endDate}
                    onChange={e => setAdvancedFilters({...advancedFilters, endDate: e.target.value})}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ayur-red"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 shrink-0">
              <button 
                onClick={() => setAdvancedFilters({ status: "all", area: [], person: [], location: [], startDate: "", endDate: "" })}
                className="px-6 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Clear
              </button>
              <button 
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2 bg-ayur-red hover:bg-ayur-red/90 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responses Table */}
      <div className="bg-white rounded-xl shadow-lg border border-cream-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
              <th className="p-4 font-medium">Date & Time</th>
              <th className="p-4 font-medium">Marketing Person</th>
              <th className="p-4 font-medium">Doctor / Shop name</th>
              <th className="p-4 font-medium">Area</th>
              <th className="p-4 font-medium">Order Taken</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && marketingResponses.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-500">Loading...</td></tr>
            ) : filteredResponses.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-500">No responses found match your filters.</td></tr>
            ) : (
              filteredResponses.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{new Date(r.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{r.time_of_visit}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{r.marketing_person_name || 'N/A'}</td>
                  <td className="p-4 font-medium text-gray-900">{r.doctor_shop_name}</td>
                  <td className="p-4 text-gray-600">{r.area}</td>
                  <td className="p-4">
                    {r.order_taken ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full border border-green-200">Yes</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedResponse(r)}
                        className="text-ayur-red hover:text-ayur-red/80 p-2 rounded hover:bg-red-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-gray-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors"
                        title="Delete Response"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing detailed response */}
      {selectedResponse && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 bg-black/60">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-antique-brown">Response Details</h3>
              <button 
                onClick={() => setSelectedResponse(null)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Marketing Person</p>
                  <p className="font-semibold text-gray-900">{selectedResponse.marketing_person_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Doctor / Shop name</p>
                  <p className="font-semibold text-gray-900">{selectedResponse.doctor_shop_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Area</p>
                  <p className="font-semibold text-gray-900">{selectedResponse.area}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Date & Time</p>
                  <p className="font-semibold text-gray-900">{new Date(selectedResponse.date).toLocaleDateString()} at {selectedResponse.time_of_visit}</p>
                </div>
              </div>

              {/* Status Management */}
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Current Status</p>
                  <select 
                    value={selectedResponse.status}
                    onChange={(e) => handleStatusUpdate(selectedResponse.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded font-medium focus:ring-2 focus:ring-ayur-red capitalize bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold capitalize ${getStatusColor(selectedResponse.status)}`}>
                  {selectedResponse.status}
                </div>
              </div>

              {/* Order Info */}
              <div>
                <p className="text-sm font-medium text-ayur-red mb-3 border-b border-cream-200 pb-2">Products Discussed</p>
                {selectedResponse.products_discussed?.length > 0 ? (
                  <div className="flex gap-2 flex-wrap text-sm">
                    {selectedResponse.products_discussed.map(p => (
                      <span key={p} className="px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm text-gray-700 font-medium">{p}</span>
                    ))}
                  </div>
                ) : <p className="text-gray-400 text-sm italic">None recorded</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-ayur-red mb-2 border-b border-cream-200 pb-2">Samples Given</p>
                  <p className="text-sm text-gray-800 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">{selectedResponse.samples_given || <span className="text-gray-400 italic font-normal">None</span>}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-ayur-red mb-2 border-b border-cream-200 pb-2">Order Taken</p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className={`text-sm font-bold inline-block px-3 py-1 rounded w-auto ${selectedResponse.order_taken ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                      {selectedResponse.order_taken ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>

              {selectedResponse.order_taken && selectedResponse.order_details?.length > 0 && (
                <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 shadow-sm">
                  <p className="text-sm font-bold text-antique-brown mb-4 uppercase tracking-wider">Order Items Required</p>
                  <ul className="space-y-3">
                    {selectedResponse.order_details.map((item, i) => (
                      <li key={i} className="flex justify-between items-center text-sm bg-white p-3 border border-orange-200/60 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-800">{item.product_name}</span>
                        <span className="font-bold px-3 py-1 bg-antique-brown/10 text-antique-brown rounded-md text-sm">Qty: {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Image & Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2 border-b pb-1">Live Photo Proof</p>
                  {selectedResponse.photo_proof_url ? (
                    <a href={selectedResponse.photo_proof_url} target="_blank" rel="noreferrer" className="block relative group overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                      <img src={selectedResponse.photo_proof_url} alt="Proof" className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                        <ExternalLink className="text-white w-8 h-8" />
                      </div>
                    </a>
                  ) : <p className="text-gray-400 text-sm italic">No image provided</p>}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2 border-b pb-1">Location</p>
                  {selectedResponse.location ? (
                    <div className="h-48 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                      <MapPin className="w-8 h-8 text-ayur-red mb-2" />
                      <p className="text-sm text-gray-700 font-medium mb-1">Location recorded</p>
                      <p className="text-xs text-gray-500 font-mono mb-3 bg-white p-2 rounded border border-gray-200">
                        LAT: {selectedResponse.location.latitude.toFixed(6)}<br/>
                        LNG: {selectedResponse.location.longitude.toFixed(6)}
                      </p>
                      <a 
                        href={`https://www.google.com/maps?q=${selectedResponse.location.latitude},${selectedResponse.location.longitude}`} 
                        target="_blank" rel="noreferrer"
                        className="text-xs font-bold text-ayur-red hover:text-ayur-red/80 hover:underline flex items-center gap-1 bg-red-50 px-3 py-2 rounded-full transition-colors"
                      >
                        Open in Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ) : <p className="text-gray-400 text-sm italic">No location captured</p>}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-5 border-t border-gray-100 flex justify-end bg-gray-50 shrink-0">
              <button 
                onClick={() => setSelectedResponse(null)}
                className="px-6 py-2.5 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-800 rounded-lg font-bold transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
