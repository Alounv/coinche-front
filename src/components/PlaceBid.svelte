<script lang="ts">
	import { bidValues, BidValues, bidColors, type BidColors } from '../data/enums';
	import { Select } from 'spaper';

	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let maxBidValue: BidValues;

	let bidValue: BidValues = maxBidValue;
	let bidColor: BidColors;

	const values = bidValues.filter((v) => v > maxBidValue);
	const handleBid = () => {
		bid({ value: bidValue, color: bidColor });
	};
</script>

<div style="display: flex; gap: 1rem;">
	<Select bind:value={bidValue} label="Value">
		{#each values as value}
			<option {value}>{value === 160 ? 'capot' : value}</option>
		{/each}
	</Select>

	<Select bind:value={bidColor} label="Color">
		{#each bidColors as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</Select>

	<button on:click={handleBid} class="align-bottom" disabled={!bidValue || !bidColor}
		>{'Bid'}</button
	>
</div>
