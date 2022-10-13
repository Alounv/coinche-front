export const getPlayerAndGameFromUrl = (): { playerName: string; gameId: number } => {
	const urlParams = new URLSearchParams(window.location.search)
	const playerName = urlParams.get('player') || ''
	const gameIdString = urlParams.get('game') || ''
	const gameId = parseInt(gameIdString)
	return { gameId, playerName }
}
