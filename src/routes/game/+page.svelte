<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	const urlParams = new URLSearchParams(window.location.search);
	const playerName = urlParams.get('player');
	const gameID = urlParams.get('game');

	let ws: WebSocket;
	let message = '';

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
		};
	};

	onMount(() => {
		if (playerName && gameID) {
			joinGame(parseInt(gameID), playerName);
		}
	});

	onDestroy(() => {
		leaveCurrentGame();
	});
</script>

<div>GAME</div>
<a href="/">Back</a>

<div style="color: red;">{message}</div>
