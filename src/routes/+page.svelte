<script lang="ts">
	import { onMount } from 'svelte';
	interface GamePreview {
		ID: number;
		Name: string;
		Players: string[];
		TurnsCount: number;
		Phase: string;
		CreatedAt: string;
	}
	let games: GamePreview[] = [];
	let newGameName = '';
	let message = '';
	let name = '';

	const refreshList = async () => {
		const response = await fetch('http://localhost:5000/games/all', {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const data = await response.json();
		if (data.error) {
			message = data.error;
		} else {
			(data as GamePreview[]).sort((a, b) => a.ID - b.ID);
			games = data;
		}
	};

	const createGame = async () => {
		const response = await fetch(`http://localhost:5000/games/create?name=${newGameName}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' }
		});

		const { error } = await response.json();

		if (error) {
			message = error;
		}
		refreshList();
	};

	const deleteGame = async (gameId: number) => {
		const response = await fetch(`http://localhost:5000/games/${gameId}/delete`, {
			method: 'DELETE',
			headers: { 'content-type': 'application/json' }
		});
		const { error } = await response.json();

		if (error) {
			message = error;
		}
		refreshList();
	};

	const forceLeaveGame = async (gameID: number, name: string) => {
		const response = await fetch(`http://localhost:5000/games/${gameID}/leave?playerName=${name}`, {
			method: 'PUT',
			headers: { 'content-type': 'application/json' }
		});
		const { error } = await response.json();

		if (error) {
			message = error;
		}
		refreshList();
	};

	const handleNameChange = (event: Event) => {
		const { value } = event.target as HTMLInputElement;
		localStorage.setItem('name', value);
	};

	onMount(() => {
		refreshList();
		name = localStorage.getItem('name') || '';
	});
</script>

<h1>Test connection to server</h1>

<h2>Your name is: {name}</h2>
<div>
	<label for="name">Set name</label>
	<input id="name" bind:value={name} on:change={handleNameChange} />
</div>

<button on:click={refreshList}>Refresh list</button>

<form on:submit|preventDefault={createGame}>
	<label for="create-game">Create new game</label>
	<input id="create-game" bind:value={newGameName} />
</form>

<ul>
	{#each games as game (game.ID)}
		<li>
			<button on:click={() => deleteGame(game.ID)}>Delete</button>
			<button on:click={() => forceLeaveGame(game.ID, name)}>Force Leave</button>
			<a href={`/game?game=${game.ID}&player=${name}`}>{game.Name}</a>

			<span>{game.ID}</span>
			<span>{game.TurnsCount}</span>
			<span>{game.Phase}</span>
			<span>{game.Players}</span>
		</li>
	{/each}
</ul>

<div style="color: red;">{message}</div>
