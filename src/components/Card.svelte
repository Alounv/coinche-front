<script lang="ts">
	import type { Card } from '../data/enums'
	import Icon from 'svelte-icon'
	import { cardsSrc } from '../utils/image'
	import { customColors } from '../stores/customColors'
	import { getHexColorFromCard } from '../utils/colors'

	export let card: Card | null = null

	const deg = Math.floor(Math.random() * 6) - 3

	let isCustom: boolean
	customColors.subscribe((v) => {
		isCustom = v
	})

	$: hexColor = getHexColorFromCard(card, isCustom)
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
