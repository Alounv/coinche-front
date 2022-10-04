import spades_7 from '../images/spades_7.png';
import spades_8 from '../images/spades_8.png';
import spades_9 from '../images/spades_9.png';
import spades_10 from '../images/spades_10.png';
import spades_jack from '../images/spades_jack.png';
import spades_queen from '../images/spades_queen.png';
import spades_king from '../images/spades_king.png';
import spades_ace from '../images/spades_ace.png';
import hearts_7 from '../images/hearts_7.png';
import hearts_8 from '../images/hearts_8.png';
import hearts_9 from '../images/hearts_9.png';
import hearts_10 from '../images/hearts_10.png';
import hearts_jack from '../images/hearts_jack.png';
import hearts_queen from '../images/hearts_queen.png';
import hearts_king from '../images/hearts_king.png';
import hearts_ace from '../images/hearts_ace.png';
import clubs_7 from '../images/clubs_7.png';
import clubs_8 from '../images/clubs_8.png';
import clubs_9 from '../images/clubs_9.png';
import clubs_10 from '../images/clubs_10.png';
import clubs_jack from '../images/clubs_jack.png';
import clubs_queen from '../images/clubs_queen.png';
import clubs_king from '../images/clubs_king.png';
import clubs_ace from '../images/clubs_ace.png';
import diamonds_7 from '../images/diamonds_7.png';
import diamonds_8 from '../images/diamonds_8.png';
import diamonds_9 from '../images/diamonds_9.png';
import diamonds_10 from '../images/diamonds_10.png';
import diamonds_jack from '../images/diamonds_jack.png';
import diamonds_queen from '../images/diamonds_queen.png';
import diamonds_king from '../images/diamonds_king.png';
import diamonds_ace from '../images/diamonds_ace.png';

import { Card } from '../data/enums';

export const cardImages: Record<Card, any> = {
	[Card.C7]: spades_7,
	[Card.C8]: spades_8,
	[Card.C9]: spades_9,
	[Card.C10]: spades_10,
	[Card.CJ]: spades_jack,
	[Card.CQ]: spades_queen,
	[Card.CK]: spades_king,
	[Card.CA]: spades_ace,
	[Card.D7]: hearts_7,
	[Card.D8]: hearts_8,
	[Card.D9]: hearts_9,
	[Card.D10]: hearts_10,
	[Card.DJ]: hearts_jack,
	[Card.DQ]: hearts_queen,
	[Card.DK]: hearts_king,
	[Card.DA]: hearts_ace,
	[Card.H7]: clubs_7,
	[Card.H8]: clubs_8,
	[Card.H9]: clubs_9,
	[Card.H10]: clubs_10,
	[Card.HJ]: clubs_jack,
	[Card.HQ]: clubs_queen,
	[Card.HK]: clubs_king,
	[Card.HA]: clubs_ace,
	[Card.S7]: diamonds_7,
	[Card.S8]: diamonds_8,
	[Card.S9]: diamonds_9,
	[Card.S10]: diamonds_10,
	[Card.SJ]: diamonds_jack,
	[Card.SQ]: diamonds_queen,
	[Card.SK]: diamonds_king,
	[Card.SA]: diamonds_ace
};