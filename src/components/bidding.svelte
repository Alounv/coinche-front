<script lang="ts">
	import { afterUpdate } from 'svelte';

	import type { PlayerWithName, Game, BidWithValue } from '../data/types';
	import { getPlayersFromGame, getBidsFromGame } from '../utils/game';

	export let player: PlayerWithName;
	export let game: Game;
	export let bid: (args: { value: number; color: string }) => void;
	export let pass: () => void;
	export let coinche: () => void;

	let bidValue = 0;
	let bidColor = '';
	let players: PlayerWithName[] = [];
	let bids: BidWithValue[] = [];
	let maxBidValue = 0;

	const values = [80, 90, 100, 110, 120, 130, 140, 150, 160];
	const usableValues = values.filter((v) => v > maxBidValue);
	const colors = [
		{ label: '♠', value: 'spike' },
		{ label: '♥', value: 'heart' },
		{ label: '♦', value: 'diamond' },
		{ label: '♣', value: 'club' },
		{ label: 'AllTrump', value: 'AllTrump' },
		{ label: 'NoTrump', value: 'NoTrump' }
	];

	const handleBid = () => {
		bid({ value: bidValue, color: bidColor });
	};

	afterUpdate(() => {
		players = getPlayersFromGame(game);
		bids = getBidsFromGame(game);
		maxBidValue = bids.length ? bids[bids.length - 1].value : 0;

		players.sort((a, b) => a.InitialOrder - b.InitialOrder);
	});
</script>

{#each bids as bid}
	<div>{bid.value} - {bid.Color}</div>
{/each}

{#each players as p}
	<div>
		{p.name}
		{p.Team}
		{#if p.Order === 1}
			<strong>{'<---- turn'}</strong>
		{/if}
	</div>
{/each}

<div>{player.Hand}</div>

{#if usableValues.length}
	<select bind:value={bidValue}>
		{#each usableValues as value}
			<option {value}>{value === 160 ? 'capot' : value}</option>
		{/each}
	</select>

	{#each colors as color}
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
