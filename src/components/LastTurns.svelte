<script lang="ts">
	import { Button } from 'spaper';
	import Modal from 'spaper/components/Modal/Modal.svelte';
	import type { PlayerWithName, Turn } from '../data/types';
	import { showToast } from '../utils/toast';
	import TurnComponent from './Turn.svelte';

	export let turns: Turn[];
	export let left: PlayerWithName;
	export let right: PlayerWithName;
	export let front: PlayerWithName;

	let wasWinnerShown = false;
	let isShown = true;
	const DELAY_BETWEEN_TURNS = 3000;

	$: turn = turns[turns.length - 1] || { Plays: [] };
	$: previousTurn = turns[turns.length - 2];
	$: lastTurn = turn.Plays.length === 4 ? turn : previousTurn;
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

	let isLastTurnShow = false;

	const showLastTurn = () => {
		isLastTurnShow = true;
	};
</script>

<div>
	{#if lastTurn}
		<Button size="small" on:click={showLastTurn}>See last turn</Button>
	{/if}

	{#if isShown}
		<TurnComponent {transition} {turn} {left} {right} {front} />
	{/if}
</div>

<Modal
	bind:active={isLastTurnShow}
	class="border"
	style="min-width: 25rem; width: 50%; background-color: #deefff; padding: 2rem;"
	title="Last turn"
	subTitle="Won by {lastTurn?.Winner}"
>
	{#if lastTurn}
		<TurnComponent turn={lastTurn} {left} {right} {front} />
	{/if}
</Modal>
