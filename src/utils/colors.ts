import type { Card } from '../data/enums'

const customHexColors: Record<string, string> = {
	club: '#0E6655',
	diamond: '#E74C3C',
	heart: '#DE3163',
	spade: '#1A5276'
}

const hexColors: Record<string, string> = {
	club: '#17202A',
	diamond: '#DE3131',
	heart: '#DE3131',
	spade: '#17202A'
}

export const getHexColor = (color: string, isCustom: boolean): string => {
	const colors = isCustom ? customHexColors : hexColors
	return color ? colors[color] : ''
}

export const getHexColorFromCard = (card: Card | null, isCustom: boolean): string => {
	const color = card ? card.split('-')[1] : ''
	return getHexColor(color, isCustom)
}
