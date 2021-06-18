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
				'spin-in': 'spin-in 0.1s linear 1',
				'spin-out': 'spin-out 0.1s linear 1',
			},
			keyframes: {
				'spin-in': {
					'0%': { transform: 'rotate(90deg)' },
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
