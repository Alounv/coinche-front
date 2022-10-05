<script lang="ts">
	import type { PlayerWithName, Turn } from '../data/types';
	import { fly } from 'svelte/transition';
	import Card from './Card.svelte';
	import { showToast } from '../utils/toast';

	export let turns: Turn[];
	export let player: PlayerWithName;
	export let leftPlayer: PlayerWithName;
	export let rightPlayer: PlayerWithName;
	export let frontPlayer: PlayerWithName;

	$: turn = turns[turns.length - 1] || { Plays: [] };
	$: {
		if (turn.Winner) {
			const message = `${turn.Winner} has won the turn`;
			showToast({ message, type: 'secondary' });
		}
	}

	const getClass = (p: string) => {
		switch (p) {
			case player.name:
				return 'current';
			case leftPlayer.name:
				return 'left';
			case rightPlayer.name:
				return 'right';
			case frontPlayer.name:
				return 'front';
		}
	};
</script>

<div class="container">
	{#each turn.Plays as play}
		<div class={getClass(play.PlayerName)} in:fly={{ y: 200 }}>
			<Card card={play.Card} />
		</div>
	{/each}
</div>

<style>
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
		top: calc(50% - 5.5rem + 3rem);
		left: calc(50% - 4rem + 1rem);
		transform: rotate(0deg);
	}
	.left {
		left: calc(50% - 4rem - 3rem);
		top: calc(50% - 5.5rem + 1rem);
		transform: rotate(90deg);
	}
	.front {
		top: calc(50% - 5.5rem - 3rem);
		left: calc(50% - 4rem - 1rem);
		transform: rotate(180deg);
	}
	.right {
		left: calc(50% - 4rem + 3rem);
		top: calc(50% - 5.5rem - 1rem);
		transform: rotate(-90deg);
	}
</style>
