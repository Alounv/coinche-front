import type { BidColors, BidValues, Card } from 'src/data/enums'
import type { Game } from '../data/types'
import { variables } from '../variables'

const { WS_URL } = variables

interface ISocket {
	gameId: number
	playerName: string
	onMessage: (message: string) => void
	onGame: (game: Game) => void
}

export class GameSocket {
	private ws: WebSocket | null

	constructor({ gameId, playerName, onMessage, onGame }: ISocket) {
		this.ws = new WebSocket(`${WS_URL}/games/${gameId}/join?playerName=${playerName}`)

		this.ws.onopen = () => {
			this.send('ping')
		}

		this.ws.onclose = () => {
			console.info('WS closed')
		}

		this.ws.onerror = () => {
			console.error('WS error')
		}

		this.ws.onmessage = async (event) => {
			const data = await event.data.text()

			try {
				const parsedData = JSON.parse(data)
				if (typeof parsedData === 'string') {
					if (parsedData === 'pong') {
						setTimeout(() => {
							this.send('ping')
						}, 2000)
						return
					}
					onMessage(parsedData)
				} else {
					onGame(parsedData)
				}
			} catch (e) {
				console.error(e)
				onMessage(data)
			}
		}
	}

	private send(message: string) {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message))
		}
	}

	leave() {
		this.send('leave')
	}

	start() {
		this.send('start')
	}

	joinTeam(team: string) {
		this.send(`joinTeam: ${team}`)
	}

	bid({ value, color }: { value: BidValues; color: BidColors }) {
		this.send(`bid: ${color},${value}`)
	}

	pass() {
		this.send('bid: pass')
	}

	coinche() {
		this.send('bid: coinche')
	}

	play(card: Card) {
		this.send(`play: ${card}`)
	}
}
