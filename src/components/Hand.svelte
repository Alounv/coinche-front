<script lang="ts">
	import type { BidColors, Card } from '../data/enums'
	import CardImage from './Card.svelte'
	import type { PlayerWithName } from '../data/types'
	import { fly } from 'svelte/transition'
	import { getSortedCards } from '../utils/game'

	export let player: PlayerWithName
	export let play: ((card: Card) => void) | null = null
	export let isPlayerTurn = false
	export let trump: BidColors

	$: canPlay = isPlayerTurn && play !== null

	let selectedCard: Card | null = null
	let form: HTMLFormElement

	$: cards = getSortedCards(player.Hand, trump)

	$: {
		if (selectedCard && !player.Hand.includes(selectedCard)) {
			selectedCard = null
		}
	}

	const getCardInput = (card: Card): HTMLInputElement => {
		const index = cards.indexOf(card)
		const cardLabel = form?.children[index] as HTMLLabelElement
		return cardLabel?.children[1] as HTMLInputElement
	}

	const getIsSelectedCardFocused = (): boolean => {
		if (selectedCard) {
			const cardInput = getCardInput(selectedCard)
			return cardInput === document.activeElement
		}
		return false
	}

	const blurSelectedCard = (): void => {
		if (!selectedCard) return
		const cardInput = getCardInput(selectedCard)
		cardInput.blur()
	}

	const handlePlay = () => {
		if (canPlay && play) {
			if (selectedCard && getIsSelectedCardFocused()) {
				play(selectedCard)
			} else if (cards.length === 1) {
				play(cards[0])
			}
		}
		blurSelectedCard()
	}

	const focusCard = (card: Card): void => {
		const cardInput = getCardInput(card)
		cardInput?.focus()
		selectedCard = card
	}

	const onKeyDown = (e: KeyboardEvent) => {
		const isSubmit = ['Enter', 'Backspace'].includes(e.key)
		const isArrow = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(e.key)
		const isFocused = form?.matches(':focus-within')

		if (isArrow && !isFocused) {
			if (selectedCard) {
				focusCard(selectedCard)
			} else {
				const isBack = ['ArrowLeft', 'ArrowUp'].includes(e.key)
				const index = isBack ? cards.length - 1 : 0
				focusCard(player.Hand[index])
			}
		}

		if (isSubmit) {
			e.preventDefault()
			handlePlay()
		}

		if (isFocused && !isSubmit && !isArrow) blurSelectedCard()
	}

	const handleClick = (card: Card) => {
		const isFocused = form?.matches(':focus-within')
		if (selectedCard === card && isFocused) {
			blurSelectedCard()
		} else {
			focusCard(card)
		}
	}
</script>

<form bind:this={form} class="row m-4 flex-center h-min-44">
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
	<!-- we use onmousedown so the card is not blured before we check for the focus -->
	<button
		disabled={!selectedCard}
		on:mousedown={handlePlay}
		on:click|preventDefault
		class={!canPlay ? 'opacity-0 pointer-events-none absolute ml-4' : 'ml-4'}>Play</button
	>
</form>

<slot />

<svelte:window on:keydown={onKeyDown} />

<style>
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
