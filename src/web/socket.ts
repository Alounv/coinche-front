import type { Game } from '../data/types';

interface ISocket {
	gameId: number;
	playerName: string;
	onMessage: (message: string) => void;
	onGame: (game: Game) => void;
}

export class GameSocket {
	private ws: WebSocket | null;

	constructor({ gameId, playerName, onMessage, onGame }: ISocket) {
		this.ws = new WebSocket(`ws://localhost:5000/games/${gameId}/join?playerName=${playerName}`);

		this.ws.onclose = () => {
			console.info('WS closed');
		};

		this.ws.onerror = () => {
			console.error('WS error');
		};

		this.ws.onmessage = async (event) => {
			const data = await event.data.text();

			try {
				const parsedData = JSON.parse(data);
				if (typeof parsedData === 'string') {
					onMessage(parsedData);
				} else {
					onGame(parsedData);
				}
			} catch (e) {
				console.error(e);
				onMessage(data);
			}
		};
	}

	private send(message: string) {
		if (this.ws?.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message));
		}
	}

	leave() {
		this.send('leave');
	}

	start() {
		this.send('start');
	}

	joinTeam(teamName: string) {
		if (teamName) this.send(`joinTeam: ${teamName}`);
	}

	bid({ value, color }: { value: number; color: string }) {
		this.send(`bid: ${color},${value}`);
	}

	pass() {
		this.send('bid: pass');
	}

	coinche() {
		this.send('bid: coinche');
	}
}
