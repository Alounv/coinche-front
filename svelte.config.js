//import adapter from 'svelte-adapter-bun';
import preprocess from 'svelte-preprocess'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel({
			edge: false,
			external: [],
			split: false
		})
	},
	preprocess: preprocess()
}

export default config
