import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";

interface AyurvedicProductCardProps {
  id: string;
  name: string;
  tagline: string;
  price: number;
  mrp?: number;
  image: string;
  pack_details: string;
  onBuyNow: (id: string) => void;
}

export function AyurvedicProductCard({
  id,
  name,
  tagline,
  price,
  mrp,
  image,
  pack_details,
  onBuyNow,
}: AyurvedicProductCardProps) {
  const hasDiscount = mrp && mrp > price;

  return (
    <div className="group bg-white px-1 pt-1 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-gray-100 flex flex-col h-full ">
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={`${name} - Authentic Ayurvedic Product by Sukh Sancharak Co.`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />

        {/* Rating Badge */}
      </div>

      {/* <div className="w-full h-px bg-black my-2 "></div> */}

      {/* Product Info */}
      <div className="p-3 lg:p-4 flex flex-col flex-grow">
        {/* Category Tag */}
        <p className="text-orange-600 text-xs lg:text-sm font-medium mb-1">
          {`Pack of ${pack_details}`}
        </p>

        {/* Product Name and Tagline - tightly grouped */}
        <div className="mb-1">
          <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-tight h-10 lg:h-6 overflow-hidden mb-1">
            <span className="line-clamp-2">{name}</span>
          </h3>
          <p className="text-xs lg:text-sm text-gray-600 h-8 lg:h-11 overflow-hidden mt-2">
            <span className="line-clamp-2">
              {/* Tagline with ellipsis at the end of the second line */}
              {tagline}
            </span>
          </p>
        </div>

        {/* Spacer to push pricing and button to bottom */}
        <div className="flex-grow"></div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-xl lg:text-2xl font-bold text-gray-900">
            ₹{price}
          </span>
          {hasDiscount && (
            <span className="text-xs lg:text-sm text-gray-500 line-through">
              ₹{mrp}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="flex justify-center mt-1">
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
