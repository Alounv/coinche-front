<script lang="ts">
	import { bidValues, BidValues, bidColors, type BidColors } from '../data/enums';

	export let bid: (args: { value: BidValues; color: BidColors }) => void;
	export let maxBidValue: BidValues;

	let bidValue: BidValues;
	let bidColor: BidColors;

	const values = bidValues.filter((v) => v > maxBidValue);
	const handleBid = () => {
		bid({ value: bidValue, color: bidColor });
	};
</script>

<select bind:value={bidValue}>
	{#each values as value}
		<option {value}>{value === 160 ? 'capot' : value}</option>
	{/each}
</select>

{#each bidColors as color}
	<label>
		<input type="radio" name="color" value={color.value} bind:group={bidColor} />
		{color.label}
	</label>
{/each}

{#if bidValue && bidColor}
	<button on:click={handleBid}>{'Bid'}</button>
{/if}
