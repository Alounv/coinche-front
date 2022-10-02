<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let urlParams: URLSearchParams;
	let playerName = '';
	let gameID = '';
	let currentPlayer: any;

	let teamName = '';
	let game: any;

	let ws: WebSocket;
	let message = '';
	let teams: { name: string; players: { name: string }[] }[] = [];

	const leaveCurrentGame = () => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify('leave'));
		}
	};

	const joinGame = async (gameId: number, playerName: string) => {
		ws = new WebSocket(`ws://localhost:5000/games/${gameId}/join?playerName=${playerName}`);

		ws.onclose = () => {
			console.log('closed');
		};

		ws.onerror = () => {
			console.error('WS error');
		};

		ws.onmessage = async (event) => {
			const data = await event.data.text();
			console.log(data);
			try {
				game = JSON.parse(data);
			} catch (e) {
				console.error(e);
				message = data;
			}
			const newTeams: Record<string, { name: string; players: { name: string }[] }> = {};
			for (const name in game.Players) {
				const player = game.Players[name];

				const teamName = player.Team || 'Not in a team';
				newTeams[teamName] ??= { name: teamName, players: [] };
				newTeams[teamName].players.push({ name });
				if (name === playerName) {
					currentPlayer = player;
				}
			}

			teams = [];
			for (const team in newTeams) {
				teams.push(newTeams[team]);
			}
		};
	};

	const joinTeam = () => {
		if (!!teamName && ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify('joinTeam: ' + teamName));
		}
	};

	const startGame = () => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify('start'));
		}
	};

	onMount(() => {
		urlParams = new URLSearchParams(window.location.search);
		playerName = urlParams.get('player') || '';
		gameID = urlParams.get('game') || '';

		if (playerName && gameID) {
			joinGame(parseInt(gameID), playerName);
		}
	});

	onDestroy(() => {
		leaveCurrentGame();
	});

	const handleBeforeUnload = () => {
		leaveCurrentGame();
	};
</script>

<div>GAME</div>
<a href="/">Back</a>

<div style="color: red;">{message}</div>

<form on:submit|preventDefault={joinTeam}>
	<label for="team-name">My team</label>
	<input id="team-name" type="text" bind:value={teamName} />
</form>

<div>Phase: {game?.Phase}</div>

<div>
	<p>Game name: {game?.Name}</p>
	<ul>
		{#each teams as team (team.name)}
			<li>
				{team.name}
				<ul>
					{#each team.players as player (player.name)}
						<li>{player.name}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

{#if game?.Phase === 1}
	<button on:click={startGame}>Start</button>
{/if}

<svelte:window on:beforeunload={handleBeforeUnload} />

<div>{currentPlayer?.Hand}</div>
<div>{playerName}</div>
