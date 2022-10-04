<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import type { Game, PlayerWithName } from '../../data/types';
	import { BidValues, Card, Phase, type BidColors } from '../../data/enums';
	import { GameSocket } from '../../web/socket';
	import { getPlayerAndGameFromUrl } from '../../utils/url';
	import { CloseButton } from 'spaper';

	import Teaming from '../../components/Teaming.svelte';
	import Bidding from '../../components/Bidding.svelte';
	import Playing from '../../components/Playing.svelte';
	import Counting from '../../components/Counting.svelte';

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
	let phase: Phase = Phase.Teaming;

	let gs: GameSocket;

	const onMessage = (msg: string): void => {
		message = msg;
		setTimeout(() => {
			message = '';
		}, 5000);
	};

	const onGame = (g: Game): void => {
		game = g;
		player = { name, ...g.Players[name] };
		phase = g.Phase;
	};

	onMount(() => {
		const { gameId, playerName } = getPlayerAndGameFromUrl();
		name = playerName;
		if (playerName && gameId) {
			gs = new GameSocket({ gameId, playerName, onMessage, onGame });

			joinTeam = (team: string) => gs.joinTeam(team);
			start = () => gs.start();
			bid = ({ value, color }) => gs.bid({ value, color });
			pass = () => gs.pass();
			coinche = () => gs.coinche();
			play = (card) => gs.play(card);
		}
	});

	onDestroy(() => gs?.leave());
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

<div>Phase: {phase}</div>
<div>Game name: {game?.Name}</div>

{#if game}
	{#if phase === Phase.Teaming}
		<Teaming {game} {start} {joinTeam} />
	{:else if phase === Phase.Bidding}
		<Bidding {player} {game} {bid} {pass} {coinche} />
	{:else if phase === Phase.Playing}
		<Playing {player} {game} {play} />
	{:else if phase === Phase.Counting}
		<Counting {game} {start} />
	{/if}
{/if}
