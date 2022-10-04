<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName } from '../data/types';
	import CardImage from './Card.svelte';

	export let player: PlayerWithName;
	export let play: (card: Card) => void;
	export let canPlay: boolean;

	let selectedCard: Card | null = null;
	$: selectedIndex = selectedCard ? player.Hand.indexOf(selectedCard) : 0;

	const handlePlay = () => {
		console.log('handlePlay');
		if (selectedCard) play(selectedCard);
	};

	let form: HTMLFormElement;

	const onKeyDown = (e: KeyboardEvent) => {
		if (form.matches(':focus-within')) return;

		if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			(form?.children[selectedIndex] as HTMLInputElement)?.focus();
		}
	};
</script>

{selectedCard}

<form
	bind:this={form}
	class="row flex-center"
	on:submit|preventDefault={handlePlay}
	disabled={!canPlay}
>
	{#each player.Hand as card}
		<label class="label">
			<CardImage {card} />
			<input type="radio" value={card} bind:group={selectedCard} />
		</label>
	{/each}

	<button class="margin" type="submit" disabled={!selectedCard}>Play</button>

	<div class="margin">
		Use <span class="badge">LEFT</span> / <span class="badge">RIGHT</span> to select a card then
		press
		<span class="badge secondary">ENTER</span> to play it.
	</div>
</form>

<svelte:window on:keydown={onKeyDown} />

<style>
	.label {
		position: relative;
		transition: all 0.2s ease-in-out;
		margin-left: -8rem;
	}

	.label:focus-within {
		transform: translateY(-4rem);
		margin-right: 4rem;
		margin-left: -7rem;
	}

	.label:first-child {
		margin-left: 0;
	}

	.label input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
</style>
