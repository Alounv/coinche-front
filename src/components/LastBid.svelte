<script lang="ts">
	import type { BidWithValue } from '../data/types'

	import Coinche from './Coinche.svelte'
	import Color from './Color.svelte'

	export let lastBid: BidWithValue

	$: coinche = lastBid.Coinche
</script>

<div class="row items-center gap-1">
	<span>
		{lastBid.Player} took with {lastBid.value}
		<Color color={lastBid.Color} />
	</span>
	<Coinche {coinche} />
</div>
