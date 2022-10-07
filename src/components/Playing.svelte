<script lang="ts">
	import { fade } from 'svelte/transition';
	import { type Card, Phases } from '../data/enums';
	import type { PlayerWithName, Game, Team } from '../data/types';
	import LastTurns from './LastTurns.svelte';
	import Table from './Table.svelte';
	import { getPlayers, getPlayersPositions, getWinningTeam } from '../utils/game';
	import { Button, Table as PaperTable } from 'spaper';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;
	export let start: () => void;

	const LAST_TURN_SHOWING_TIME = 0;

	let isHandShown = true;

	$: players = getPlayers(game);
	$: playersPositions = getPlayersPositions({
		players,
		currentPlayerOrder: player.Order
	});

	$: {
		if (game.Phase === Phases.Counting && isHandShown) {
			setTimeout(() => {
				isHandShown = false;
			}, LAST_TURN_SHOWING_TIME);
		}
	}

	let winningTeam: Team;

	interface Line {
		Rank: number;
		Team: string;
		Score: number;
		Points: string;
	}

	let data: Line[];

	$: {
		const { winner, loser } = getWinningTeam(game);
		winningTeam = winner;

		data = [winner, loser].reduce<Line[]>((acc, { players, score, points }) => {
			acc.push({
				Team: players.map((p) => p.name).join(' & '),
				Score: score,
				Points: `(+${points})`,
				Rank: 0
			});
			return acc;
		}, []);

		data.sort((a, b) => b.Score - a.Score);

		data = data.map(({ Team, Score, Points }, index) => {
			return {
				Rank: index + 1,
				Team,
				Score,
				Points
			};
		});
	}
	$: winners = winningTeam ? winningTeam.players.map((p) => p.name) : [];

	const duration = 500;
</script>

<Table {player} {game} {play}>
	<div
		slot="middle"
		class="border shadow"
		style="display: flex; align-items: center; justify-content: center; flex: 1; background-color: white;"
	>
		<h5>
			{#if isHandShown}
				<LastTurns turns={game.Turns} {...playersPositions} {player} />
			{:else}
				And the winners are...
				<h4 class="margin" in:fade={{ delay: 2000, duration }}>
					<span>{winners.join(' and ')}</span>
					with {winningTeam.points} points!
				</h4>

				<div in:fade={{ delay: 4000, duration }}>
					<PaperTable {data} class="margin" />
				</div>

				<div style="display: flex; justify-content: flex-end;" in:fade={{ delay: 4000, duration }}>
					<Button on:click={start}>Restart</Button>
				</div>
			{/if}
		</h5>
	</div>
</Table>
