<script lang="ts">
	import { Badge } from 'spaper';
	export let coinche: number;
</script>

{#if coinche > 1}
	<Badge>Surcoinché</Badge> ⚔️⚔️
{:else if coinche > 0}
	<Badge>Coinché</Badge> ⚔️
{/if}
