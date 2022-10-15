<script lang="ts">
	import { archiveGame, createGame, deleteGame, forceLeaveGame, listGames } from '../web/rest'
	import { onDestroy, onMount } from 'svelte'
	import type { GamePreview } from '../data/types'
	import GamesList from '../components/GamesList.svelte'
	import { Input } from 'spaper'
	import { showToast } from '../utils/toast'

	let games: GamePreview[] = []
	let newGameName = ''
	let name = ''
	let interval: ReturnType<typeof setTimeout>

	const REFRESH_INTERVAL = 10000

	$: {
		if (name) localStorage.setItem('name', name)
	}

	onMount(() => {
		refreshList()
		name = localStorage.getItem('name') || ''
		interval = setInterval(refreshList, REFRESH_INTERVAL)
	})

	onDestroy(() => {
		clearInterval(interval)
	})

	const refreshList = async () => {
		const { error, previews } = await listGames()
		if (previews) {
			games = previews
		} else {
			showToast({ message: error, type: 'danger' })
		}
	}
	const then = (error: string) => {
		if (error) showToast({ message: error, type: 'danger' })
		refreshList()
	}

	const createNewGame = async () => {
		const error = await createGame(newGameName)
		then(error)
	}

	const deleteThisGame = async (gameId: number) => {
		const error = await deleteGame(gameId)
		then(error)
	}

	const archiveThisGame = async (gameId: number) => {
		const error = await archiveGame(gameId)
		then(error)
	}

	const forceLeave = async (gameID: number, name: string) => {
		const error = await forceLeaveGame(gameID, name)
		then(error)
	}
</script>

<div style="margin-left: auto; margin-right: auto;">
	<h1>Let's play Coinche!</h1>

	<div class="input-row">
		<label for="name">Set player name</label>
		<Input id="name" bind:value={name} />
	</div>

	<h4>Games</h4>

	<form on:submit|preventDefault={createNewGame} class="input-row">
		<label for="create-game">Create new game</label>
		<input id="create-game" bind:value={newGameName} />
		<div>(press <span class="badge">Enter</span> to create)</div>
	</form>

	<GamesList
		{games}
		playerName={name}
		archiveGame={archiveThisGame}
		deleteGame={deleteThisGame}
		{forceLeave}
	/>
</div>

<style>
	.input-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
