<script lang="ts">
	import type { Card } from '../data/enums';
	import { cardImages } from '../utils/image';

	export let card: Card;
</script>

<img src={cardImages[card]} alt={card} />
