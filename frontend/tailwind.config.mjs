/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				pastel: {
					peach: '#FF9EAA',       // More vibrant peach/pink
					'peach-dark': '#FF7F94',
					lavender: '#C3B1E1',    // Deeper lavender
					'lavender-dark': '#A78BFA',
					aqua: '#7FDBFF',        // Brighter aqua
					'aqua-dark': '#39C0ED',
					mint: '#77DD77',        // Pastel green but stronger
					'mint-dark': '#4CAF50',
					yellow: '#FDFD96',      // Brighter yellow
					'yellow-dark': '#F0E68C',
					text: '#2D3748',
				},
				primary: {
					DEFAULT: '#FFB7C5', // Peach as primary
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#AFEEEE', // Aqua as secondary
					foreground: '#4A4A4A',
				},
				accent: {
					DEFAULT: '#D8BFD8', // Lavender as accent
					foreground: '#4A4A4A',
				},
				background: '#FDFCF0', // Very warm off-white/cream
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				heading: ['Raleway', 'sans-serif'],
			},
			borderRadius: {
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
				'4xl': '2.5rem',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'float-delayed': 'float 6s ease-in-out 3s infinite',
				'fade-in': 'fadeIn 0.8s ease-out forwards',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'blob': 'blob 10s infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				blob: {
					'0%': { transform: 'translate(0px, 0px) scale(1)' },
					'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' },
				},
				glow: {
					'from': { boxShadow: '0 0 10px -10px #FFB7C5' },
					'to': { boxShadow: '0 0 20px 5px #FFB7C5' }
				}
			},
			backgroundImage: {
				'gradient-zen': 'linear-gradient(135deg, #FFD1DC 0%, #E6E6FA 50%, #E0FFFF 100%)',
				'gradient-warm': 'linear-gradient(135deg, #FFFACD 0%, #FFD1DC 100%)',
				'gradient-cool': 'linear-gradient(135deg, #E0FFFF 0%, #E6E6FA 100%)',
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
				'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
				'glow': '0 0 20px rgba(255, 183, 197, 0.6)',
			}
		},
	},
	plugins: [],
}
