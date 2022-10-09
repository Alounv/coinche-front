<script lang="ts">
	import { Badge } from 'spaper';
	export let coinche: number;
</script>

{#if coinche === 3}
	<Badge>Contrecoinché</Badge> ⚔️⚔️⚔️
{:else if coinche === 2}
	<Badge>Surcoinché</Badge> ⚔️⚔️
{:else if coinche > 0}
	<Badge>Coinché</Badge> ⚔️
{/if}
