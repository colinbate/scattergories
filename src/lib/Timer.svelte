<script lang="ts">
	import { onDestroy } from 'svelte';

	type Props = {
		len: number;
		onended?: () => void;
	};

	let { len, onended }: Props = $props();

	let mslen = $derived(len * 60000);
	let lastTime = 0;
	let elapsed = $state(0);

	function formatDuration(ms: number) {
		const secs = Math.floor(ms / 1000);
		const mins = Math.floor(secs / 60);
		const rem = Math.floor(secs % 60);
		return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
	}

	let timeStr = $derived(formatDuration(mslen - elapsed));
	let frame: number | undefined;
	let toggled = $state(false);

	function countdown() {
		if (!toggled && frame != null) {
			cancelAnimationFrame(frame);
			return;
		}
		frame = requestAnimationFrame(countdown);

		const time = window.performance.now();
		elapsed += Math.min(time - lastTime, mslen - elapsed);
		if (elapsed === mslen) {
			toggle();
			onended?.();
			elapsed = 0;
		}
		lastTime = time;
	}

	onDestroy(() => frame && cancelAnimationFrame(frame));

	function toggle() {
		toggled = !toggled;
		if (toggled) {
			lastTime = window.performance.now();
			countdown();
		}
	}
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<div class="font-mono text-4xl text-svelte md:text-5xl">
		{timeStr}
	</div>
	<div class="flex gap-2">
		<button type="button" onclick={toggle} class="w-24 rounded-md bg-svelte px-6 py-2 text-white"
			>{toggled ? 'Pause' : 'Start'}</button
		>
		<button
			type="button"
			onclick={() => (elapsed = 0)}
			class="w-24 rounded-md bg-svelte px-6 py-2 text-white">Reset</button
		>
	</div>
</div>
