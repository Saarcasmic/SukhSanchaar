import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";

interface AyurvedicProductCardProps {
  id: string;
  name: string;
  tagline: string;
  price: number;
  mrp?: number;
  image: string;
  onBuyNow: (id: string) => void;
}

export function AyurvedicProductCard({
  id,
  name,
  tagline,
  price,
  mrp,
  image,
  onBuyNow,
}: AyurvedicProductCardProps) {
  const hasDiscount = mrp && mrp > price;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-gray-100">
      {/* Product Image */}
      <div className="relative h-[320px] bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Rating Badge */}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category Tag */}

        {/* Target Audience */}
        <p className="text-orange-600 text-sm font-medium">Pack of 2</p>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600">Description will come here</p>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">₹{price}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">₹{mrp}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => onBuyNow(id)}
            className="w-72 bg-ayur-red hover:bg-gray-800 text-white rounded-xl py-3 transition-all duration-200 hover:shadow-lg font-medium text-sm"
          >
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}
