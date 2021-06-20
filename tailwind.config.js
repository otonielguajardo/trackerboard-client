module.exports = {
	purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				gray: {
					'100': '#F8F9FA',
					'200': '#E9EEF2'
				},
			},
			animation: {
				'spin-in': 'spin-in 0.1s ease-out 1',
				'spin-out': 'spin-out 0.1s ease-out 1',
				'fade-in': 'fade-in 0.1s ease-out 1',
				'fade-out': 'fade-out 0.1s ease-out 1 forwards',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0%', },
					'100%': { opacity: '100%' },
				},
				'fade-out': {
					'0%': { opacity: '100%' },
					'100%': { opacity: '0%' },
				},
				'spin-in': {
					'0%': { transform: 'rotate(60deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
				'spin-out': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(90deg)' },
				}
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
