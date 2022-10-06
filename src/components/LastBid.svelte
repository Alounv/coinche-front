<script lang="ts">
	import { bidColors } from '../data/enums';
	import type { Game } from '../data/types';
	import { getLastBid } from '../utils/game';
	import { Badge } from 'spaper';

	export let game: Game;

	$: lastBid = getLastBid(game);
	$: trumpLabel = bidColors.find((c) => c.value === lastBid.Color)?.label;
	$: coinche = lastBid.Coinche;
</script>

<div>
	<div style="margin-bottom: .5rem;">
		{lastBid.Player} took with {lastBid.value}
		{trumpLabel}
	</div>
	{#if coinche > 1}
		⚔️⚔️ <Badge>Surcoinché</Badge>
	{:else if coinche > 0}
		⚔️ <Badge>Coinché</Badge>
	{/if}
</div>
