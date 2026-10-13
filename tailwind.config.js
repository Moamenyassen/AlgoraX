/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                // Midnight base
                night: { DEFAULT: "#07061a", 2: "#0c0a24", 3: "#13102f" },
                fog: "#b9b4d6",
                dim: "#8a85a8",
                // Brand ribbon (from the logo)
                violet: { DEFAULT: "#7c5cff", soft: "#a594ff" },
                cyan: "#22d3ee",
                teal: "#2fe0c4",
                // Products
                reach: { DEFAULT: "#2fe0c4", deep: "#073b44" },
                mindo: { DEFAULT: "#ff5c93", deep: "#3d0f2a", amber: "#ffb35c" },
                whatsapp: "#25d366",
            },
            fontFamily: {
                display: ['"Bricolage Grotesque"', '"Readex Pro"', 'system-ui', 'sans-serif'],
                sans: ['"Readex Pro"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
            },
            backgroundImage: {
                ribbon: "linear-gradient(100deg, #7c5cff 0%, #a26bff 30%, #22d3ee 70%, #2fe0c4 100%)",
                "ribbon-warm": "linear-gradient(100deg, #7c5cff 0%, #ff5c93 60%, #ffb35c 100%)",
            },
        },
    },
    plugins: [],
}
