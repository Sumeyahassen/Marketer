# Marketer
first install the folling depandensy
# Core & Routing
npm install react-router-dom@6

# UI Components (beautiful & ready-made)
npm install @headlessui/react @heroicons/react
npm install daisyui   # ← best with Tailwind, gives ready cards/buttons

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# State Management (optional but recommended)
npm install zustand       # simple & fast
# OR npm install redux @reduxjs/toolkit react-redux   # if you prefer Redux

# API Calls
npm install axios

# Date & Time
npm install date-fns

# Charts (for Reports page)
npm install recharts
# Toast Notifications
npm install react-hot-toast
# Icons (extra)
npm install lucide-react
# File Upload (drag & drop)
npm install react-dropzone

#than tailwind.config.js file to modifay in this form
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}



