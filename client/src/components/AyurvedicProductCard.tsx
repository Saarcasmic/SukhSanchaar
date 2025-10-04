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
    <div className="group bg-white px-1 pt-1 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-gray-100 flex flex-col h-full ">
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Rating Badge */}
      </div>

      {/* <div className="w-full h-px bg-black my-2 "></div> */}

      {/* Product Info */}
      <div className="p-3 lg:p-4 space-y-2 lg:space-y-3 flex flex-col flex-grow">
        {/* Category Tag */}

        {/* Target Audience */}
        <p className="text-orange-600 text-xs lg:text-sm font-medium">{name === "Sudha Sindhu" ? "Pack of 6" : "Pack of 3"}</p>

        {/* Product Name - Fixed height with ellipsis */}
        <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-tight h-10 lg:h-12 overflow-hidden">
          <span className="line-clamp-2">{name}</span>
        </h3>

        {/* Description - Fixed height */}
        <p className="text-xs lg:text-sm text-gray-600 h-6 lg:h-8 overflow-hidden">
          <span className="line-clamp-2">Description will come here</span>
        </p>

        {/* Spacer to push pricing and button to bottom */}
        <div className="flex-grow"></div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-xl lg:text-2xl font-bold text-gray-900">₹{price}</span>
          {hasDiscount && (
            <span className="text-xs lg:text-sm text-gray-500 line-through">₹{mrp}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => onBuyNow(id)}
            className="w-full bg-ayur-red hover:bg-gray-800 text-white py-2 lg:py-3 transition-all duration-200 hover:shadow-lg font-medium text-xs lg:text-sm"
          >
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}
