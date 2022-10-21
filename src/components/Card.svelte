<script lang="ts">
	import type { Card } from '../data/enums'
	import Icon from 'svelte-icon'
	import { cardsSrc } from '../utils/image'

	export let card: Card | null = null

	const deg = Math.floor(Math.random() * 6) - 3

	const hexColors: Record<string, string> = {
		club: '#183713',
		diamond: '#D06A41',
		heart: '#CF3187',
		spade: '#2E3F84'
	}
	$: color = card ? card.split('-')[1] : ''
	$: hexColor = color ? hexColors[color] : ''
	$: data = card ? cardsSrc[card] : ''
</script>

{#if card}
	<div
		class="shadow shadow-hover padding-small border"
		style="transform: rotate({deg}deg); background-color: white; color: {hexColor};"
		alt={card}
	>
		<Icon {data} width="100%" height="100%" />
	</div>
{:else}
	<div
		class="shadow shadow-hover padding-small border background-primary"
		style="transform: rotate({deg}deg);  width: 100%; height: 100%;"
	/>
{/if}
