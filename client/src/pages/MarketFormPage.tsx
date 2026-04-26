import React, { useState, useEffect, useRef } from "react";
import { Camera, MapPin, Send, Plus, Trash2 } from "lucide-react";

export interface MarketingProduct {
  id: string;
  name: string;
  is_active: boolean;
  created_at?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

const MarketFormPage: React.FC = () => {
  const [productsList, setProductsList] = useState<MarketingProduct[]>([]);
  const [teamList, setTeamList] = useState<{id: string; name: string; is_active: boolean}[]>([]);
  
  // Form State
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [timeOfVisit, setTimeOfVisit] = useState<string>(
    new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
  );
  const [doctorShopName, setDoctorShopName] = useState("");
  const [area, setArea] = useState("");
  const [productsDiscussed, setProductsDiscussed] = useState<string[]>([]);
  const [samplesGiven, setSamplesGiven] = useState("");
  const [marketingPersonName, setMarketingPersonName] = useState("");
  const [orderTaken, setOrderTaken] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ product_name: string; quantity: number | string }[]>([]);
  const [photoProofBase64, setPhotoProofBase64] = useState<string>("");
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
    fetchTeam();
    getLocation();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/marketing/products`);
      if (response.ok) {
        const data = await response.json();
        setProductsList(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch marketing products", err);
    }
  };

  const fetchTeam = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/marketing/team`);
      if (response.ok) {
        const data = await response.json();
        setTeamList(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch marketing team", err);
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Location error", error);
        }
      );
    }
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoProofBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrderItem = () => {
    setOrderDetails([...orderDetails, { product_name: "", quantity: 1 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorShopName || !area || !photoProofBase64) {
      setError("Please fill in required fields including a live photo proof.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/marketing/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time_of_visit: timeOfVisit,
          marketing_person_name: marketingPersonName,
          doctor_shop_name: doctorShopName,
          area,
          products_discussed: productsDiscussed,
          samples_given: samplesGiven,
          order_taken: orderTaken,
          order_details: orderTaken ? orderDetails : [],
          photo_proof_base64: photoProofBase64,
          location: location,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitSuccess(true);
      // Reset form
      setMarketingPersonName("");
      setDoctorShopName("");
      setArea("");
      setProductsDiscussed([]);
      setSamplesGiven("");
      setOrderTaken(false);
      setOrderDetails([]);
      setPhotoProofBase64("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Automatically refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const areaOptions = [
    "Mathura City",
    "Vrindavan",
    "Kosi Kalan",
    "Goverdhan, Ading, Jajampatti",
    "Raya, Maat, Tentigaon",
    "Chaumua, Chaata, Shergadh",
    "Sonkh, sonkh road, Panchawar",
    "Baldev, Mahawan",
    "Farah",
    "Other"
  ];

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-playfair text-antique-brown mb-2">Form Submitted</h2>
          <p className="text-gray-600 mb-6">Your marketing response was successfully recorded.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-ayur-red text-white px-6 py-2 rounded-lg font-medium hover:bg-ayur-red/90 transition-colors w-full"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 sm:pt-32">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-cream-200">
        <div className="bg-antique-brown p-6 sm:p-8 text-cream-50">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold">Marketing Report</h1>
          <p className="text-cream-200 mt-2 font-noto">Log your daily visits and orders.</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          onInvalid={(e) => {
            const form = e.currentTarget;
            const firstInvalid = form.querySelector(':invalid') as HTMLElement;
            if (firstInvalid && firstInvalid === e.target) {
              if (firstInvalid.type === 'file') {
                firstInvalid.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              firstInvalid.focus();
            }
          }}
          className="p-6 sm:p-8 space-y-6"
        >
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time of Visit *</label>
              <input
                type="time"
                required
                value={timeOfVisit}
                onChange={(e) => setTimeOfVisit(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marketing Person Name *</label>
            <select
              required
              value={marketingPersonName}
              onChange={(e) => setMarketingPersonName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
            >
              <option value="">Select Your Name</option>
              {teamList.filter(t => t.is_active).map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor / Shop Name *</label>
            <input
              type="text"
              required
              value={doctorShopName}
              onChange={(e) => setDoctorShopName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area *</label>
            <select
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
            >
              <option value="">Select Area</option>
              {areaOptions.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Products Discussed</label>
            <div className="flex flex-wrap gap-2 text-sm">
              {productsList.filter(p => p.is_active).map(product => (
                <label key={product.id} className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-all ${productsDiscussed.includes(product.name) ? 'bg-ayur-red text-white border-ayur-red shadow-md font-medium' : 'hover:bg-gray-50 bg-white text-gray-700 border-gray-300'}`}>
                  <input
                    type="checkbox"
                    checked={productsDiscussed.includes(product.name)}
                    onChange={(e) => {
                      if (e.target.checked) setProductsDiscussed([...productsDiscussed, product.name]);
                      else setProductsDiscussed(productsDiscussed.filter(p => p !== product.name));
                    }}
                    className="hidden"
                  />
                  <span>{product.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Samples Given</label>
            <input
              type="text"
              value={samplesGiven}
              onChange={(e) => setSamplesGiven(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ayur-red"
              placeholder="e.g. 2 x Syrup"
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Did you take an order? *</label>
              <div className="flex bg-gray-100/80 p-1.5 rounded-xl border border-gray-200 shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    setOrderTaken(false);
                    setOrderDetails([]); // clear order details if they switch to No
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-[15px] transition-all duration-200 flex items-center justify-center gap-2 ${!orderTaken ? 'bg-white text-gray-800 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
                >
                  No Order
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOrderTaken(true);
                    if (orderDetails.length === 0) setOrderDetails([{ product_name: "", quantity: 1 }]);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-[15px] transition-all duration-200 flex items-center justify-center gap-2 ${orderTaken ? 'bg-green-500 text-white shadow ring-2 ring-green-500/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
                >
                  Yes, Order Taken
                </button>
              </div>
            </div>

            {orderTaken && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
                {orderDetails.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <select
                      value={item.product_name}
                      onChange={(e) => {
                        const newDetails = [...orderDetails];
                        newDetails[index].product_name = e.target.value;
                        setOrderDetails(newDetails);
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                      required
                    >
                      <option value="">Select Product</option>
                      {productsList.filter(p => p.is_active).map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => {
                        const newDetails = [...orderDetails];
                        newDetails[index].quantity = e.target.value === "" ? "" : parseInt(e.target.value) || 1;
                        setOrderDetails(newDetails);
                      }}
                      className="w-20 p-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Qty"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setOrderDetails(orderDetails.filter((_, i) => i !== index));
                      }}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={handleAddOrderItem}
                  className="text-sm flex items-center text-ayur-red font-medium hover:text-ayur-red/80"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Product
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Live Photo Proof *</label>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative overflow-hidden">
              {photoProofBase64 ? (
                <img src={photoProofBase64} alt="Proof" className="max-h-64 object-contain rounded-lg shadow-sm" />
              ) : (
                <div className="text-center text-gray-500">
                  <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Tap to open camera</p>
                </div>
              )}
              {/* `capture="environment"` strictly opens rear camera automatically reducing gallery spoofing */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                required={!photoProofBase64}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {location && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
              <MapPin className="w-4 h-4" />
              <span>Location captured: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
            </div>
          )}
          {!location && (
            <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
              <MapPin className="w-4 h-4" />
              <span>Fetching location... Ensure location permissions are granted.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 sm:py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-ayur-red hover:bg-ayur-red/90 shadow-md"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarketFormPage;
