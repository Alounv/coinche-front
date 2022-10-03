<script lang="ts">
	import { BidValues, type BidColors } from '../data/enums';
	import { afterUpdate } from 'svelte';
	import type { PlayerWithName, Game, BidWithValue } from '../data/types';
	import { getBidsFromGame } from '../utils/game';

	import Players from './Players.svelte';
	import PlaceBid from './PlaceBid.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let pass: () => void;
	export let coinche: () => void;

	let bids: BidWithValue[] = [];
	let maxBidValue: BidValues = 0;
	let canBid = false;

	const values = Object.values(BidValues);
	const usableValues = values.filter((v) => v > maxBidValue);

	afterUpdate(() => {
		canBid = game.Players[player.name].Order === 1;
		bids = getBidsFromGame(game);
		maxBidValue = bids.length ? bids[bids.length - 1].value : 0;
	});
</script>

{#each bids as bid}
	<div>{bid.value} - {bid.Color}</div>
{/each}

<Players {game} playerName={player.name} />

<div>{player.Hand}</div>

{#if canBid}
	{#if usableValues.length}
		<PlaceBid {bid} {maxBidValue} />
	{/if}

	{#if bids.length}
		<button on:click={coinche}>Coinche</button>
		<button on:click={pass}>Pass</button>
	{/if}
{/if}
