<script lang="ts">
	import { type BidColors, BidValues, Card, Phases } from '../data/enums'
	import type { Game, PlayerWithName } from '../data/types'
	import Bidding from './Bidding.svelte'
	import Playing from './Playing.svelte'
	import Teaming from './Teaming.svelte'

	export let game: Game
	export let player: PlayerWithName
	export let start: () => void
	export let bid: (args: { value: BidValues; color: BidColors }) => void
	export let pass: () => void
	export let coinche: () => void
	export let play: (card: Card) => void
	export let joinTeam: (team: string) => void

	$: phase = game?.Phase
</script>

{#if game}
	{#if phase === Phases.Teaming}
		<Teaming {game} {start} {joinTeam} playerTeam={player.Team} />
	{:else if phase === Phases.Bidding}
		<Bidding {player} {game} {bid} {pass} {coinche} />
	{:else}
		<Playing {player} {game} {play} {start} />
	{/if}
{/if}
