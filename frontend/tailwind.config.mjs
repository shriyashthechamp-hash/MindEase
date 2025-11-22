/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				pastel: {
					blue: '#AEC6CF',
					green: '#C1E1C1',
					lavender: '#E6E6FA',
					peach: '#FFDAB9',
					cream: '#FDFD96', // Very light yellow/cream, not bright
					text: '#4A4A4A', // Soft gray for text
				},
				primary: {
					DEFAULT: '#AEC6CF', // Pastel Blue
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#C1E1C1', // Pastel Green
					foreground: '#4A4A4A',
				},
				accent: {
					DEFAULT: '#E6E6FA', // Lavender
					foreground: '#4A4A4A',
				},
				background: '#F7F9FC', // Very light blue-ish gray
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				heading: ['Raleway', 'sans-serif'],
			},
			borderRadius: {
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'fade-in': 'fadeIn 0.5s ease-out forwards',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
		},
	},
	plugins: [],
}
