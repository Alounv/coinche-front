<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './Players.svelte';
	import Hand from './Hand.svelte';
	import { getBids, getPlayers, getPlayersPositions } from '../utils/game';
	import TableLayout from './TableLayout.svelte';
	import LastBid from './LastBid.svelte';
	import OtherPlayer from './OtherPlayer.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: null | ((card: Card) => void) = null;

	$: order = player.Order;
	$: canPlay = order === 1;
	$: players = getPlayers(game);
	$: otherPlayers = getPlayersPositions({
		players,
		currentPlayerOrder: player.Order
	});
	$: hasBids = getBids(game).length > 0;
</script>

<Players {game} playerName={player.name} />

<TableLayout>
	{#if hasBids}
		<LastBid slot="top-left" {game} />
	{/if}

	<OtherPlayer slot="top" player={otherPlayers.front} position="front" />
	<OtherPlayer slot="left" player={otherPlayers.left} position="left" />
	<OtherPlayer slot="right" player={otherPlayers.right} position="right" />

	<slot name="middle" slot="center" />

	<Hand slot="bottom" {player} {play} {canPlay} />
</TableLayout>
