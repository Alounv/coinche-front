<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName } from '../data/types';
	import CardImage from './Card.svelte';
	import { fly } from 'svelte/transition';

	export let player: PlayerWithName;
	export let play: ((card: Card) => void) | null = null;
	export let canPlay = false;

	let selectedCard: Card | null = null;

	const handlePlay = () => {
		if (play && canPlay && selectedCard) play(selectedCard);
	};

	let form: HTMLFormElement;

	const focusCard = (card: Card): void => {
		const index = player.Hand.indexOf(card);
		const cardInput = form?.children[index] as HTMLInputElement;
		cardInput?.focus();
		selectedCard = card;
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (form.matches(':focus-within')) return;

		if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			selectedCard && focusCard(selectedCard);
		}
	};
</script>

<form bind:this={form} class="row" on:submit|preventDefault={handlePlay}>
	{#each player.Hand as card (card)}
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<label
			class="label"
			on:mouseover={() => focusCard(card)}
			on:mousedown={handlePlay}
			out:fly={{ y: -200 }}
		>
			<CardImage {card} />
			<input type="radio" value={card} bind:group={selectedCard} disabled={!play} />
		</label>
	{/each}
	<button type="submit" class="hidden-button" />
</form>

<svelte:window on:keydown={onKeyDown} />

<style>
	.hidden-button {
		opacity: 0;
		pointer-events: none;
		position: absolute;
	}

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
