<script lang="ts">
	import type { BidWithValue } from '../data/types';

	import { bidColors } from '../data/enums';
	import Coinche from './Coinche.svelte';

	export let lastBid: BidWithValue;

	$: trumpLabel = bidColors[lastBid.Color];
	$: coinche = lastBid.Coinche;
</script>

<div class="row" style="align-items: center; gap: .25rem;">
	<span>
		{lastBid.Player} took with {lastBid.value}
		{trumpLabel}
	</span>
	<Coinche {coinche} />
</div>
