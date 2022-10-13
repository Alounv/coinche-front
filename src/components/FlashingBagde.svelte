<script lang="ts">
	import { Badge } from 'spaper'
</script>

<span class="flashing">
	<Badge type="success">
		<slot />
	</Badge>
</span>

<style>
	.flashing {
		animation-duration: 1s;
		animation-name: anim;
		animation-iteration-count: 3;
	}
	@keyframes anim {
		0% {
		}
		50% {
			opacity: 0.5;
		}
		100% {
		}
	}
</style>
