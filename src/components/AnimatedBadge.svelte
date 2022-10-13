<script lang="ts">
	import { Badge } from 'spaper'

	export let text: string
	export let onClick: () => void = () => null
</script>

<h4 style="margin: 0; display: inline-block;" on:click={onClick}>
	<Badge rounded type="secondary" style="display: flex">
		{text}
		<div class="moving">{'<'}</div>
	</Badge>
</h4>

<style>
	.moving {
		margin-left: 2px;
		animation-duration: 1s;
		animation-name: anim;
		animation-iteration-count: infinite;
		flex: 0;
	}
	@keyframes anim {
		0% {
		}
		50% {
			transform: translateX(2px);
		}
		100% {
		}
	}
</style>
