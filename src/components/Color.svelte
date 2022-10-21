<script lang="ts">
	import { type BidColors, bidColors } from '../data/enums'
	import { customColors } from '../stores/customColors'
	import { getHexColor } from '../utils/colors'

	export let color: BidColors

	let isCustom: boolean
	customColors.subscribe((v) => {
		isCustom = v
	})
	$: hexColor = getHexColor(color, isCustom)
</script>

<span style="color: {hexColor};">{bidColors[color]}</span>
