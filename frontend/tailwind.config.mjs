/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Neobrutalist color palette - bold and vibrant
				brutal: {
					yellow: '#FFEB3B',
					pink: '#FF006E',
					blue: '#00B4D8',
					green: '#06FFA5',
					purple: '#9D4EDD',
					orange: '#FF6B35',
					red: '#EF476F',
					black: '#000000',
					white: '#FFFFFF',
					cream: '#FFF8E7',
				},
			},
			fontFamily: {
				sans: ['Space Grotesk', 'Poppins', 'sans-serif'],
				heading: ['Space Grotesk', 'Raleway', 'sans-serif'],
				mono: ['Space Mono', 'monospace'],
			},
			boxShadow: {
				// Neobrutalist hard shadows (no blur)
				'brutal': '4px 4px 0px 0px #000000',
				'brutal-sm': '2px 2px 0px 0px #000000',
				'brutal-lg': '6px 6px 0px 0px #000000',
				'brutal-xl': '8px 8px 0px 0px #000000',
				'brutal-pink': '6px 6px 0px 0px #FF006E',
				'brutal-blue': '6px 6px 0px 0px #00B4D8',
				'brutal-green': '6px 6px 0px 0px #06FFA5',
				'brutal-yellow': '6px 6px 0px 0px #FFEB3B',
			},
			borderWidth: {
				'3': '3px',
				'4': '4px',
				'5': '5px',
			},
			animation: {
				'wiggle': 'wiggle 0.5s ease-in-out',
				'shake': 'shake 0.5s ease-in-out',
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' },
				},
				shake: {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-4px)' },
					'75%': { transform: 'translateX(4px)' },
				},
			},
		},
	},
	plugins: [],
};
