<script lang="ts">
	import { Badge } from 'spaper';

	import type { PlayerWithName, Turn } from '../data/types';
	import { getPlayerWinsCount } from '../utils/game';
	import FlashingBagde from './FlashingBagde.svelte';

	export let player: PlayerWithName;
	export let turns: Turn[];

	$: winsCount = getPlayerWinsCount(turns, player.name);
	$: lastTurn = turns[turns.length - 1];
	$: hasWon = lastTurn && lastTurn.Winner === player.name;
</script>

{#if winsCount}
	{#if hasWon}
		<FlashingBagde>{winsCount}</FlashingBagde>
	{:else}
		<Badge>{winsCount}</Badge>
	{/if}
{/if}
