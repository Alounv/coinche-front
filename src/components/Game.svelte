<script lang="ts">
	import type { Game, PlayerWithName } from '../data/types';
	import { BidValues, Card, Phase, type BidColors } from '../data/enums';

	import Teaming from './Teaming.svelte';
	import Bidding from './Bidding.svelte';
	import Playing from './Playing.svelte';
	import Counting from './Counting.svelte';

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
	{#if phase === Phase.Teaming}
		<Teaming {game} {start} {joinTeam} />
	{:else if phase === Phase.Bidding}
		<Bidding {player} {game} {bid} {pass} {coinche} />
	{:else if phase === Phase.Playing}
		<Playing {player} {game} {play} />
	{:else if phase === Phase.Counting}
		<Counting {game} {start} />
	{/if}
{/if}
