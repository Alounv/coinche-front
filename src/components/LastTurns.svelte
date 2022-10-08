<script lang="ts">
	import type { PlayerWithName, Turn } from '../data/types';
	import { fly } from 'svelte/transition';
	import Card from './Card.svelte';
	import { showToast } from '../utils/toast';

	export let turns: Turn[];
	export let left: PlayerWithName;
	export let right: PlayerWithName;
	export let front: PlayerWithName;

	let wasWinnerShown = false;
	let isShown = true;
	const DELAY_BETWEEN_TURNS = 3000;

	$: turn = turns[turns.length - 1] || { Plays: [] };
	$: {
		if (turn.Winner && !wasWinnerShown) {
			const message = `${turn.Winner} has won the turn`;
			showToast({ message, type: 'secondary' });
			wasWinnerShown = true;
		}
	}
	$: {
		if (turn.Winner) {
			setTimeout(() => {
				isShown = false;
			}, DELAY_BETWEEN_TURNS);
		} else {
			isShown = true;
		}
	}

	const getClass = (p: string): 'current' | 'left' | 'right' | 'front' => {
		switch (p) {
			case left.name:
				return 'left';
			case right.name:
				return 'right';
			case front.name:
				return 'front';
			default:
				return 'current';
		}
	};

	const duration = 1000;
	const flyOut = {
		current: { y: 300, duration },
		front: { y: -300, duration },
		left: { x: -300, duration },
		right: { x: 300, duration }
	};

	$: transition = turn.Winner ? flyOut[getClass(turn.Winner)] : {};
</script>

<div>
	{#if isShown}
		<div class="container" out:fly={transition}>
			{#each turn.Plays as play}
				<div class={getClass(play.PlayerName)} in:fly={{ y: 200 }}>
					<Card card={play.Card} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	:root {
		--axial-offset: 2rem;
	}

	.container {
		position: relative;
		min-height: 16rem;
		width: 100%;
	}

	.current,
	.left,
	.right,
	.front {
		position: absolute;
		top: calc(50% - 5.5rem);
		left: calc(50% - 4rem);
		width: 8rem;
	}
	.current {
		top: calc(50% - 5.5rem + var(--axial-offset));
		left: calc(50% - 4rem + 1rem);
		transform: rotate(0deg);
	}
	.left {
		left: calc(50% - 4rem - var(--axial-offset));
		top: calc(50% - 5.5rem + 1rem);
		transform: rotate(90deg);
	}
	.front {
		top: calc(50% - 5.5rem - var(--axial-offset));
		left: calc(50% - 4rem - 1rem);
		transform: rotate(180deg);
	}
	.right {
		left: calc(50% - 4rem + var(--axial-offset));
		top: calc(50% - 5.5rem - 1rem);
		transform: rotate(-90deg);
	}
</style>
