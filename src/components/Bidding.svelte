<script lang="ts">
	import type { BidValues, BidColors } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import { getBids } from '../utils/game';

	import Players from './Players.svelte';
	import PlaceBid from './PlaceBid.svelte';
	import Hand from './Hand.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let pass: () => void;
	export let coinche: () => void;

	$: canBid = game.Players[player.name].Order === 1;
	$: bids = getBids(game);
	$: maxBidValue = bids.length ? bids[bids.length - 1].value : 0;
</script>

{#each bids as bid}
	<div>{bid.value} - {bid.Color}</div>
{/each}

<Players {game} playerName={player.name} />

<div class="row">
	{#if canBid}
		{#if maxBidValue < 160}
			<PlaceBid {bid} {maxBidValue} />
		{/if}

		{#if bids.length}
			<button on:click={coinche}>Coinche</button>
			<button on:click={pass}>Pass</button>
		{/if}
	{/if}
</div>

<Hand {player} />
