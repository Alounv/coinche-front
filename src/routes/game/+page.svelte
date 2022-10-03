<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Game, PlayerWithName } from '../../data/types';
	import { Phase } from '../../data/enums';
	import { GameSocket } from '../../web/socket';
	import { getPlayerAndGameFromUrl } from '../../utils/url';
	import { initialGame, initialPlayer } from '../../data/initials';

	import Teaming from '../../components/teaming.svelte';
	import Bidding from '../../components/bidding.svelte';

	let name = '';
	let currentGame: Game = initialGame;
	let currentPlayer: PlayerWithName = initialPlayer;
	let message = '';
	let joinTeam: (team: string) => void = () => null;
	let start: () => void = () => null;

	let gs: GameSocket;

	const onMessage = (msg: string): void => {
		message = msg;
	};

	const onGame = (game: Game): void => {
		currentGame = game;
		currentPlayer = { name, ...game.Players[name] };
	};

	onMount(() => {
		const { gameId, playerName } = getPlayerAndGameFromUrl();
		name = playerName;
		if (playerName && gameId) {
			gs = new GameSocket({ gameId, playerName, onMessage, onGame });

			joinTeam = (team: string) => gs.joinTeam(team);
			start = () => gs.start();
		}
	});

	onDestroy(() => gs?.leave());
</script>

<svelte:window on:beforeunload={gs?.leave} />

<div style="color: red;">{message}</div>
<div>Phase: {currentGame?.Phase}</div>
<div>Game name: {currentGame?.Name}</div>

{#if currentGame.Phase === Phase.Teaming}
	<Teaming game={currentGame} {start} {joinTeam} />
{:else if currentGame.Phase === Phase.Bidding}
	<Bidding player={currentPlayer} game={currentGame} />
{/if}
