/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

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
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
