<script lang="ts">
	import type { Game } from '../data/types'
	import { Table } from 'spaper'
	import { getPlayers } from '../utils/game'

	export let game: Game

	$: players = getPlayers(game)
	$: data = players.map(({ name, Team }) => ({
		['Name']: name,
		['Team 🅰️']: Team === 'A' ? 'X' : '',
		['Team 🅱️']: Team === 'B' ? 'X' : ''
	}))
</script>

<div class="p-4 bg-white w-80">
	<Table {data} />
</div>
