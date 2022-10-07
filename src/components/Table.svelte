<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Admin from './Admin.svelte';
	import Hand from './Hand.svelte';
	import { getBids, getPlayers, getPlayersPositions } from '../utils/game';
	import TableLayout from './TableLayout.svelte';
	import LastBid from './LastBid.svelte';
	import OtherPlayer from './OtherPlayer.svelte';
	import CurrentPlayerInfo from './CurrentPlayerInfo.svelte';
	import { variables } from '../variables';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: null | ((card: Card) => void) = null;

	const { IS_ADMIN } = variables;

	$: order = player.Order;
	$: canPlay = order === 1;
	$: players = getPlayers(game);
	$: otherPlayers = getPlayersPositions({
		players,
		currentPlayerOrder: player.Order
	});
	$: hasBids = getBids(game).length > 0;
	$: turns = game.Turns;
</script>

{#if IS_ADMIN}
	<Admin {game} playerName={player.name} />
{/if}

<TableLayout>
	<div slot="top-left">
		{#if hasBids}<LastBid {game} />{/if}
	</div>

	<OtherPlayer slot="top" player={otherPlayers.front} position="front" {turns} />
	<OtherPlayer slot="left" player={otherPlayers.left} position="left" {turns} />
	<OtherPlayer slot="right" player={otherPlayers.right} position="right" {turns} />

	<slot name="middle" slot="center" />

	<Hand slot="bottom" {player} {play} {canPlay}>
		{#if play}
			<CurrentPlayerInfo {player} {turns} />
		{/if}
	</Hand>
</TableLayout>
