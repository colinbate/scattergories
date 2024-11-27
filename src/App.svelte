<script lang="ts">
	import ModeSwitcher from './lib/ModeSwitcher.svelte';

	import Die from './lib/Die.svelte';
	import Timer from './lib/Timer.svelte';
	import Category from './lib/Category.svelte';

	let flash = $state(false);
	let count = 0;
	function timerUp() {
		count = 0;
		flashTimer();
	}
	function flashTimer() {
		flash = !flash;
		count += 1;
		if (count < 10) {
			setTimeout(flashTimer, 500);
		}
	}

	const minRegex = /\d+(\.\d)?$/;
	let timer = $state(2);
	$effect(() => {
		if (minRegex.test(window.location.hash)) {
			const mins = parseFloat(window.location.hash.replace('#', ''));
			if (mins > 0) {
				timer = mins;
			}
		}
	});
</script>

<ModeSwitcher />
<main
	class="mx-auto flex max-w-xl flex-col items-center justify-center gap-8 p-4 md:rounded-xl md:p-8 md:shadow-2xl dark:md:shadow-orange-600/30 {flash
		? `bg-yellow-300`
		: `bg-gray-100 dark:bg-gray-900`}"
>
	<h1 class="relative text-4xl font-thin uppercase leading-normal text-svelte md:text-6xl">
		Scatt<span class="relative -left-0.5 text-[0.65em] font-extralight">e</span>rgori<span
			class="relative -top-[0.4em] text-[0.65em] font-extralight">e</span
		>s
	</h1>
	<Die />
	<Timer len={timer} onended={timerUp} />
	<Category />
</main>
