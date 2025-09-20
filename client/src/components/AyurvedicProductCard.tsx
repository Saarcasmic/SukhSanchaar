import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Button } from '../ui/button'

interface AyurvedicProductCardProps {
  id: string
  name: string
  tagline: string
  price: number
  mrp?: number
  image: string
  onBuyNow: (id: string) => void
}

export function AyurvedicProductCard({ id, name, tagline, price, mrp, image, onBuyNow }: AyurvedicProductCardProps) {
  const hasDiscount = mrp && mrp > price

  return (
    <div className="group bg-white backdrop-blur-sm rounded-xl border border-amber-200/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      {/* Ornamental corners */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-amber-300/60 rounded-tl-lg"></div>
      <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-amber-300/60 rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-amber-300/60 rounded-bl-lg"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-amber-300/60 rounded-br-lg"></div>
      
      {/* Product Image */}
      <div className="relative p-6 flex justify-center">
        <div className="relative w-48 h-48 rounded-lg border-2 border-amber-200/60 overflow-hidden shadow-inner bg-gradient-to-br from-amber-50 to-orange-50">
          <ImageWithFallback 
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {/* Vintage frame overlay */}
          <div className="absolute inset-0 rounded-lg shadow-inner border border-amber-300/30"></div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-6 pb-6 text-center space-y-3">
        {/* Product Name - Serif font for heritage */}
        <h3 className="text-lg font-medium text-amber-900" style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}>
          {name}
        </h3>
        
        {/* Tagline */}
        <p className="text-sm text-amber-700/80 italic">
          {tagline}
        </p>
        
        {/* Pricing */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-semibold text-amber-900">
            ₹{price}
          </span>
          {hasDiscount && (
            <span className="text-sm text-amber-600/60 line-through">
              ₹{mrp}
            </span>
          )}
        </div>
        
        {/* Buy Now Button */}
        <Button
          onClick={() => onBuyNow(id)}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full py-2.5 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg font-medium"
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}