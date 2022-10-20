import { Card } from '../data/enums'
import clubs_10 from '../cards/clubs_10.svg?raw'
import clubs_7 from '../cards/clubs_7.svg?raw'
import clubs_8 from '../cards/clubs_8.svg?raw'
import clubs_9 from '../cards/clubs_9.svg?raw'
import clubs_ace from '../cards/clubs_ace.svg?raw'
import clubs_jack from '../cards/clubs_jack.svg?raw'
import clubs_king from '../cards/clubs_king.svg?raw'
import clubs_queen from '../cards/clubs_queen.svg?raw'
import diamonds_10 from '../cards/diamonds_10.svg?raw'
import diamonds_7 from '../cards/diamonds_7.svg?raw'
import diamonds_8 from '../cards/diamonds_8.svg?raw'
import diamonds_9 from '../cards/diamonds_9.svg?raw'
import diamonds_ace from '../cards/diamonds_ace.svg?raw'
import diamonds_jack from '../cards/diamonds_jack.svg?raw'
import diamonds_king from '../cards/diamonds_king.svg?raw'
import diamonds_queen from '../cards/diamonds_queen.svg?raw'
import hearts_10 from '../cards/hearts_10.svg?raw'
import hearts_7 from '../cards/hearts_7.svg?raw'
import hearts_8 from '../cards/hearts_8.svg?raw'
import hearts_9 from '../cards/hearts_9.svg?raw'
import hearts_ace from '../cards/hearts_ace.svg?raw'
import hearts_jack from '../cards/hearts_jack.svg?raw'
import hearts_king from '../cards/hearts_king.svg?raw'
import hearts_queen from '../cards/hearts_queen.svg?raw'
import spades_10 from '../cards/spades_10.svg?raw'
import spades_7 from '../cards/spades_7.svg?raw'
import spades_8 from '../cards/spades_8.svg?raw'
import spades_9 from '../cards/spades_9.svg?raw'
import spades_ace from '../cards/spades_ace.svg?raw'
import spades_jack from '../cards/spades_jack.svg?raw'
import spades_king from '../cards/spades_king.svg?raw'
import spades_queen from '../cards/spades_queen.svg?raw'

export const cardsSrc: Record<Card, string> = {
	[Card.S7]: spades_7,
	[Card.S8]: spades_8,
	[Card.S9]: spades_9,
	[Card.S10]: spades_10,
	[Card.SJ]: spades_jack,
	[Card.SQ]: spades_queen,
	[Card.SK]: spades_king,
	[Card.SA]: spades_ace,
	[Card.H7]: hearts_7,
	[Card.H8]: hearts_8,
	[Card.H9]: hearts_9,
	[Card.H10]: hearts_10,
	[Card.HJ]: hearts_jack,
	[Card.HQ]: hearts_queen,
	[Card.HK]: hearts_king,
	[Card.HA]: hearts_ace,
	[Card.C7]: clubs_7,
	[Card.C8]: clubs_8,
	[Card.C9]: clubs_9,
	[Card.C10]: clubs_10,
	[Card.CJ]: clubs_jack,
	[Card.CQ]: clubs_queen,
	[Card.CK]: clubs_king,
	[Card.CA]: clubs_ace,
	[Card.D7]: diamonds_7,
	[Card.D8]: diamonds_8,
	[Card.D9]: diamonds_9,
	[Card.D10]: diamonds_10,
	[Card.DJ]: diamonds_jack,
	[Card.DQ]: diamonds_queen,
	[Card.DK]: diamonds_king,
	[Card.DA]: diamonds_ace
}
