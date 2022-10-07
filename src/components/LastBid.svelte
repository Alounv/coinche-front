<script lang="ts">
	import { bidColors } from '../data/enums';
	import type { Game } from '../data/types';
	import { getLastBid } from '../utils/game';
	import Coinche from './Coinche.svelte';

	export let game: Game;

	$: lastBid = getLastBid(game);
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
