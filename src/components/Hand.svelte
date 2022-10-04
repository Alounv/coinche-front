<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName } from '../data/types';
	import CardImage from './Card.svelte';

	export let player: PlayerWithName;
	export let play: (card: Card) => void;
	export let canPlay: boolean;

	let selectedCard: Card | null = null;
	const handlePlay = () => {
		console.log('handlePlay');
		if (selectedCard) play(selectedCard);
	};
</script>

{selectedCard}

<form on:submit|preventDefault={handlePlay} disabled={!canPlay}>
	{#each player.Hand as card}
		<label>
			<CardImage {card} />
			<input type="radio" value={card} bind:group={selectedCard} />
		</label>
	{/each}
</form>
