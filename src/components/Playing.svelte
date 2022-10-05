<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './Players.svelte';
	import LastTurns from './LastTurns.svelte';
	import Hand from './Hand.svelte';
	import { getPlayers, getPlayersPositions, getTrump } from '../utils/game';
	import { Badge } from 'spaper';
	import BackHand from './BackHand.svelte';
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
</script>

<div>Trump is {trump}</div>

<div class="row">
	<OtherPlayer player={frontPlayer} position="front" />
</div>

<div class="row">
	<div class="col-3 col">
		<OtherPlayer player={leftPlayer} position="left" />
	</div>
	<div class="col-6 col">
		<LastTurns turns={game.Turns} {leftPlayer} {rightPlayer} {frontPlayer} {player} />
	</div>
	<div class="col-3 col">
		<OtherPlayer player={rightPlayer} position="right" />
	</div>
</div>

<div class="row flex-center" style="flex-direction: column; align-items: center;;">
	<Hand {player} {play} {canPlay} />

	<div class="margin">
		Use <Badge>LEFT</Badge> / <Badge>RIGHT</Badge>
		{#if canPlay}
			to select a card then press <Badge type="secondary">ENTER</Badge> to play it.
		{:else}
			to see your cards.
		{/if}
	</div>
</div>

<Players {game} playerName={player.name} />
