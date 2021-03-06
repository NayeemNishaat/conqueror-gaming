module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		container: {
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				xl: "0rem"
			},
			center: true
		},
		extend: {
			transitionProperty: {
				maxHeight: "max-height"
			}
		}
	},
	plugins: []
};
