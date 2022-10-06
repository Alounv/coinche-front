<script lang="ts">
	import type { Card } from '../data/enums';
	import CardImage from './Card.svelte';

	export let hand: Card[];
	export let isVertical = false;
</script>

<div style="display: flex; flex-direction: {isVertical ? 'column' : 'row'}">
	{#each hand as _card}
		<div class={isVertical ? 'horizontal-card' : 'vertical-card'}>
			<CardImage />
		</div>
	{/each}
</div>

<style>
	.vertical-card {
		margin-left: -5rem;
		width: 6rem;
		height: 8rem;
	}

	.vertical-card:first-child {
		margin-left: 0;
	}

	.horizontal-card {
		margin-top: -5rem;
		width: 8rem;
		height: 6rem;
	}

	.horizontal-card:first-child {
		margin-top: 0;
	}
</style>
