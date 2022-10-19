import { describe, expect, it } from 'bun:test'
import { BidSpecificColors, BidValues, Card, Colors, Phases } from '../data/enums'
import type { Game, Player, Turn } from '../data/types'
import {
	getBids,
	getCurrentPlayer,
	getLastBid,
	getPlayerWinsCount,
	getPlayers,
	getPlayersPositions,
	getSortedCards,
	getTeams,
	getWinningTeam
} from './game'

const mockPlayers: Record<string, Player> = {
	P1: {
		Hand: [],
		InitialOrder: 4,
		Order: 4,
		Team: 'Even'
	},
	P2: {
		Hand: [],
		InitialOrder: 2,
		Order: 2,
		Team: 'Even'
	},
	P3: {
		Hand: [],
		InitialOrder: 3,
		Order: 3,
		Team: 'Odd'
	},
	P4: {
		Hand: [],
		InitialOrder: 1,
		Order: 1,
		Team: 'Odd'
	}
}

const mockBids = {
	[BidValues.Eighty]: {
		Coinche: 0,
		Color: Colors.Heart,
		Pass: 0,
		Player: 'P1'
	},
	[BidValues.Ninety]: {
		Coinche: 1,
		Color: Colors.Spade,
		Pass: 3,
		Player: 'P2'
	}
}

const mockTurn: Turn[] = [
	{
		Plays: [],
		Winner: 'P1'
	},
	{
		Plays: [],
		Winner: 'P1'
	},
	{
		Plays: [],
		Winner: 'P2'
	},
	{
		Plays: [],
		Winner: 'P3'
	},
	{
		Plays: [],
		Winner: 'P3'
	},
	{
		Plays: [],
		Winner: 'P3'
	},
	{
		Plays: [],
		Winner: 'P3'
	},
	{
		Plays: [],
		Winner: 'P3'
	}
]

const mockGame: Game = {
	Bids: mockBids,
	ID: 1,
	Name: 'Test Game',
	Phase: Phases.Bidding,
	Players: mockPlayers,
	Points: {
		Even: 112,
		Odd: 50
	},
	Scores: {
		Even: 160,
		Odd: 0
	},
	Turns: mockTurn
}

describe('getPlayers', () => {
	it('should return game players sorted by order', () => {
		const players = getPlayers(mockGame)

		expect(players.length).toBe(4)

		expect(players[0].Order).toBe(1)
		expect(players[0].Team).toBe('Odd')
		expect(players[0].InitialOrder).toBe(1)
		expect(players[0].Hand.length).toBe(0)

		expect(players[1].Order).toBe(2)
		expect(players[2].Order).toBe(3)
		expect(players[3].Order).toBe(4)
	})
})

describe('getCurrentPlayer', () => {
	it('should return the current player', () => {
		const currentPlayer = getCurrentPlayer(mockGame)

		expect(currentPlayer?.Order).toBe(1)
		expect(currentPlayer?.name).toBe('P4')
	})
})

describe('getBids', () => {
	it('should return game bids with values', () => {
		const bids = getBids(mockGame)

		expect(bids.length).toBe(2)

		expect(bids[0].value.toString()).toBe(BidValues.Eighty.toString())
		expect(bids[0].Coinche).toBe(0)

		expect(bids[1].value.toString()).toBe(BidValues.Ninety.toString())
		expect(bids[1].Coinche).toBe(1)
	})
})

describe('getLastBid', () => {
	it('should return the last bid', () => {
		const lastBid = getLastBid(mockGame)

		expect(lastBid.value.toString()).toBe(BidValues.Ninety.toString())
	})
})

describe('getTeams', () => {
	it('should return game teams', () => {
		const teams = getTeams(mockGame)

		expect(teams.length).toBe(2)

		expect(teams[0].name).toBe('Even')
		expect(teams[0].players.length).toBe(2)
		expect(teams[0].players[0].name).toBe('P1')
		expect(teams[0].players[1].name).toBe('P2')
		expect(teams[0].score).toBe(160)
		expect(teams[0].points).toBe(112)
	})
})

describe('getPlayersPositions', () => {
	const players = getPlayers(mockGame)

	it('should return players positions with order 1', () => {
		const { front, left, right } = getPlayersPositions({ currentPlayerOrder: 1, players })

		expect(front.name).toBe('P3')
		expect(left.name).toBe('P2')
		expect(right.name).toBe('P1')
	})

	it('should return players positions with order 2', () => {
		const { front, left, right } = getPlayersPositions({ currentPlayerOrder: 2, players })

		expect(front.name).toBe('P1')
		expect(left.name).toBe('P3')
		expect(right.name).toBe('P4')
	})
})

describe('getPlayerWinsCount', () => {
	it('should return the number of wins for a player', () => {
		const P1WinCount = getPlayerWinsCount(mockTurn, 'P1')
		const P2WinCount = getPlayerWinsCount(mockTurn, 'P2')
		const P3WinCount = getPlayerWinsCount(mockTurn, 'P3')
		const P4WinCount = getPlayerWinsCount(mockTurn, 'P4')

		expect(P1WinCount).toBe(2)
		expect(P2WinCount).toBe(1)
		expect(P3WinCount).toBe(5)
		expect(P4WinCount).toBe(0)
	})
})

describe('getWinningTeam', () => {
	it('should return the winning team', () => {
		const { winner, loser } = getWinningTeam(mockGame)

		expect(winner.name).toBe('Even')
		expect(loser.name).toBe('Odd')
	})
})

describe('getSortedCards', () => {
	it('should return sorted cards, with 0 cards', () => {
		const cards: Card[] = []
		const sortedCards = getSortedCards(cards, Colors.Spade)
		expect(sortedCards.length).toBe(0)
	})

	it('should return sorted cards with no trump and all colors', () => {
		const cards: Card[] = [Card.C10, Card.CA, Card.S7, Card.S8, Card.D7, Card.H7]
		const sortedCards = getSortedCards(cards, BidSpecificColors.NoTrump)

		expect(sortedCards.length).toBe(6)

		expect(sortedCards[0]).toBe(Card.CA)
		expect(sortedCards[1]).toBe(Card.C10)
		expect(sortedCards[2]).toBe(Card.D7)
		expect(sortedCards[3]).toBe(Card.S8)
		expect(sortedCards[4]).toBe(Card.S7)
		expect(sortedCards[5]).toBe(Card.H7)
	})

	it('should return sorted cards with trump', () => {
		const cards: Card[] = [Card.C10, Card.CA, Card.C9, Card.CJ, Card.S7, Card.S8, Card.D7, Card.H7]
		const sortedCards = getSortedCards(cards, Colors.Club)

		expect(sortedCards.length).toBe(8)

		expect(sortedCards[0]).toBe(Card.CJ)
		expect(sortedCards[1]).toBe(Card.C9)
		expect(sortedCards[2]).toBe(Card.CA)
		expect(sortedCards[3]).toBe(Card.C10)
		expect(sortedCards[4]).toBe(Card.D7)
		expect(sortedCards[5]).toBe(Card.S8)
		expect(sortedCards[6]).toBe(Card.S7)
		expect(sortedCards[7]).toBe(Card.H7)
	})

	it('should keep black colors apart if three colors', () => {
		const cards: Card[] = [Card.CA, Card.S7, Card.H7]
		const sortedCards = getSortedCards(cards, BidSpecificColors.NoTrump)

		expect(sortedCards.length).toBe(3)

		expect(sortedCards[0]).toBe(Card.CA)
		expect(sortedCards[1]).toBe(Card.H7)
		expect(sortedCards[2]).toBe(Card.S7)
	})

	it('should keep red colors apart if three colors', () => {
		const cards: Card[] = [Card.CA, Card.D7, Card.H7]
		const sortedCards = getSortedCards(cards, BidSpecificColors.NoTrump)

		expect(sortedCards.length).toBe(3)

		expect(sortedCards[0]).toBe(Card.D7)
		expect(sortedCards[1]).toBe(Card.CA)
		expect(sortedCards[2]).toBe(Card.H7)
	})
})
