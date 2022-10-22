<script lang="ts">
	import type { PlayerWithName, Turn } from '../data/types'
	import AnimatedBadge from './AnimatedBadge.svelte'
	import BackHand from './BackHand.svelte'
	import WinsCount from './WinsCount.svelte'
	import { variables } from '../variables'

	export let player: PlayerWithName
	export let position: 'left' | 'right' | 'front'
	export let turns: Turn[] = []
	export let gameId: number

	let flexDirection = 'column'

	$: isVertical = position === 'left' || position === 'right'
	$: {
		if (position === 'left') flexDirection = 'row'
		if (position === 'right') flexDirection = 'row-reverse'
	}

	const { IS_ADMIN } = variables

	const handleClick = IS_ADMIN
		? (): void => {
				window.history.pushState(
					{ game: gameId, player: player.name },
					document.title,
					`?game=${gameId}&player=${player.name}`
				)
				window.dispatchEvent(new Event('popstate'))
		  }
		: () => null
</script>

<div style="flex-direction: {flexDirection};" class="flex flex-col gap-2 items-center">
	<div class="flex gap-1 items-center" style="flex-direction: {isVertical ? 'column' : 'row'}">
		{#if player.Order === 1}
			<AnimatedBadge text={player.name} onClick={handleClick} />
		{:else}
			<span class="m-auto">{player.name}</span>
		{/if}
		<WinsCount {turns} {player} />
	</div>

	<BackHand hand={player.Hand} {isVertical} />
</div>
