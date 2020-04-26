<script>
import { createEventDispatcher } from 'svelte';
import { randInt } from './util';
const dispatch = createEventDispatcher();
let roll = '?';
let rolling = false;
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
  'U',
];
function showLetter() {
  roll = letters[randInt(20)];
  delay += 5;
  if (delay > 100) {
    rolling = false;
    delay = 50;
    dispatch('roll', { roll });
  } else {
    setTimeout(showLetter, delay);
  }
}

function rollDie() {
  // Simulate a bunch of letters.
  rolling = true;
  
  setTimeout(showLetter, 50);
};
</script>
<style>
.die {
    position: relative;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}
.triangle {
  color: #fff;
  font-size: 8rem;
  line-height: 1;
  transform: scaleX(1.2);
  text-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25), 0 0.25rem 0.33rem rgba(0, 0, 0, 0.12);
}
.roll {
  content: attr(data-roll);
  text-shadow: none;
  color: #333;
  font-size: 2.5rem;
  font-weight: bold;
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
}
.rolling {
  color: #bbb;
}
</style>

<div class="die" on:click={rollDie}>
  <div class="triangle">▲</div>
  <div class="roll" class:rolling>{roll}</div>
</div>