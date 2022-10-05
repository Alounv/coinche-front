<script lang="ts">
	import type { PlayerWithName } from '../data/types';
	import BackHand from './BackHand.svelte';
	import { Badge } from 'spaper';

	export let player: PlayerWithName;
	export let position: 'left' | 'right' | 'front';

	let flexDirection = 'column';

	$: isVertical = position === 'left' || position === 'right';
	$: {
		if (position === 'left') flexDirection = 'row';
		if (position === 'right') flexDirection = 'row-reverse';
	}
</script>

<div
	style="display: flex; align-items: center; justify-content: center; width: 100%; flex-direction: {flexDirection};"
>
	<Badge>{player.name}</Badge>
	{#if player.Order === 1}
		<span>👈</span>
	{/if}
	<BackHand hand={player.Hand} {isVertical} />
</div>
