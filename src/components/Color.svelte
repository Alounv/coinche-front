<script lang="ts">
	import { type BidColors, Colors, bidColors } from '../data/enums'

	export let color: BidColors

	$: isRed = color === Colors.Diamond || color === Colors.Heart
</script>

<span style={isRed ? 'color: red;' : ''}>{bidColors[color]}</span>
