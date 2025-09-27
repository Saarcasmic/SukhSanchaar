/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ayur-red": "#D63A2C",
        "ayur-red-dark": "#B8291F",
        "ayur-red-light": "#E85A4F",
        cream: {
          50: "#FBEAC2",
          100: "#F6F1E6",
          200: "#F5EDE0",
          300: "#F3E8D6",
          400: "#F0E2C7",
          500: "#EDD9B4",
        },
        "ayur-gold": "#C9A66B",
        "ayur-gold-dark": "#B8956A",
        "ayur-gold-light": "#D4B577",
        "botanical-green": "#254A33",
        "botanical-green-dark": "#1A3426",
        "botanical-green-light": "#2F5A3F",
        "antique-brown": "#5A3C2E",
        "antique-brown-dark": "#4A3025",
        "antique-brown-light": "#6B4A3A",
        "heritage-gold": "#D4AF37",
        "vintage-beige": "#F5F5DC",
        "aged-paper": "#F4F1E8",
        "dark-grey": "var(--dark-grey)",
        "light-grey": "var(--light-grey)",
        "primarygrey-6": "var(--primarygrey-6)",
        red: "var(--red)",
        white: "var(--white)",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        lora: ["Lora", "serif"],
        noto: ["Noto Sans", "sans-serif"],
      },
      backgroundImage: {
        parchment:
          'url(\'data:image/svg+xml,<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="parchment" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="%23F4F1E8" opacity="0.3"/><circle cx="10" cy="10" r="1" fill="%23D4AF37" opacity="0.1"/><circle cx="30" cy="20" r="0.5" fill="%23B8956A" opacity="0.15"/><circle cx="20" cy="35" r="1.5" fill="%23C9A66B" opacity="0.08"/><path d="M5 5L35 35M35 5L5 35" stroke="%23EDD9B4" stroke-width="0.2" opacity="0.1"/></pattern></defs><rect width="120" height="120" fill="url(%23parchment)"/></svg>\')',
        botanical:
          'url(\'data:image/svg+xml,<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="botanical" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><g fill="%23254A33" opacity="0.06"><path d="M50 20c-8 0-15 7-15 15 0 13 15 35 15 35s15-22 15-35c0-8-7-15-15-15zm0 20c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z"/><path d="M20 50c0-8 7-15 15-15 13 0 35 15 35 15s-22 15-35 15c-8 0-15-7-15-15zm20 0c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z"/><circle cx="80" cy="80" r="3" fill="%23C9A66B" opacity="0.4"/><path d="M10 10c5 0 10 5 10 10s-5 10-10 10-10-5-10-10 5-10 10-10z" fill="none" stroke="%23D4AF37" stroke-width="0.5" opacity="0.3"/></g></pattern></defs><rect width="200" height="200" fill="url(%23botanical)"/></svg>\')',
        "vintage-paper":
          'url(\'data:image/svg+xml,<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="vintage" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="%23F5F5DC" opacity="0.4"/><circle cx="5" cy="5" r="0.5" fill="%23D4AF37" opacity="0.2"/><circle cx="15" cy="15" r="0.3" fill="%23C9A66B" opacity="0.15"/><path d="M0 10h20M10 0v20" stroke="%23EDD9B4" stroke-width="0.1" opacity="0.1"/></pattern></defs><rect width="80" height="80" fill="url(%23vintage)"/></svg>\')',
        "ayurveda-texture":
          'url(\'data:image/svg+xml,<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="ayurveda" x="0" y="0" width="75" height="75" patternUnits="userSpaceOnUse"><rect width="75" height="75" fill="%23F4F1E8" opacity="0.2"/><g fill="%23254A33" opacity="0.08"><path d="M37.5 15c-6 0-11 5-11 11 0 10 11 26 11 26s11-16 11-26c0-6-5-11-11-11zm0 15c-2 0-4-2-4-4s2-4 4-4 4 2 4 4-2 4-4 4z"/><circle cx="15" cy="60" r="2" fill="%23D4AF37" opacity="0.3"/><circle cx="60" cy="15" r="1.5" fill="%23C9A66B" opacity="0.25"/><path d="M0 37.5h75M37.5 0v75" stroke="%23EDD9B4" stroke-width="0.2" opacity="0.1"/></g></pattern></defs><rect width="150" height="150" fill="url(%23ayurveda)"/></svg>\')',
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-gentle": "pulseGentle 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 175, 55, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.6)" },
        },
        pulseGentle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
