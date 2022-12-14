<script lang="ts">
	import { Button, Table as PaperTable } from 'spaper'
	import type { Game, Team } from '../data/types'
	import { fade } from 'svelte/transition'
	import { getWinningTeam } from '../utils/game'

	export let game: Game
	export let start: () => void
	export let playerName: string

	const duration = 500

	interface Line {
		Rank: number
		Team: string
		Score: number
		Points: number
	}

	let winningTeam: Team
	let data: Line[]
	let areTakersWinners: boolean

	$: winners = winningTeam ? winningTeam.players.map((p) => p.name) : []
	$: {
		console.info('TURNS', game.Turns) // we keep this for debugging
		const { winner, loser, areTakersWinners: tw } = getWinningTeam(game)
		areTakersWinners = tw
		winningTeam = winner

		data = [winner, loser].reduce<Line[]>((acc, { players, score, points }) => {
			acc.push({
				Points: points,
				Rank: 0,
				Score: score,
				Team: players.map((p) => p.name).join(' & ')
			})
			return acc
		}, [])

		data.sort((a, b) => b.Score - a.Score)

		data = data.map(({ Team, Score, Points }, index) => {
			return {
				Points,
				Rank: index + 1,
				Score,
				Team
			}
		})
	}
	$: scoreMessage = `with ${winningTeam.points} points!`
	$: message = winners.includes(playerName) ? 'Yeahhhh 🎉' : '(Sorry 😗)'
</script>

<h5 class="border p-8 shadow bg-white flex flex-col">
	And the winners are...
	<h4 class="m-4" in:fade={{ delay: 2000, duration }}>
		{winners.join(' and ')}
		{areTakersWinners ? scoreMessage : '!'}
		{message}
	</h4>

	<div in:fade={{ delay: 4000, duration }}>
		<PaperTable {data} class="m-4" />
	</div>

	<div class="self-end" in:fade={{ delay: 4000, duration }}>
		<Button on:click={start}>Restart</Button>
	</div>
</h5>
