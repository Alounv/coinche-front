<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let urlParams: URLSearchParams;
	let playerName = '';
	let gameID = '';

	if (window) {
		urlParams = new URLSearchParams(window.location.search);
		playerName = urlParams.get('player') || '';
		gameID = urlParams.get('game') || '';
	}
	let teamName = '';
	let game: any;

	let ws: WebSocket;
	let message = '';
	let teams: { name: string; players: { name: string }[] }[] = [];

	const leaveCurrentGame = async () => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify('leave'));
		}
	};

	const joinGame = async (gameId: number, playerName: string) => {
		await leaveCurrentGame();

		ws = new WebSocket(`ws://localhost:5000/games/${gameId}/join?playerName=${playerName}`);

		ws.onclose = () => {
			console.log('closed');
		};

		ws.onerror = () => {
			console.error('WS error');
		};

		ws.onmessage = async (event) => {
			const data = await event.data.text();
			message = data;
			game = JSON.parse(data);
			const newTeams: Record<string, { name: string; players: { name: string }[] }> = {};
			for (const name in game.Players) {
				const player = game.Players[name];
				const teamName = player.Team || 'Not in a team';
				console.log(teamName);
				newTeams[teamName] ??= { name: teamName, players: [] };
				newTeams[teamName].players.push({ name });
			}

			teams = [];
			for (const team in newTeams) {
				teams.push(newTeams[team]);
			}
		};
	};

	const joinTeam = () => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.send(JSON.stringify('joinTeam: ' + teamName));
		}
	};

	onMount(() => {
		if (!ws && playerName && gameID) {
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
<button on:click={joinTeam}>Join</button>

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

<svelte:window on:beforeunload={handleBeforeUnload} />
