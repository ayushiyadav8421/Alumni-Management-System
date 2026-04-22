/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'university-green': 'var(--uni-green)',
        'university-olive': 'var(--uni-olive)',
        'university-gold': 'var(--uni-gold)',
        
        'theme-bg': 'var(--bg-main)',
        'theme-section': 'var(--bg-section)',
        'theme-card': 'var(--bg-card)',
        'theme-text': 'var(--text-main)',
        'theme-muted': 'var(--text-muted)',
        'theme-border': 'var(--border-color)',
      }
    },
  },
  plugins: [],
}
