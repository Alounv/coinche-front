<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName } from '../data/types';
	import CardImage from './Card.svelte';

	export let player: PlayerWithName;
	export let play: ((card: Card) => void) | null = null;
	export let canPlay = false;

	let selectedCard: Card | null = null;
	$: selectedIndex = selectedCard ? player.Hand.indexOf(selectedCard) : 0;

	const handlePlay = () => {
		console.log('handlePlay');
		if (selectedCard) play?.(selectedCard);
	};

	let form: HTMLFormElement;

	const onKeyDown = (e: KeyboardEvent) => {
		if (form.matches(':focus-within')) return;

		if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			(form?.children[selectedIndex] as HTMLInputElement)?.focus();
		}
	};
</script>

<div class="row flex-center">
	<form
		bind:this={form}
		class="row"
		on:submit|preventDefault={handlePlay}
		disabled={!canPlay || !play}
	>
		{#each player.Hand as card}
			<label class="label">
				<CardImage {card} />
				<input type="radio" value={card} bind:group={selectedCard} />
			</label>
		{/each}

		{#if play}
			<button class="margin btn-secondary" type="submit" disabled={!selectedCard || !canPlay}
				>Play</button
			>
		{/if}
	</form>

	{#if play}
		<div class="margin">
			Use <span class="badge">LEFT</span> / <span class="badge">RIGHT</span> to select a card then
			press
			<span class="badge secondary">ENTER</span> to play it.
		</div>
	{/if}
</div>

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

	.label > input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
</style>
