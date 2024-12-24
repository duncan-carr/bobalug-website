import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'background': "#0F1108",
				"foreground-muted": "#8E8C99",
				"foreground": "#EAEBED",
				"accent": "#0FA691",
				"error": "#8E0000",
				"blurple": "#5865F2",
				"discord": "#2c2f33"
			},
			fontFamily: {
				titles: ["New Amsterdam", "serif"],
				body: ["Funnel Sans", "sans-serif"]
			}
		}
	},

	plugins: [forms]
} satisfies Config;
