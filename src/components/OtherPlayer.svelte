<script lang="ts">
	import type { PlayerWithName, Turn } from '../data/types'
	import AnimatedBadge from './AnimatedBadge.svelte'
	import BackHand from './BackHand.svelte'
	import WinsCount from './WinsCount.svelte'

	export let player: PlayerWithName
	export let position: 'left' | 'right' | 'front'
	export let turns: Turn[] = []

	let flexDirection = 'column'

	$: isVertical = position === 'left' || position === 'right'
	$: {
		if (position === 'left') flexDirection = 'row'
		if (position === 'right') flexDirection = 'row-reverse'
	}
</script>

<div
	style="display: flex; flex-direction: column; gap: .5rem; align-items: center;  flex-direction: {flexDirection};"
>
	<div
		style="display: flex; gap: .25rem; align-items: center; flex-direction: {isVertical
			? 'column'
			: 'row'}"
	>
		{#if player.Order === 1}
			<AnimatedBadge text={player.name} />
		{:else}
			<span style="margin: auto">{player.name}</span>
		{/if}
		<WinsCount {turns} {player} />
	</div>

	<BackHand hand={player.Hand} {isVertical} />
</div>
