<script lang="ts">
  import Gamepad from './Gamepad.svelte'
  import { scale } from 'svelte/transition'
</script>

<div in:scale class="console-container">
  <svg class="triangle" xmlns="http://www.w3.org/2000/svg" width="305" height="277">
    <path
      fill="none"
      stroke="#000"
      stroke-width="15"
      d="M291.5 7.5H4.574c3.119 0 52.416 84.667 147.892 254L291.5 7.5z"
      opacity=".2"
    />
  </svg>

  <div class="console-upper">
    <Gamepad withAction padValue={1} />
    <Gamepad withAction padValue={2} />
  </div>
  <div class="console-below">
    <Gamepad withAction padValue={0} />
  </div>
</div>

<style>
  .console-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    row-gap: 4em;
  }
  .triangle {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }
  .console-upper {
    display: flex;
    column-gap: 8em;
  }
  @media screen and (max-width: 768px) {
    .triangle {
      transform: translate(-50%, -50%) scale(0.6);
    }
    .console-container {
      row-gap: 1em;
      top: -4em;
    }
    .console-upper {
      column-gap: 3em;
    }
  }
</style>
