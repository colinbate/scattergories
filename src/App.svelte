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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
h1 {
  color: #ff3e00;
    text-transform: uppercase;
    font-weight: 100;
    position: relative;
    font-size: 2rem;
}
.up {
  position: relative;
  top: -0.4rem;
  font-size: 1.5rem;
  font-weight: 200;
}
.down {
  font-size: 1.5rem;
  font-weight: 200;
  position: relative;
  left: -0.2rem;
}
@media (min-width: 500px) {
  main {
    border-radius: 0.75rem;
    padding: 2rem;
    max-width: 40rem;
    margin: auto;
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
  }

  h1 {
    font-size: 4rem;
    margin: 0 0 1rem;
  }

  .up, .down {
    font-size: 2.5rem;
  }
  .up {
    top: -1rem;
  }
}
.flash {
  background: yellow;
}
</style>