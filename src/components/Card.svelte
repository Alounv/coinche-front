<script lang="ts">
	import type { Card } from '../data/enums';
	import { cardImages } from '../utils/image';

	export let card: Card;

	const deg = Math.floor(Math.random() * 4) - 2;
</script>

<img
	class="shadow shadow-hover padding-small"
	style="transform: rotate({deg}deg); background-color: white;"
	src={cardImages[card]}
	alt={card}
/>
