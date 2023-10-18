<script lang="ts">
  export let pads = [0, 1, 2];

  import { gameOptions } from '$lib';
  import Gamepad from './Gamepad.svelte';
  import { scale } from 'svelte/transition';

  $: isBonusGame = pads.length !== 3;
</script>

<div in:scale class="console-container {isBonusGame ? "bonus": ""}">
  <div class="console-container__inner">
    {#if isBonusGame}
      <svg class="pentagon" xmlns="http://www.w3.org/2000/svg" width="329" height="313">
        <path
          fill="none"
          stroke="#000"
          stroke-width="15"
          d="M164.5 9.27L9.26 122.06l59.296 182.495h191.888L319.74 122.06 164.5 9.271z"
          opacity=".2"
        />
      </svg>
    {:else}
      <svg
        class="triangle"
        xmlns="http://www.w3.org/2000/svg"
        width="305"
        height="277"
      >
        <path
          fill="none"
          stroke="#000"
          stroke-width="15"
          d="M291.5 7.5H4.574c3.119 0 52.416 84.667 147.892 254L291.5 7.5z"
          opacity=".2"
        />
      </svg>
    {/if}
    {#each pads as pad}
      <div class="game-pad {gameOptions[pad]}">
        <Gamepad padValue={pad} on:user-select withAction />
      </div>
    {/each}
  </div>
</div>

<style>
  .console-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    --scale: -1;
    --corner: calc(var(--scale) * (var(--game-button-size) / 2));
  }

  .console-container__inner {
    position: relative;
  }

  .game-pad {
    position: absolute;
    width: min-content;
    height: min-content;
  }

  .game-pad.rock {
    left: var(--corner);
    top: var(--corner);
  }

  .game-pad.paper {
    right: var(--corner);
    top: var(--corner);
  }

  .game-pad.scissors {
    bottom: calc(var(--corner) * 80 / 100);
    left: 50%;
    transform: translateX(-50%);
  }

  .console-container.bonus .game-pad.rock {
    top: 10%;
  }

  .console-container.bonus .game-pad.paper {
    top: calc(var(--corner) * 80 / 100);
    left: 50%;
    transform: translateX(-50%);
  }

  .console-container.bonus .game-pad.scissors {
    top: 10%;
    right: var(--corner);
    left: initial;
    transform: none;
  }

  .console-container.bonus .game-pad.spock {
    left: calc(var(--corner) * 0.3);
    bottom: -20%;
  }

  .console-container.bonus .game-pad.lizard {
    right: calc(var(--corner) * 0.3);
    bottom: -20%;
  }

  @media screen and (max-width: 768px) {
    .triangle, .pentagon {
      transform: scale(0.85);
    }

    .console-container {
      --scale: -0.7;
    }

    .console-container.bonus .game-pad.paper {
      top: calc(var(--corner));
    }

    .console-container.bonus .game-pad.spock {
      bottom: calc(var(--corner) * 40 / 100);
    }

    .console-container.bonus .game-pad.lizard {
      bottom: calc(var(--corner) * 40 / 100);
    }
  }

  @media screen and (max-width: 640px) {
    .triangle, .pentagon {
      transform: scale(0.7);
    }

    .console-container.bonus .game-pad.paper {
      top: calc(var(--corner) * 2);
    }

    .console-container {
      --scale: -0.3;
    }
  }
</style>
