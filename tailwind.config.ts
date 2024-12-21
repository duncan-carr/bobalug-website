import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'background': "#0F1108",
				"foreground-muted": "#666A86",
				"foreground": "#EAEBED",
				"accent": "#0FA691",
				"error": "#8E0000"
			},
			fontFamily: {
				titles: ["'Jersey 10'", "serif"],
				body: ["Open Sans", "sans-serif"]
			}
		}
	},

	plugins: [forms]
} satisfies Config;
