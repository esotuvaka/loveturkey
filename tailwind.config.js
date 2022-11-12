/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'barlow': ['Barlow Condensed'],
			},
			colors: {
				'ltred': '#dc0b17',
			},
		},
	},
	plugins: [],
};
