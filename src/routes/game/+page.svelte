<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount, beforeUpdate } from 'svelte';
	import type { Game, PlayerWithName } from '../../data/types';
	import { BidValues, Card, type BidColors } from '../../data/enums';
	import { GameSocket } from '../../web/socket';
	import { getPlayerAndGameFromUrl } from '../../utils/url';
	import { CloseButton } from 'spaper';

	import GameArea from '../../components/Game.svelte';

	let name = '';
	let game: Game;
	let player: PlayerWithName;
	let message = '';
	let joinTeam: (team: string) => void = () => null;
	let start: () => void = () => null;
	let bid: (args: { value: BidValues; color: BidColors }) => void = () => null;
	let pass: () => void = () => null;
	let coinche: () => void = () => null;
	let play: (card: Card) => void = () => null;

	let gs: GameSocket;

	const onMessage = (msg: string): void => {
		message = msg;
		setTimeout(() => {
			message = '';
		}, 5000);
	};

	const onGame = (g: Game): void => {
		game = g;
		const currentPlayer = g.Players[name];
		if (currentPlayer) {
			player = { name, ...g.Players[name] };
		} else {
			message = 'You are not in this game';
		}
	};

	onMount(() => {
		window.addEventListener('popstate', onPopState);
		const { gameId, playerName } = getPlayerAndGameFromUrl();
		name = playerName;
		if (playerName && gameId) {
			gs = new GameSocket({ gameId, playerName, onMessage, onGame });
		}
	});

	const onPopState = () => {
		const { gameId, playerName } = getPlayerAndGameFromUrl();
		if (playerName !== name || gameId !== game?.ID) {
			gs?.leave();
			name = playerName;
			gs = new GameSocket({ gameId, playerName, onMessage, onGame });
		}
	};

	$: {
		joinTeam = (team: string) => gs.joinTeam(team);
		start = () => gs.start();
		bid = ({ value, color }) => gs.bid({ value, color });
		pass = () => gs.pass();
		coinche = () => gs.coinche();
		play = (card) => gs.play(card);
	}

	onDestroy(() => {
		gs?.leave();
	});
</script>

<svelte:window on:beforeunload={gs?.leave} />

<a href="/">Exit</a>

<div class="row flex-center text-danger margin-small" style="min-height: 1.25rem">
	{#if message}
		<div transition:fade>
			<CloseButton class="margin-left" on:click={() => (message = '')} />
			{message}
		</div>
	{/if}
</div>

<div>Phase: {game?.Phase}</div>
<div>Game name: {game?.Name}</div>

<GameArea {game} {player} {joinTeam} {start} {bid} {pass} {coinche} {play} />
