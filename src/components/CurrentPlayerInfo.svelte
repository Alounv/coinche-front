<script lang="ts">
	import type { PlayerWithName, Turn } from '../data/types'
	import Instructions from './Instructions.svelte'
	import WinsCount from './WinsCount.svelte'
	import { getPlayerWinsCount } from '../utils/game'

	export let player: PlayerWithName
	export let turns: Turn[]

	$: canPlay = player.Order === 1
	$: winsCount = getPlayerWinsCount(turns, player.name)
</script>

<div class="row gap-4">
	{#if player.Hand.length}
		<Instructions {canPlay} />
	{/if}
	{#if winsCount}
		<span class="align-bottom">(You won <WinsCount {turns} {player} /> turns.)</span>
	{/if}
</div>
