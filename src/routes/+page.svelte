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

	const refreshList = async () => {
		const response = await fetch('http://localhost:5000/games/all', {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		games = await response.json();
	};

	const createGame = async () => {
		await fetch(`http://localhost:5000/games/create?name=${newGameName}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		refreshList();
	};

	const deleteGame = async (gameId: number) => {
		await fetch(`http://localhost:5000/games/delete?id=${gameId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		});

		refreshList();
	};

	onMount(() => {
		refreshList();
	});
</script>

<h1>Test connection to server</h1>

<button on:click={refreshList}>Refresh list</button>
<div>
	<form on:submit|preventDefault={createGame}>
		<label>Create new game</label>
		<input bind:value={newGameName} />
	</form>
</div>

<ul>
	{#each games as game}
		<li>
			<span>{game.ID}</span>
			<span>{game.Name}</span>
			<span>{game.TurnsCount}</span>
			<span>{game.Phase}</span>
			<span>{game.Players}</span>
			<button on:click={() => deleteGame(game.ID)}>Delete</button>
		</li>
	{/each}
</ul>
