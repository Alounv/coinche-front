<script lang="ts">
	import { CloseButton } from 'spaper';
	import { fade } from 'svelte/transition';

	export let onClose: () => void;
	export let message: string;
</script>

<div class="row flex-center text-danger margin-small" style="min-height: 1.25rem">
	{#if message}
		<div transition:fade>
			<CloseButton class="margin-left" on:click={onClose} />
			{message}
		</div>
	{/if}
</div>
