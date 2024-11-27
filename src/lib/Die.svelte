<script lang="ts">
	import { getRandom } from './random';

	let { onroll }: { onroll?: (value: string) => void } = $props();

	let roll: string = $state('?');
	let rolling: boolean = $state(false);
	let delay = 50;
	const letters = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'R',
		'S',
		'T',
		'U'
	];
	function showLetter() {
		roll = letters[getRandom(20)];
		delay += 5;
		if (delay > 100) {
			rolling = false;
			delay = 50;
			onroll?.(roll);
		} else {
			setTimeout(showLetter, delay);
		}
	}

	function rollDie() {
		// Simulate a bunch of letters.
		rolling = true;
		setTimeout(showLetter, 50);
	}
</script>

<button type="button" class="relative cursor-pointer" onclick={rollDie}>
	<div class="triangle scale-x-125 text-9xl leading-none text-white dark:text-gray-700">▲</div>
	<div
		class="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-4xl font-bold"
		class:opacity-30={rolling}
	>
		{roll}
	</div>
</button>

<style>
	.triangle {
		text-shadow:
			0 0 1.5rem rgba(0, 0, 0, 0.25),
			0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
	}
	:global(.dark) .triangle {
		text-shadow:
			0 0 1.5rem rgba(255, 155, 55, 0.25),
			0 0.25rem 0.33rem rgba(255, 155, 55, 0.12);
	}
</style>
