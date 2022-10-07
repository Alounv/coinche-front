<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Game, Team } from '../data/types';
	import { getWinningTeam } from '../utils/game';
	import { Button, Table as PaperTable } from 'spaper';

	export let game: Game;
	export let start: () => void;

	const duration = 500;

	interface Line {
		Rank: number;
		Team: string;
		Score: number;
		Points: string;
	}

	let winningTeam: Team;
	let data: Line[];

	$: winners = winningTeam ? winningTeam.players.map((p) => p.name) : [];
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
</script>

<h5 class="border padding-large shadow" style="background-color: white;">
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
</h5>
