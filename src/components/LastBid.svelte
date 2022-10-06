<script lang="ts">
	import { bidColors } from '../data/enums';
	import type { Game } from '../data/types';
	import { getLastBid, getTakenTeamWons } from '../utils/game';
	import { Badge } from 'spaper';
	import Coinche from './Coinche.svelte';

	export let game: Game;

	$: lastBid = getLastBid(game);
	$: trumpLabel = bidColors[lastBid.Color];
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
	<Coinche {coinche} />
</div>

Turns won by {lastBid.Player} team: <Badge>{takenTeamWons} / {turnsCount}</Badge>
