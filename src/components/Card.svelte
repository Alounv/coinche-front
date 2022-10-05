<script lang="ts">
	import type { Card } from '../data/enums';
	import { cardImages } from '../utils/image';

	export let card: Card | null = null;

	const deg = Math.floor(Math.random() * 6) - 3;
</script>

{#if card}
	<img
		class="shadow shadow-hover padding-small"
		style="transform: rotate({deg}deg); background-color: white;"
		src={cardImages[card]}
		alt={card}
	/>
{:else}
	<div
		class="shadow shadow-hover padding-small border background-primary"
		style="transform: rotate({deg}deg);  width: 100%; height: 100%;"
	/>
{/if}
