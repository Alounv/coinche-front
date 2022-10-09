<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName } from '../data/types';
	import CardImage from './Card.svelte';
	import { fly } from 'svelte/transition';
	import { getSortedCards } from '../utils/game';

	export let player: PlayerWithName;
	export let play: ((card: Card) => void) | null = null;
	export let isPlayerTurn = false;

	$: canPlay = isPlayerTurn && play !== null;

	let selectedCard: Card | null = null;
	let form: HTMLFormElement;

	$: cards = getSortedCards(player.Hand);

	$: {
		if (selectedCard && !player.Hand.includes(selectedCard)) {
			selectedCard = null;
		}
	}

	const getCardInput = (card: Card): HTMLInputElement => {
		const index = player.Hand.indexOf(card);
		const cardLabel = form?.children[index] as HTMLLabelElement;
		return cardLabel?.children[1] as HTMLInputElement;
	};

	const getIsSelectedCardFocused = (): boolean => {
		if (selectedCard) {
			const cardInput = getCardInput(selectedCard);
			return cardInput === document.activeElement;
		}
		return false;
	};

	const blurSelectedCard = (): void => {
		if (!selectedCard) return;
		const cardInput = getCardInput(selectedCard);
		cardInput.blur();
	};

	const handlePlay = () => {
		if (canPlay && play && selectedCard) {
			if (getIsSelectedCardFocused()) {
				play(selectedCard);
			}
		}
		blurSelectedCard();
	};

	const focusCard = (card: Card): void => {
		const cardInput = getCardInput(card);
		cardInput?.focus();
		selectedCard = card;
	};

	const onKeyDown = (e: KeyboardEvent) => {
		const isSubmit = ['Enter', 'Backspace'].includes(e.key);
		const isArrow = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(e.key);
		const isFocused = form?.matches(':focus-within');

		if (isArrow && !isFocused) {
			if (selectedCard) {
				focusCard(selectedCard);
			} else {
				focusCard(player.Hand[0]);
			}
		}

		if (isFocused && !isSubmit && !isArrow) blurSelectedCard();
	};

	const handleClick = (card: Card) => {
		const isFocused = form?.matches(':focus-within');
		if (selectedCard === card && isFocused) {
			blurSelectedCard();
		} else {
			focusCard(card);
		}
	};
</script>

<form
	style="min-height: 11rem;"
	bind:this={form}
	class="row margin flex-center"
	on:submit|preventDefault={handlePlay}
>
	{#each cards as card (card)}
		<!-- the on:mousedown|preventDefault prevents the blur just before the click -->
		<label
			class="label"
			on:click|preventDefault={() => handleClick(card)}
			on:mousedown|preventDefault
			out:fly={{ y: -200 }}
		>
			<CardImage {card} />
			<input type="radio" value={card} bind:group={selectedCard} />
		</label>
	{/each}
	<button
		disabled={!selectedCard}
		type="submit"
		style="margin-left: 1rem"
		class={!canPlay ? 'hidden-button' : ''}>Play</button
	>
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
