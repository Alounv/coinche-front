//import adapter from 'svelte-adapter-bun';
import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: vercel({
			edge: false,
			external: [],
			split: false
		})
	}
};

export default config;
