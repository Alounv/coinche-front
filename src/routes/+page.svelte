<script lang="ts">
	import { onMount } from 'svelte';
	import type { GamePreview } from '../data/types';
	import { listGames, createGame, deleteGame, forceLeaveGame } from '../web/rest';
	import { Input } from 'spaper';
	import GamesList from '../components/GamesList.svelte';
	import { showToast } from '../utils/toast';

	let games: GamePreview[] = [];
	let newGameName = '';
	let name = '';

	$: {
		if (name) localStorage.setItem('name', name);
	}

	onMount(() => {
		refreshList();
		name = localStorage.getItem('name') || '';
	});

	const refreshList = async () => {
		const { error, previews } = await listGames();
		if (previews) {
			games = previews;
		} else {
			showToast({ message: error, type: 'danger' });
		}
	};

	const createNewGame = async () => {
		const error = await createGame(newGameName);
		if (error) showToast({ message: error, type: 'danger' });
		refreshList();
	};

	const deleteThisGame = async (gameId: number) => {
		const error = await deleteGame(gameId);
		if (error) showToast({ message: error, type: 'danger' });
		refreshList();
	};

	const forceLeave = async (gameID: number, name: string) => {
		const error = await forceLeaveGame(gameID, name);
		if (error) showToast({ message: error, type: 'danger' });
		refreshList();
	};
</script>

<div style="margin-left: auto; margin-right: auto;">
	<h1>Let's play Coinche!</h1>

	<div class="input-row">
		<label for="name">Set player name</label>
		<Input id="name" bind:value={name} />
	</div>

	<h4>Games</h4>

	<form on:submit|preventDefault={createNewGame} class="input-row">
		<label for="create-game">Create new game</label>
		<input id="create-game" bind:value={newGameName} />
		<div>(press <span class="badge">Enter</span> to create)</div>
	</form>

	<GamesList {games} playerName={name} deleteGame={deleteThisGame} {forceLeave} />
</div>

<style>
	.input-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
