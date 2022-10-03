<script lang="ts">
	import { onMount } from 'svelte';
	import type { GamePreview } from '../types';
	import { listGames, createGame, deleteGame, forceLeaveGame } from '../rest';

	let games: GamePreview[] = [];
	let newGameName = '';
	let message = '';
	let name = '';

	onMount(() => {
		refreshList();
		name = localStorage.getItem('name') || '';
	});

	const refreshList = async () => {
		const { error, previews } = await listGames();
		if (previews) {
			games = previews;
		} else {
			message = error;
		}
	};

	const createNewGame = async () => {
		const error = await createGame(newGameName);
		if (error) message = error;
		refreshList();
	};

	const deleteThisGame = async (gameId: number) => {
		const error = await deleteGame(gameId);
		if (error) message = error;
		refreshList();
	};

	const forceLeave = async (gameID: number, name: string) => {
		const error = await forceLeaveGame(gameID, name);
		if (error) message = error;
		refreshList();
	};

	const changeName = (value: string) => {
		localStorage.setItem('name', value);
	};
</script>

<h1>Test connection to server</h1>

<h2>Your name is: {name}</h2>
<div>
	<label for="name">Set name</label>
	<input id="name" bind:value={name} on:change={(e) => changeName(e.currentTarget.value)} />
</div>

<button on:click={refreshList}>Refresh list</button>

<form on:submit|preventDefault={createNewGame}>
	<label for="create-game">Create new game</label>
	<input id="create-game" bind:value={newGameName} />
</form>

<ul>
	{#each games as game (game.ID)}
		<li>
			<button on:click={() => deleteThisGame(game.ID)}>Delete</button>
			<button on:click={() => forceLeave(game.ID, name)}>Force Leave</button>
			<a href={`/game?game=${game.ID}&player=${name}`}>{game.Name}</a>

			<span>{game.ID}</span>
			<span>{game.TurnsCount}</span>
			<span>{game.Phase}</span>
			<span>{game.Players}</span>
		</li>
	{/each}
</ul>

<div style="color: red;">{message}</div>
