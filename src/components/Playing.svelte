<script lang="ts">
	import { bidColors, type Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './Players.svelte';
	import LastTurns from './LastTurns.svelte';
	import Hand from './Hand.svelte';
	import { getPlayers, getPlayersPositions, getLastBid } from '../utils/game';
	import { Badge } from 'spaper';
	import OtherPlayer from './OtherPlayer.svelte';
	import AnimatedBadge from './AnimatedBadge.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;

	$: lastBid = getLastBid(game);
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

	$: trumpLabel = bidColors.find((c) => c.value === lastBid.Color)?.label;
	$: coinche = lastBid.Coinche;
</script>

<Players {game} playerName={player.name} />

<div style="display: flex; margin-bottom: 1rem;">
	<div class="col-3 col">
		<div style="margin-bottom: .5rem;">{lastBid.Player} took with {lastBid.value} {trumpLabel}</div>
		{#if coinche > 1}
			⚔️⚔️ <Badge>Surcoinché</Badge>
		{:else if coinche > 0}
			⚔️ <Badge>Coinché</Badge>
		{/if}
	</div>
	<div class="col-6 col" style="padding-bottom: 0; min-height: 11rem;">
		<OtherPlayer player={frontPlayer} position="front" />
	</div>
</div>

<div style="display: flex; margin-bottom: 1rem; flex: 1;">
	<div class=" col" style="display: flex; flex: 0; min-width: 14rem;">
		<OtherPlayer player={leftPlayer} position="left" />
	</div>

	<div style="flex: 1; display: flex;">
		<LastTurns turns={game.Turns} {leftPlayer} {rightPlayer} {frontPlayer} {player} />
	</div>

	<div class=" col" style="display: flex; flex: 0; min-width: 14rem;">
		<OtherPlayer player={rightPlayer} position="right" />
	</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;padding-bottom: 1rem;">
	<Hand {player} {play} {canPlay} />

	<div>
		Use <Badge>LEFT</Badge> / <Badge>RIGHT</Badge>
		{#if canPlay}
			to select a card then press <AnimatedBadge text="ENTER" /> to play it.
		{:else}
			to see your cards.
		{/if}
	</div>
</div>
