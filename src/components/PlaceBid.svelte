<script lang="ts">
	import { bidValues, BidValues, bidColors, type BidColors } from '../data/enums';
	import { Select } from 'spaper';

	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let maxBidValue: BidValues;

	let bidValue: BidValues;
	let bidColor: BidColors;

	const values = bidValues.filter((v) => v > maxBidValue);
	const handleBid = () => {
		bid({ value: bidValue, color: bidColor });
	};
</script>

<div class="row margin-small">
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

	<button on:click={handleBid} disabled={!bidValue || !bidColor}>{'Bid'}</button>
</div>
