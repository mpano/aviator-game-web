/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337" },
        neon: { green:"#16a34a", blue:"#2563eb", purple:"#7c3aed", amber:"#f59e0b" }
      },
      boxShadow: { glow: "0 0 0 2px rgba(255,255,255,0.08), 0 6px 30px rgba(244, 63, 94, 0.25)" }
    }
  },
  plugins: []
}
