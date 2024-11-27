<script lang="ts">
	import { categories } from './categories';
	import { getRandom } from './random';

	let selectedCategory: number | null = $state(null);
	const empty = ['', '', '', '', '', '', '', '', '', '', '', ''];
	let currentCategory = $derived(selectedCategory != null ? categories[selectedCategory] : empty);

	function randomSet() {
		selectedCategory = getRandom(categories.length);
	}
</script>

<div class="flex w-full flex-col gap-4">
	<div class="grid w-full grid-cols-5 justify-items-center gap-2 md:grid-cols-9">
		{#each categories as category, index}
			<button
				type="button"
				data-selected={selectedCategory === index}
				class="w-12 rounded-md border border-svelte p-2 text-svelte hover:bg-svelte/20 data-[selected=true]:bg-svelte data-[selected=true]:text-white"
				onclick={() => (selectedCategory = index)}>{index + 1}</button
			>
		{/each}<button
			type="button"
			class="w-12 rounded-md border border-svelte p-2 text-svelte hover:bg-svelte/20"
			onclick={randomSet}>?</button
		>
	</div>
	<ol>
		{#each currentCategory as item}
			<li class="border-b border-gray-500 p-2">
				{#if item}{item}{:else}&nbsp;{/if}
			</li>
		{/each}
	</ol>
</div>
