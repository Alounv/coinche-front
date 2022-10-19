<script lang="ts">
	import { type BidColors, type BidValues, bidColors, bidValues } from '../data/enums'
	import { Select } from 'spaper'

	export let maxBidValue: BidValues

	export let value: string
	export let color: BidColors

	const values = bidValues.filter((v) => v > maxBidValue)
</script>

<div class="row" style="gap: 1rem;">
	<Select bind:value label="Value" style="background-color: white;">
		{#each values as value}
			<option {value}>{value === 160 ? 'CAPOT' : value}</option>
		{/each}
	</Select>

	<Select bind:value={color} label="Color" style="background-color: white;">
		{#each Object.entries(bidColors) as [value, label]}
			<option {value}>{label}</option>
		{/each}
	</Select>
</div>
