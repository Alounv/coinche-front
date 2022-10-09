<script lang="ts">
	import { bidColors, Colors, type BidColors } from '../data/enums';

	export let color: BidColors;

	$: isRed = color === Colors.Diamond || color === Colors.Heart;
</script>

<span style={isRed ? 'color: red;' : ''}>{bidColors[color]}</span>
