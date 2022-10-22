<script lang="ts">
	import type { BidColors, BidValues } from '../data/enums'
	import type { Game, PlayerWithName } from '../data/types'
	import { getBids, getCurrentPlayer } from '../utils/game'
	import AnimatedBadge from './AnimatedBadge.svelte'
	import { Badge } from 'spaper'
	import { Button } from 'spaper'
	import Coinche from './Coinche.svelte'
	import Color from './Color.svelte'
	import PlaceBid from './PlaceBid.svelte'
	import Table from './Table.svelte'

	export let player: PlayerWithName
	export let game: Game
	export let bid: (args: { value: BidValues; color: BidColors }) => void
	export let pass: () => void
	export let coinche: () => void

	$: bids = getBids(game)
	$: maxBidValue = bids.length ? bids[bids.length - 1].value : 0
	$: lastBid = maxBidValue ? game.Bids[maxBidValue as BidValues] : null
	$: lastBidPlayerOrder = lastBid ? game.Players[lastBid.Player]?.Order : 100
	$: isCoinched = !!lastBid?.Coinche
	$: isCurrentPlayerTurn = player.Order === 1
	$: currentPlayer = getCurrentPlayer(game)
	$: canCoinche =
		bids.length && [1, 3].includes(player.Order) && [2, 4].includes(lastBidPlayerOrder)
	$: canBid = isCurrentPlayerTurn && maxBidValue < 160 && !isCoinched
	$: canPass = isCurrentPlayerTurn && bid.length

	let bidValue: string
	let bidColor: BidColors

	const handleBid = () => {
		bid({ color: bidColor, value: bidValue as unknown as BidValues })
	}
</script>

<Table {player} {game}>
	<div slot="middle" class="flex flex-col items-center justify-center flex-1">
		{#if canBid}
			<PlaceBid {maxBidValue} bind:value={bidValue} bind:color={bidColor} />
		{/if}

		<div class="row gap: 3">
			{#if canBid}
				<Button on:click={handleBid} class="align-bottom" disabled={!bidValue || !bidColor}
					>{'Bid'}</Button
				>
			{/if}

			{#if canPass}
				<Button class="align-bottom" on:click={pass}>Pass</Button>
			{/if}

			{#if canCoinche}
				<Button class="align-bottom" on:click={coinche}>Coinche</Button>
			{/if}

			{#if !canBid && !canPass && !canCoinche}
				<div>Waiting for <Badge>{currentPlayer?.name}</Badge> to bid...</div>
			{/if}
		</div>

		<h4 class="m-0">
			{#each bids as bid}
				<div class="m-2">
					{#if bid.value > 0}
						{bid.value} - <Color color={bid.Color} /> ({bid.Player})
						<span>{bid.Pass ? `- passed: ${bid.Pass}` : ''}</span>
					{:else if bid.Pass}
						<span>passed: {bid.Pass}</span>
					{/if}
				</div>
			{/each}
			{#if lastBid?.Coinche}
				<h3 class="m-2">
					<Coinche coinche={lastBid?.Coinche || 0} />
				</h3>
			{/if}
		</h4>
	</div>
</Table>

<div class="row gap-4 items-center">
	{#if isCurrentPlayerTurn}
		<AnimatedBadge text={player.name} />
	{/if}
</div>
