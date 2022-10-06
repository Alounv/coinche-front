<script lang="ts">
	import { bidColors, type Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './Players.svelte';
	import LastTurns from './LastTurns.svelte';
	import Hand from './Hand.svelte';
	import { getPlayers, getPlayersPositions, getTrump } from '../utils/game';
	import { Badge } from 'spaper';
	import OtherPlayer from './OtherPlayer.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;

	$: trump = getTrump(game);
	$: order = player.Order;
	$: canPlay = order === 1;
	$: players = getPlayers(game);

	let leftPlayer: PlayerWithName;
	let rightPlayer: PlayerWithName;
	let frontPlayer: PlayerWithName;

	$: {
		const { left, right, front } = getPlayersPositions({
			players,
			currentPlayerOrder: player.Order
		});
		leftPlayer = left;
		rightPlayer = right;
		frontPlayer = front;
	}

	$: trumpLabel = bidColors.find((c) => c.value === trump)?.label;
</script>

<Players {game} playerName={player.name} />

<div style="display: flex; margin-bottom: 1rem;">
	<div class="col-2 col">
		<div>Trump: {trumpLabel}</div>
	</div>
	<div class="col-8 col" style="padding-bottom: 0;">
		<OtherPlayer player={frontPlayer} position="front" />
	</div>
</div>

<div style="display: flex; margin-bottom: 1rem; flex: 1;">
	<div class=" col" style="display: flex; flex: 0;">
		<OtherPlayer player={leftPlayer} position="left" />
	</div>
	<div style="flex: 1; display: flex;">
		<LastTurns turns={game.Turns} {leftPlayer} {rightPlayer} {frontPlayer} {player} />
	</div>
	<div class=" col" style="display: flex; flex: 0;">
		<OtherPlayer player={rightPlayer} position="right" />
	</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;padding-bottom: 1rem;">
	<Hand {player} {play} {canPlay} />

	<div>
		Use <Badge>LEFT</Badge> / <Badge>RIGHT</Badge>
		{#if canPlay}
			to select a card then press <Badge type="secondary">ENTER</Badge> to play it.
		{:else}
			to see your cards.
		{/if}
	</div>
</div>
