import { type BidColors, BidSpecificColors, BidValues, Card, cardsOrder } from '../data/enums'
import type { BidWithValue, Game, PlayerWithName, Team, Turn } from '../data/types'

export const getPlayers = (game: Game): PlayerWithName[] => {
	const players = []
	for (const name in game.Players) {
		players.push({ name, ...game.Players[name] })
	}
	players.sort((a, b) => a.InitialOrder - b.InitialOrder)
	return players
}

export const getCurrentPlayer = (game: Game): PlayerWithName | undefined => {
	const players = getPlayers(game)
	return players.find((p) => p.Order === 1)
}

export const getBids = (game: Game): BidWithValue[] => {
	const bids = []
	for (const v in game.Bids) {
		const value = v as unknown as BidValues
		const BidWithValue: BidWithValue = { value, ...game.Bids[value] }
		bids.push(BidWithValue)
	}
	return bids
}

export const getLastBid = (game: Game): BidWithValue => {
	const bids = getBids(game)
	return bids[bids.length - 1]
}

export const getTeams = (game: Game): Team[] => {
	if (!game) return []

	const players = game.Players
	const teams: Team[] = []
	for (const name in players) {
		const player = { name, ...players[name] }
		const teamName = player.Team || 'Not in a team'
		const team = teams.find((t) => t.name === teamName)
		if (team) {
			team.players.push(player)
		} else {
			teams.push({
				name: teamName,
				players: [player],
				points: game.Points?.[teamName],
				score: game.Scores?.[teamName]
			})
		}
	}

	return teams
}

export const getPlayersPositions = ({
	players,
	currentPlayerOrder: o
}: {
	players: PlayerWithName[]
	currentPlayerOrder: number
}): { left: PlayerWithName; right: PlayerWithName; front: PlayerWithName } => {
	if (players.length !== 4) throw new Error('Invalid number of players')
	const left = players.find((p) => [o + 1, o - 3].includes(p.Order)) as PlayerWithName
	const right = players.find((p) => [o - 1, o + 3].includes(p.Order)) as PlayerWithName
	const front = players.find((p) => [o - 2, o + 2].includes(p.Order)) as PlayerWithName
	return { front, left, right }
}

export const getPlayerWinsCount = (turns: Turn[], playerName: string): number => {
	const wins = turns.filter((t) => t.Winner === playerName)
	return wins.length
}

export const getWinningTeam = (
	game: Game
): { winner: Team; loser: Team; areTakersWinners: boolean } => {
	if (game.Turns.length < 8) throw new Error('Game not finished')

	const teams = getTeams(game)
	const lastBid = getLastBid(game)
	const lastBidder = lastBid.Player
	const takingTeamName = game.Players[lastBidder].Team

	const takingTeam = teams.find((t) => t.name === takingTeamName) as Team
	const notTakingTeam = teams.find((t) => t.name !== takingTeamName) as Team

	const areTakersWinners = takingTeam?.points >= lastBid.value
	if (areTakersWinners) {
		return { areTakersWinners, loser: notTakingTeam, winner: takingTeam }
	} else {
		return { areTakersWinners, loser: takingTeam, winner: notTakingTeam }
	}
}

export const getSortedCards = (cards: Card[], trump: BidColors): Card[] => {
	const colors = cards.reduce(
		(acc, card) => {
			const color = card.split('-')[1]
			acc[color].push(card)
			return acc
		},
		{ club: [], diamond: [], heart: [], spade: [] } as Record<string, Card[]>
	)

	for (const color in colors) {
		const isTrump = trump === BidSpecificColors.AllTrump || color === trump
		if (isTrump) {
			colors[color].sort((a, b) => cardsOrder[b].trumpRank - cardsOrder[a].trumpRank)
		} else {
			colors[color].sort((a, b) => cardsOrder[b].rank - cardsOrder[a].rank)
		}
	}

	const { club, diamond, heart, spade } = colors

	if (!diamond.length) {
		return [...club, ...heart, ...spade]
	}

	if (!spade.length) {
		return [...diamond, ...club, ...heart]
	}

	return [...club, ...diamond, ...spade, ...heart]
}
