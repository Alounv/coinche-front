<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName } from '../data/types';
	import CardImage from './Card.svelte';
	import { fly } from 'svelte/transition';

	export let player: PlayerWithName;
	export let play: ((card: Card) => void) | null = null;
	export let canPlay = false;

	let selectedCard: Card | null = null;

	$: {
		if (selectedCard && !player.Hand.includes(selectedCard)) {
			selectedCard = null;
		}
	}

	const reset = () => {
		selectedCard = null;
		document?.activeElement.blur();
	};

	const handlePlay = () => {
		if (play && canPlay && selectedCard) play(selectedCard);
		reset();
	};

	let form: HTMLFormElement;

	const focusCard = (card: Card): void => {
		const index = player.Hand.indexOf(card);
		const cardInput = form?.children[index] as HTMLInputElement;
		cardInput?.focus();
		selectedCard = card;
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (form.matches(':focus-within')) {
			if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
				return;
			}
			if (canPlay && play && ['Backspace', 'Enter'].includes(e.key)) {
				return;
			}

			reset();
			return;
		}

		if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			if (selectedCard) {
				focusCard(selectedCard);
			} else {
				focusCard(player.Hand[0]);
			}
		}
	};
</script>

<form
	style="min-height: 11rem;"
	bind:this={form}
	class="row margin flex-center"
	on:submit|preventDefault={handlePlay}
>
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

<slot />

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
		margin-left: -6rem;
		width: 8rem;
	}

	.label:focus-within {
		transform: translateY(-2rem);
		margin-right: 2rem;
		margin-left: -5rem;
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
