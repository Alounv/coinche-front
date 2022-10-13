<script lang="ts">
	import type { PlayerWithName, Turn } from '../data/types'
	import { variables } from '../variables'
	import AnimatedBadge from './AnimatedBadge.svelte'
	import BackHand from './BackHand.svelte'
	import WinsCount from './WinsCount.svelte'

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

<div
	style="display: flex; flex-direction: column; gap: .5rem; align-items: center;  flex-direction: {flexDirection};"
>
	<div
		style="display: flex; gap: .25rem; align-items: center; flex-direction: {isVertical
			? 'column'
			: 'row'}"
	>
		{#if player.Order === 1}
			<AnimatedBadge text={player.name} onClick={handleClick} />
		{:else}
			<span style="margin: auto">{player.name}</span>
		{/if}
		<WinsCount {turns} {player} />
	</div>

	<BackHand hand={player.Hand} {isVertical} />
</div>
