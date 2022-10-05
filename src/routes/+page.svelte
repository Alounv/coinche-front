<script lang="ts">
	import { onMount } from 'svelte';
	import type { GamePreview } from '../data/types';
	import { listGames, createGame, deleteGame, forceLeaveGame } from '../web/rest';
	import Message from '../components/Message.svelte';
	import { Input } from 'spaper';
	import GamesList from '../components/GamesList.svelte';

	let games: GamePreview[] = [];
	let newGameName = '';
	let message = '';
	let name = '';
	let interval: any;

	$: {
		if (name) localStorage.setItem('name', name);
	}

	onMount(() => {
		refreshList();
		name = localStorage.getItem('name') || '';
	});

	$: {
		clearInterval(interval);
		interval = setInterval(refreshList, 4000);
	}

	const refreshList = async () => {
		const { error, previews } = await listGames();
		if (previews) {
			games = previews;
		} else {
			message = error;
		}
	};

	const setMessage = (msg: string) => {
		message = msg;
		setTimeout(() => {
			message = '';
		}, 5000);
	};

	const createNewGame = async () => {
		const error = await createGame(newGameName);
		if (error) message = error;
		refreshList();
	};

	const deleteThisGame = async (gameId: number) => {
		const error = await deleteGame(gameId);
		if (error) setMessage(error);
		refreshList();
	};

	const forceLeave = async (gameID: number, name: string) => {
		const error = await forceLeaveGame(gameID, name);
		if (error) setMessage(error);
		refreshList();
	};
</script>

<h1>Let's play Coinche!</h1>

<Message {message} onClose={() => (message = '')} />

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

<style>
	.input-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
