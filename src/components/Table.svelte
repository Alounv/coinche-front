<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './Players.svelte';
	import Hand from './Hand.svelte';
	import { getPlayers, getPlayersPositions } from '../utils/game';
	import TableLayout from './TableLayout.svelte';
	import LastBid from './LastBid.svelte';
	import OtherPlayer from './OtherPlayer.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;

	$: order = player.Order;
	$: canPlay = order === 1;
	$: players = getPlayers(game);
	$: otherPlayers = getPlayersPositions({
		players,
		currentPlayerOrder: player.Order
	});
</script>

<Players {game} playerName={player.name} />

<TableLayout>
	<LastBid slot="top-left" {game} />

	<OtherPlayer slot="top" player={otherPlayers.front} position="front" />
	<OtherPlayer slot="left" player={otherPlayers.left} position="left" />
	<OtherPlayer slot="right" player={otherPlayers.right} position="right" />

	<slot name="middle" slot="center" />

	<div slot="bottom">
		<Hand {player} {play} {canPlay} />
	</div>
</TableLayout>
