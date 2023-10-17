<script lang="ts">
  export let resultText: string;
  export let isLoading: boolean;
  export let userChoosen: number | null;
  export let botChoosen: number | null;

  import Gamepad from './GameConsole/Gamepad.svelte';
  import { scale } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ 'play-again': void }>();
</script>

<div in:scale class="game-result-container {isLoading ? 'loading' : ''}">
  <div class="pick client-picked">
    <div class="pick-text">You Picked</div>
    <Gamepad padValue={userChoosen} />
  </div>
  <div class="pick bot-picked">
    <div class="pick-text">House Picked</div>
    <Gamepad padValue={botChoosen} />
  </div>
</div>
{#if !isLoading}
  <div class="result-container">
    <div in:fade>
      <div class="result-text">{resultText}</div>
      <button on:click={() => dispatch('play-again')} class="play-again">
        PLAY AGAIN
      </button>
    </div>
  </div>
{/if}

<style>
  .game-result-container {
    display: flex;
    flex: 1;
    align-items: center;
    color: var(--main);
    transition: all 200ms linear;
    position: relative;
    justify-content: space-between;
    gap: 2em;
  }

  .game-result-container.loading {
    justify-content: center;
  }

  .pick {
    display: flex;
    flex-direction: column;
    row-gap: 3em;
    align-items: center;
  }

  .pick-text {
    font-size: 32px;
  }
  .result-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
  }

  .result-container div {
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 0.8em;
    color: var(--main);
  }

  .result-text {
    font-size: 48px;
    text-transform: uppercase;
  }

  .play-again {
    padding: 1em 4em;
    border-radius: 9px;
  }

  @media screen and (max-width: 768px) {
    .game-result-container {
      align-items: flex-start;
      padding: 4em 0;
      column-gap: 1em;
    }

    .pick {
      flex-direction: column-reverse;
      row-gap: 1.5em;
    }

    .pick-text {
      font-size: 18px;
    }

    .result-container {
      top: 55%;
      width: 100%;
    }

    .result-text {
      font-size: 36px;
    }

    .play-again {
      padding: 1em 2em;
      width: 60%;
    }
  }
</style>
