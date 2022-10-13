<script lang="ts">
	import AnimatedBadge from './AnimatedBadge.svelte'
	import { Badge } from 'spaper'

	export let canPlay: boolean
</script>

<div>
	Use <Badge>LEFT</Badge> / <Badge>RIGHT</Badge>
	{#if canPlay}
		to select a card then press <AnimatedBadge text="ENTER" /> to play it.
	{:else}
		to see your cards.
	{/if}
</div>
