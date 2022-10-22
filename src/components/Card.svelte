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
		class="shadow shadow-hover p-2 border bg-white"
		style="color: {hexColor}; transform: rotate({deg}deg)"
		alt={card}
	>
		<Icon {data} width="100%" height="100%" style="stroke: transparent" />
	</div>
{:else}
	<div
		class="shadow shadow-hover p-2 border background-primary w-full h-full"
		style="transform: rotate({deg}deg);"
	/>
{/if}
