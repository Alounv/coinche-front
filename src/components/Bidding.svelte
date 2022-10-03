<script lang="ts">
	import { BidValues, bidColors, type BidColors } from '../data/enums';
	import { afterUpdate } from 'svelte';
	import type { PlayerWithName, Game, BidWithValue } from '../data/types';
	import { getBidsFromGame } from '../utils/game';
	import Players from './Players.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let pass: () => void;
	export let coinche: () => void;

	let bidValue: BidValues;
	let bidColor: BidColors;
	let bids: BidWithValue[] = [];
	let maxBidValue = 0;
	let canBid = false;

	const values = Object.values(BidValues);
	const usableValues = values.filter((v) => v > maxBidValue);

	const handleBid = () => {
		bid({ value: bidValue, color: bidColor });
	};

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
		<select bind:value={bidValue}>
			{#each usableValues as value}
				<option {value}>{value === 160 ? 'capot' : value}</option>
			{/each}
		</select>

		{#each bidColors as color}
			<label>
				<input type="radio" name="color" value={color.value} bind:group={bidColor} />
				{color.label}
			</label>
		{/each}

		{#if bidValue && bidColor}
			<button on:click={handleBid}>{'Bid'}</button>
		{/if}
	{/if}

	{#if bids.length}
		<button on:click={coinche}>Coinche</button>
		<button on:click={pass}>Pass</button>
	{/if}
{/if}
