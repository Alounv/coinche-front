<script lang="ts">
	import type { Game, PlayerWithName } from '../data/types';
	import { BidValues, Card, Phases, type BidColors } from '../data/enums';

	import Teaming from './Teaming.svelte';
	import Bidding from './Bidding.svelte';
	import Playing from './Playing.svelte';

	export let game: Game;
	export let player: PlayerWithName;
	export let start: () => void;
	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let pass: () => void;
	export let coinche: () => void;
	export let play: (card: Card) => void;
	export let joinTeam: (team: string) => void;

	$: phase = game?.Phase;
</script>

{#if game}
	{#if phase === Phases.Teaming}
		<Teaming {game} {start} {joinTeam} />
	{:else if phase === Phases.Bidding}
		<Bidding {player} {game} {bid} {pass} {coinche} />
	{:else}
		<Playing {player} {game} {play} {start} />
	{/if}
{/if}
