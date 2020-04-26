<script>
import { categories } from './categories';
import { randInt } from './util';

let selectedCategory = null;
const empty = ['', '', '', '', '', '', '', '', '', '', '', ''];
$: currentCategory = selectedCategory != null ? categories[selectedCategory] : empty;

function randomSet() {
  selectedCategory = randInt(categories.length);
}
</script>
<style>
.categories {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.set {
  margin: 0.25rem;
}

button {
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ff3e00;
  color: #ff3e00;
  background-color: #fff;
  font-size: 1rem;
  margin: 0;
  cursor: pointer;
  width: 3rem;
}

ol {
  padding: 0;
  list-style-position: inside;
  width: 100%;
  box-sizing: border-box;
}
li {
  border-bottom: 1px solid #333;
  padding: 0.5rem;
}
.chosenSet > span {
  font-size: 1.5rem;

}
</style>
<div class="categories">
{#if selectedCategory != null}
  <div class="chosenSet">
  <button type="button" class="set" on:click={() => selectedCategory = null}>&lt;</button>
  <span>{selectedCategory + 1}</span>
  </div>
{:else}
  <div class="setButtons">
  {#each categories as category, index}
  <button type="button" class="set" on:click={() => selectedCategory = index}>{index + 1}</button>
  {/each}<button type="button" class="set" on:click={randomSet}>?</button>
  </div>
{/if}
  <ol>
    {#each currentCategory as item}
      <li>&nbsp;{item}</li>
    {/each}
  </ol>
</div>