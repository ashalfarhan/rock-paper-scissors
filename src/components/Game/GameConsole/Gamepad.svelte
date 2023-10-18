<script lang="ts">
  export let padValue: number | null = 0;
  export let withAction = false;

  import { gameOptions, gamepadImages } from '$lib';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ 'user-select': number }>();
</script>

{#if padValue != null}
  <button
    in:fade
    on:click={() => dispatch('user-select', padValue ?? 0)}
    class="game-button {gameOptions[padValue]} 
    {!withAction ? 'display-only' : ''}"
  >
    <div class="button-inner">
      <img width="50" height="50" src={gamepadImages[padValue]} alt="" />
    </div>
  </button>
{:else}
  <div in:fade class="loading-pick" />
{/if}

<style>
  .button-inner {
    border-radius: 100%;
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    background-color: var(--main);
    transition: box-shadow 200ms ease-in-out;
  }

  .game-button,
  .loading-pick {
    width: var(--game-button-size);
    height: var(--game-button-size);
    border-radius: 50%;
  }

  .game-button {
    display: flex;
    padding: 1.3em;
    transition: all 200ms ease;
  }

  .game-button.paper {
    background-image: var(--paper-gradient);
    box-shadow: 0 0.5rem 0 hsl(230, 180%, 58%);
  }

  .game-button.scissors {
    background-image: var(--scissors-gradient);
    box-shadow: 0 0.5rem 0 hsl(39, 89%, 45%);
  }

  .game-button.rock {
    background-image: var(--rock-gradient);
    box-shadow: 0 0.5rem 0 hsl(349, 71%, 45%);
  }

  .game-button.lizard {
    background-image: var(--lizard-gradient);
    box-shadow: 0 0.5rem 0 hsl(261, 73%, 56%);
  }

  .game-button.spock {
    background-image: var(--cyan);
    box-shadow: 0 0.5rem 0 hsl(189, 59%, 40%);
  }

  .game-button:active {
    box-shadow: 0 0 0;
    transform: translateY(0.4rem);
  }

  .game-button:active .button-inner {
    box-shadow: inset 0 3px 0 3px rgba(0, 0, 0, 0.3);
  }

  .button-inner {
    box-shadow: inset 0 -2px 0 2px rgba(0, 0, 0, 0.3);
  }

  .loading-pick {
    background-image: var(--bg);
    border-radius: 50%;
  }

  @media screen and (max-width: 768px) {
    .game-button,
    .loading-pick {
      width: calc(var(--game-button-size) * 90 / 100);
      height: calc(var(--game-button-size) * 90 / 100);
    }
    .game-button {
      padding: 1.1em;
    }
  }

  @media screen and (max-width: 640px) {
    .game-button,
    .loading-pick {
      width: calc(var(--game-button-size) * 80 / 100);
      height: calc(var(--game-button-size) * 80 / 100);
    }
    .game-button {
      padding: 1em;
    }
  }
</style>
