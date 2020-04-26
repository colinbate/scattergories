<script>
import { createEventDispatcher, onDestroy } from 'svelte';
import { readable, derived } from 'svelte/store';
export let len = 2;

const labels = {
  true: 'Pause',
  false: 'Start',
};

const dispatch = createEventDispatcher();
$: mslen = len * 60000;
let lastTime;
let elapsed = 0;


function formatDuration(ms) {
  const secs = Math.floor(ms / 1000);
  const mins = Math.floor(secs / 60);
  const rem = Math.floor(secs % 60);
  return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
}

$: timeStr = formatDuration(mslen - elapsed);
let frame; 
let toggled = false;
let toggleLabel = labels[toggled.toString()];

function countdown() {
  if (!toggled) {
    cancelAnimationFrame(frame);
    return;
  }
  frame = requestAnimationFrame(countdown);

  const time = window.performance.now();
  elapsed += Math.min(
    time - lastTime,
    mslen - elapsed
  );
  if (elapsed === mslen) {
    toggle();
    dispatch('ended');
    elapsed = 0;
  }
  lastTime = time;
}

onDestroy(() => cancelAnimationFrame(frame));

function toggle() {
  toggled = !toggled;
  toggleLabel = labels[toggled.toString()];
  if (toggled) {
    lastTime = window.performance.now();
    countdown();
  }
}
</script>
<style>
.timer {
  text-align: center;
  color: #ff3e00;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Operator Mono', 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
}

@media (min-width: 500px) {
  .timer {
    font-size: 3rem;
  }
}

button {
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  border: 0;
  background-color: #ff3e00;
  color: #fff;
  font-size: 1rem;
  margin: 0;
  cursor: pointer;
  width: 6rem;
}

button:not(:disabled):active {
	background-color: #922501;
}

.wrap {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.r {
  margin-left: 0.25rem;
}

</style>
<div class="wrap">
  <div class="timer">
  {timeStr}
  </div>
  <div class="controls">
    <button type="button" on:click={toggle}>{toggleLabel}</button>
    <button type="button" class="r" on:click={() => elapsed = 0}>Reset</button>
  </div>
</div>