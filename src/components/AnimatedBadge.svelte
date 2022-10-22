<script lang="ts">
	import { Badge } from 'spaper'

	export let text: string
	export let onClick: () => void = () => null
</script>

<h4 class="m-0 inline-block animate-pulse" on:click={onClick}>
	<Badge rounded type="secondary">
		{text}
	</Badge>
</h4>
