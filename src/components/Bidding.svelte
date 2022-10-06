<script lang="ts">
	import { Badge } from 'spaper';

	import { type BidValues, type BidColors, bidColors } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import { getBids, getCurrentPlayer } from '../utils/game';
	import Coinche from './Coinche.svelte';

	import PlaceBid from './PlaceBid.svelte';
	import Table from './Table.svelte';

	export let player: PlayerWithName;
	export let game: Game;
	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let pass: () => void;
	export let coinche: () => void;

	$: bids = getBids(game);
	$: maxBidValue = bids.length ? bids[bids.length - 1].value : 0;
	$: lastBid = maxBidValue ? game.Bids[maxBidValue as BidValues] : null;
	$: isCoinched = !!lastBid?.Coinche;
	$: canBid = player.Order === 1;
	$: currentPlayer = getCurrentPlayer(game);
</script>

<Table {player} {game}>
	<div slot="middle" style="display: flex; align-items: center; justify-content: center; flex: 1;">
		<h4>
			<ul>
				{#each bids as bid}
					<li>
						{bid.value} - {bidColors[bid.Color]} ({bid.Player})
					</li>
				{/each}
				{#if lastBid?.Coinche}
					<li>
						<Coinche coinche={lastBid?.Coinche || 0} />
					</li>
				{/if}
			</ul>
		</h4>
	</div>
</Table>

<div class="row" style="gap: 1rem;">
	{#if canBid}
		{#if maxBidValue < 160 && !isCoinched}
			<PlaceBid {bid} {maxBidValue} />
		{/if}

		{#if bids.length}
			<button class="align-bottom" on:click={coinche}>Coinche</button>
			<button class="align-bottom" on:click={pass}>Pass</button>
		{/if}
	{:else if bids.length && player?.Order === 3}
		<button class="align-bottom" on:click={coinche}>Coinche</button>
	{:else}
		<div>Waiting for <Badge>{currentPlayer?.name}</Badge> to bid...</div>
	{/if}
</div>
