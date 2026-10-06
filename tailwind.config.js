/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#22d3ee", // Cyan-400 (lighter, glossier cyan)
                secondary: "#a855f7", // Purple-500 (vibrant middle purple)
                accent: "#3b82f6", // Blue-500
                dark: "#020617", // Richer, darker blue-black background
                "dark-acc": "#0f172a", // Slate-900
            },
            fontFamily: {
                sans: ['Inter', 'IBM Plex Sans Arabic', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
