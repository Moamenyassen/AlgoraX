/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#17142b",
                mist: "#f7f6fb",
                muted: "#5d5873",
                line: "#e3e0ec",
                violet: { DEFAULT: "#6a47dc", soft: "#a28bff" },
                teal: "#2fc4b4",
                reach: { DEFAULT: "#0f9c94", deep: "#0f3d47", night: "#10283a", glow: "#5fe0d2" },
                mindo: { DEFAULT: "#cc4f79", deep: "#4a1d36", night: "#2a1530", glow: "#ff9cb9", warm: "#fbf6f4" },
                amber: { DEFAULT: "#f2b66b", deep: "#e08a2e" },
                whatsapp: "#1f9d55",
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', '"Readex Pro"', 'system-ui', 'sans-serif'],
                sans: ['"Readex Pro"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
            },
            backgroundImage: {
                ribbon: "linear-gradient(100deg, #6a47dc 0%, #8a5ce6 35%, #3fb7c9 75%, #2fc4b4 100%)",
            },
        },
    },
    plugins: [],
}
