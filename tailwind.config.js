/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'system-ui', 'sans-serif'],
                heading: ['Playfair Display', 'serif'],
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                border: 'var(--border)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'blur-in': 'blurFadeIn 0.4s ease-out forwards',
                'blur-out': 'blurFadeOut 0.7s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                blurFadeIn: {
                    'from': { opacity: '0', filter: 'blur(8px)' },
                    'to': { opacity: '1', filter: 'blur(0)' },
                },
                blurFadeOut: {
                    'from': { opacity: '1', filter: 'blur(0)' },
                    'to': { opacity: '0', filter: 'blur(8px)', visibility: 'hidden' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
}
