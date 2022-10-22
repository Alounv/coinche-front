<script lang="ts">
	import { Button } from 'spaper'
	import Color from './Color.svelte'
	import { Colors } from '../data/enums'
	import { customColors } from '../stores/customColors'
	import { onMount } from 'svelte'

	const switchColors = () => {
		customColors.update((isCustom) => {
			localStorage.setItem('customColors', (!isCustom).toString())
			return !isCustom
		})
	}
	const colors = Object.values(Colors)

	onMount(() => {
		const isCustom = localStorage.getItem('customColors')
		if (isCustom) {
			customColors.set(isCustom === 'true')
		}
	})
</script>

<Button on:click={switchColors} size="small">
	{#each colors as color}
		<Color {color} />
	{/each}
</Button>
