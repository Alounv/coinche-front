<script lang="ts">
	import { bidColors } from '../data/enums';
	import type { Game } from '../data/types';
	import { getLastBid, getTakenTeamWons } from '../utils/game';
	import { Badge } from 'spaper';

	export let game: Game;

	$: lastBid = getLastBid(game);
	$: trumpLabel = bidColors.find((c) => c.value === lastBid.Color)?.label;
	$: coinche = lastBid.Coinche;
	$: lastBidderName = lastBid.Player;
	$: takenTeamWons = getTakenTeamWons(game, lastBidderName);
	$: turnsCount = game.Turns.length;
</script>

<div class="row" style="align-items: center; gap: .25rem;">
	<span>
		{lastBid.Player} took with {lastBid.value}
		{trumpLabel}
	</span>
	{#if coinche > 1}
		<Badge>Surcoinché</Badge> ⚔️⚔️
	{:else if coinche > 0}
		<Badge>Coinché</Badge> ⚔️
	{/if}
</div>

Turns won by {lastBid.Player} team: <Badge>{takenTeamWons} / {turnsCount}</Badge>
