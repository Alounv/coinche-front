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
	let ws: WebSocket;
	let message = '';
	let name = ''; // save name somewhere ? localStorage ? store ?

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
			// should be games/id/delete
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		});

		refreshList();
	};

	const joinGame = async (gameId: number, playerName: string) => {
		ws = new WebSocket(`ws://localhost:5000/games/${gameId}/join?playerName=${playerName}`);

		ws.onclose = () => {
			console.log('closed');
			refreshList();
		};

		ws.onerror = () => {
			console.error('WS error');
			refreshList();
		};

		ws.onmessage = async (event) => {
			const data = await event.data.text();
			console.log(data);
			message = data;
			refreshList();
		};
	};

	onMount(() => {
		refreshList();
	});
</script>

<h1>Test connection to server</h1>

<h2>Your name is: {name}</h2>
<div>
	<label htmlfor="name">Set name</label>
	<input id="name" bind:value={name} />
</div>

<button on:click={refreshList}>Refresh list</button>

<form on:submit|preventDefault={createGame}>
	<label htmlFor="create-game">Create new game</label>
	<input id="create-game" bind:value={newGameName} />
</form>

<div style="color: red;">{message}</div>

<ul>
	{#each games as game}
		<li>
			<span>{game.ID}</span>
			<span>{game.Name}</span>
			<span>{game.TurnsCount}</span>
			<span>{game.Phase}</span>
			<span>{game.Players}</span>
			<button on:click={() => deleteGame(game.ID)}>Delete</button>
			<button on:click={() => joinGame(game.ID, name)}>Join</button>
		</li>
	{/each}
</ul>
