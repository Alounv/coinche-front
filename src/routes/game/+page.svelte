<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Game, PlayerWithName } from '../../data/types';
	import type { BidValues, Card, BidColors } from '../../data/enums';
	import { GameSocket } from '../../web/socket';
	import { getPlayerAndGameFromUrl } from '../../utils/url';

	import GameArea from '../../components/Game.svelte';
	import { showToast } from '../../utils/toast';
	import { CloseButton } from 'spaper';

	let name = '';
	let game: Game;
	let player: PlayerWithName;
	let joinTeam: (team: string) => void = () => null;
	let start: () => void = () => null;
	let bid: (args: { value: BidValues; color: BidColors }) => void = () => null;
	let pass: () => void = () => null;
	let coinche: () => void = () => null;
	let play: (card: Card) => void = () => null;

	let gs: GameSocket;

	const onMessage = (msg: string): void => {
		showToast({ message: msg, type: 'danger' });
	};

	const onGame = (g: Game): void => {
		game = g;
		const currentPlayer = g.Players[name];
		if (currentPlayer) {
			player = { name, ...g.Players[name] };
		} else {
			showToast({ message: 'You are not in this game', type: 'danger' });
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

	const goBackHome = () => {
		window.location.href = `/`;
	};
</script>

<svelte:window on:beforeunload={gs?.leave} />

<div style="position: absolute; top: 2rem; right: 3rem; z-index: 1000;">
	<CloseButton on:click={goBackHome} />
</div>

<div class="background-secondary border" style="flex: 1; display: flex; flex-direction: column;">
	<GameArea {game} {player} {joinTeam} {start} {bid} {pass} {coinche} {play} />
</div>
