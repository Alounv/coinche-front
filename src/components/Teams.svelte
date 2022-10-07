<script lang="ts">
	import type { Game } from '../data/types';
	import { getPlayers } from '../utils/game';
	import { Table } from 'spaper';

	export let game: Game;

	$: players = getPlayers(game);
	$: data = players.map(({ name, Team }) => ({
		Name: name,
		['❓']: Team === '' ? 'X' : '',
		['Team 🅰️']: Team === 'A' ? 'X' : '',
		['Team 🅱️']: Team === 'B' ? 'X' : ''
	}));
</script>

<Table {data} />
