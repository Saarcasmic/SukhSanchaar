# CenteredCarousel Component

A modern, responsive auto-sliding image carousel with a prominently displayed center image and smaller side previews. The center image is significantly larger and visually highlighted with enhanced styling, while all images fill their containers completely.

## Features

- ✨ **Centered Focus Design**: Larger center image (38% width) with smaller side previews (22% each)
- 🎨 **Fully Responsive**: Adapts dynamically to container size using percentages
- 📐 **Scales for Large Screens**: Center image grows up to 750px on big screens, compact on mobile
- 🔄 **Auto-sliding**: Smooth automatic transitions between images
- 🎯 **No Fixed Pixels**: Uses relative sizing (percentages, flex) for perfect scaling
- ⚡ **Smooth Transitions**: 700ms ease-in-out animations
- 👆 **Interactive**: Click side images to navigate
- 📍 **Progress Indicators**: Clickable dots to jump to any slide
- 🎭 **Clean Captions**: Captions displayed below each image (not overlaid)
- 🖼️ **All Images Fill Containers**: Uses `object-cover` for all images - no white space

## Props

```typescript
interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  caption?: string; // Optional caption text
  year?: string; // Optional year/date label
}

interface CenteredCarouselProps {
  images: CarouselImage[]; // Array of images to display
  autoPlay?: boolean; // Enable auto-sliding (default: true)
  autoPlayInterval?: number; // Interval in ms (default: 4000)
  className?: string; // Additional CSS classes
}
```

## Usage

### Basic Usage

```tsx
import CenteredCarousel from "../components/CenteredCarousel";

const MyComponent = () => {
  const images = [
    {
      id: 1,
      src: "/image1.jpg",
      alt: "Image 1",
      caption: "Beautiful Landscape",
      year: "2023",
    },
    {
      id: 2,
      src: "/image2.jpg",
      alt: "Image 2",
      caption: "Mountain View",
    },
    // ... more images
  ];

  return (
    <CenteredCarousel images={images} autoPlay={true} autoPlayInterval={5000} />
  );
};
```

### Without Captions

```tsx
<CenteredCarousel
  images={[
    { id: 1, src: "/img1.jpg", alt: "Image 1" },
    { id: 2, src: "/img2.jpg", alt: "Image 2" },
    { id: 3, src: "/img3.jpg", alt: "Image 3" },
  ]}
/>
```

### Manual Control Only

```tsx
<CenteredCarousel images={images} autoPlay={false} />
```

### Custom Interval

```tsx
<CenteredCarousel
  images={images}
  autoPlay={true}
  autoPlayInterval={8000} // 8 seconds
/>
```

## Responsive Behavior

The carousel automatically adapts to different screen sizes:

- **Mobile (< 640px)**: Compact layout with smaller side previews
- **Tablet (640px - 1024px)**: Medium spacing and sizing
- **Desktop (> 1024px)**: Full layout with maximum dimensions

### Size Distribution

- **Center Image**: 38% width (max 750px, min 180px) - **Prominently featured**
- **Side Images**: 22% width each (max 450px, min 100px) - Preview size
- **Large Screens**: Center image can reach 750px for dramatic display
- **Small Screens**: Images scale down responsively while maintaining aspect ratio
- **Aspect Ratio**: 3:4 (133.33% padding-bottom) - portrait orientation
- **Object Fit**: All images use `object-cover` - fills entire container with no white space
- **Image Display**: Images are intelligently cropped to fit the container while maintaining aspect ratio

## Styling

The component uses Tailwind CSS classes and follows the SukhSanchaar design system:

- **Colors**:
  - `ayur-gold` for accents and highlights
  - `botanical-green` for decorative elements
  - `antique-brown` for indicators
- **Fonts**:
  - `font-playfair` for captions
  - `font-lora` for year labels

### Custom Styling

Add custom classes via the `className` prop:

```tsx
<CenteredCarousel images={images} className="my-8 max-w-6xl mx-auto" />
```

## Accessibility

- ✅ Proper `alt` attributes for all images
- ✅ `aria-label` for navigation dots
- ✅ Keyboard accessible indicators
- ✅ Smooth transitions for reduced motion users

## Performance

- 🚀 Lazy loading for side images
- ⚡ Eager loading for center image
- 🎯 Transition throttling to prevent rapid clicks
- 🔄 Efficient re-renders with React hooks

## Example: Current Implementation

See `/client/src/pages/AboutUsPage.tsx` for a real-world example:

```tsx
const historicalImages = [
  {
    id: 1,
    src: "company_2.jpeg",
    alt: "Traditional Ayurvedic Medicine Preparation",
    caption: "Traditional Medicine Preparation",
    year: "1890s",
  },
  // ... more images
];

<CenteredCarousel
  images={historicalImages}
  autoPlay={true}
  autoPlayInterval={5000}
/>;
```

## Tips

1. **Image Quality**: Use high-quality images (minimum 1000x1200px) for best results
2. **Aspect Ratio**:
   - All images should ideally be 3:4 portrait for best display without cropping
   - Images with different aspect ratios will be intelligently cropped to fit
3. **Number of Images**: Works with any number of images (minimum 3 for best effect)
4. **Loading Performance**: Center image is eager-loaded, side images are lazy-loaded
5. **Container Width**: Works best with full-width containers for maximum impact
6. **Image Display**: All images use `object-cover` to fill their containers completely
7. **No Hover Scaling**: Side images only change opacity on hover, no enlargement effect
8. **Center Image**: Can reach up to 750px on ultra-wide screens for dramatic effect

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Responsive design tested on all screen sizes
