<script lang="ts">
	import type { Card } from '../data/enums';
	import CardImage from './Card.svelte';

	export let hand: Card[];
	export let isVertical = false;
</script>

{#if hand.length}
	<div style="flex-direction: {isVertical ? 'column' : 'row'}" class="container">
		{#each hand as _card}
			<div class={isVertical ? 'horizontal-card' : 'vertical-card'}>
				<CardImage />
			</div>
		{/each}
	</div>
{/if}

<style>
	.container {
		display: none;
	}

	@media only screen and (min-width: 500px) {
		.container {
			display: flex;
			flex-direction: row;
			justify-content: center;
		}
	}

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
