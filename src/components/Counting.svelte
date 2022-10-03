<script lang="ts">
	import type { Game } from '../data/types';
	import Teams from './Teams.svelte';

	export let game: Game;
	export let start: () => void;
</script>

<Teams {game} />

<button on:click={start}>Restart</button>
