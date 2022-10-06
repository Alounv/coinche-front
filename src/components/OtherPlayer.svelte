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
	style="display: flex; flex-direction: column; gap: .5rem; align-items: center; justify-content: center; width: 100%; flex-direction: {flexDirection};"
>
	{#if player.Order === 1}
		<h4 style="margin: 0;">
			<Badge rounded type="secondary" style="display: flex"
				>{player.name}
				<div class="moving">{'<'}</div></Badge
			>
		</h4>
	{:else}
		<span>{player.name}</span>
	{/if}
	<BackHand hand={player.Hand} {isVertical} />
</div>

<style>
	.moving {
		margin-left: 2px;
		animation-duration: 1s;
		animation-name: anim;
		animation-iteration-count: infinite;
		flex: 0;
	}
	@keyframes anim {
		0% {
		}
		50% {
			transform: translateX(2px);
		}
		100% {
		}
	}
</style>
