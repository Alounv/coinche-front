<script lang="ts">
	import type { PlayerWithName, Turn } from '../data/types';
	import Card from './Card.svelte';

	export let turns: Turn[];
	export let player: PlayerWithName;
	export let leftPlayer: PlayerWithName;
	export let rightPlayer: PlayerWithName;
	export let frontPlayer: PlayerWithName;

	$: currentTurn = turns[turns.length - 1];
	$: previousTurn = turns[turns.length - 2];
	$: turn = currentTurn.Plays.length ? currentTurn : previousTurn;

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
		<div class={getClass(play.PlayerName)}>
			<Card card={play.Card} />
		</div>
	{/each}
</div>

<style>
	.container {
		position: relative;
		min-height: 20rem;
		width: 100%;
	}

	.current,
	.left,
	.right,
	.front {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 8rem;
	}
	.current {
		top: calc(50% + 3rem);
		transform: translate(-50%, -50%);
	}
	.left {
		left: calc(50% - 3rem);
		transform: translate(-50%, -50%) rotate(90deg);
	}
	.right {
		left: calc(50% + 3rem);
		transform: translate(-50%, -50%) rotate(-90deg);
	}
	.front {
		top: calc(50% - 3rem);
		transform: translate(-50%, -50%) rotate(180deg);
	}
</style>
