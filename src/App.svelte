<script>
import { onMount } from 'svelte';
import Die from './Die.svelte';
import Timer from './Timer.svelte';
import Category from './Category.svelte';

let flash = false;
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
let timer = 2;
onMount(() => {
  if (minRegex.test(window.location.hash)) {
    const mins = parseFloat(window.location.hash.replace('#', ''));
    if (mins > 0) {
      timer = mins;
    }
  }
});
</script>

<main class:flash>
  <h1>Scatt<span class="down">e</span>rgori<span class="up">e</span>s</h1>
  <Die />
  <Timer len={timer} on:ended={timerUp}/>
  <Category />
</main>

<style>
  main {
    border-radius: 0.75rem;
    padding: 2rem;
    max-width: 40rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    margin: 0 0 1rem;
    position: relative;
  }
  .flash {
    background: yellow;
  }
  .up {
    position: relative;
    top: -1rem;
    font-size: 2.5rem;
    font-weight: 200;
  }
  .down {
    font-size: 2.5rem;
    font-weight: 200;
    position: relative;
    left: -0.2rem;
  }
</style>