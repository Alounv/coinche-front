<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './Players.svelte';
	import LastTurns from './LastTurns.svelte';
	import Hand from './Hand.svelte';
	import { getPlayers, getPlayersPositions } from '../utils/game';
	import Table from './Table.svelte';
	import Instructions from './Instructions.svelte';
	import LastBid from './LastBid.svelte';
	import OtherPlayer from './OtherPlayer.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;

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

<Players {game} playerName={player.name} />

<Table>
	<LastBid slot="top-left" {game} />

	<OtherPlayer slot="top" player={frontPlayer} position="front" />
	<OtherPlayer slot="left" player={leftPlayer} position="left" />
	<OtherPlayer slot="right" player={rightPlayer} position="right" />

	<LastTurns slot="center" turns={game.Turns} {leftPlayer} {rightPlayer} {frontPlayer} {player} />

	<div slot="bottom">
		<Hand {player} {play} {canPlay} />
		<Instructions {canPlay} />
	</div>
</Table>
