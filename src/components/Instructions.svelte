<script lang="ts">
	import { Badge } from 'spaper'
	import AnimatedBadge from './AnimatedBadge.svelte'

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
