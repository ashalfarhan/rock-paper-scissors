<script lang="ts">
  export let pads = [0, 1, 2];

  import { gameOptions } from '$lib';
  import Gamepad from './Gamepad.svelte';
  import { scale } from 'svelte/transition';
</script>

<div in:scale class="console-container">
  <div class="console-container__inner">
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
  }

  .console-container__inner {
    position: relative;
    --scale: -1;
    --corner: calc(var(--scale) * (var(--game-button-size) / 2));
  }

  .game-pad {
    position: absolute;
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
    bottom: var(--corner);
    left: 50%;
    transform: translateX(-50%);
  }

  @media screen and (max-width: 768px) {
    .triangle {
      transform: scale(0.85);
    }

    .console-container__inner {
      --scale: -0.7;
    }
  }

  @media screen and (max-width: 640px) {
    .triangle {
      transform: scale(0.7);
    }

    .console-container__inner {
      --scale: -0.3;
    }
  }
</style>
