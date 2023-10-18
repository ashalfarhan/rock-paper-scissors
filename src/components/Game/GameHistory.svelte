<script lang="ts">
  import { flip } from 'svelte/animate';
  import { gameOptions, gamepadImages, parseResultText } from '$lib';
  import { ModalState, modalState, gameHistoryState } from '$lib/store';

  const handleReset = () => {
    modalState.set(ModalState.NONE);
    gameHistoryState.set([]);
  };
</script>

<div class="game-history-wrapper">
  {#if $gameHistoryState.length > 0}
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <td>You Choose</td>
            <td>Result</td>
            <td>House Choose</td>
          </tr>
        </thead>
        <tbody>
          {#each $gameHistoryState as result (result.id)}
            <tr animate:flip>
              <td>
                <img
                  width="24"
                  height="24"
                  src={gamepadImages[result.userChoosen]}
                  alt={gameOptions[result.userChoosen]}
                />
              </td>
              <td
                class={'result ' +
                  (parseResultText[result.result]?.toLowerCase() ?? 'draw')}
              >
                {parseResultText[result.result] ?? 'DRAW'}
              </td>
              <td>
                <img
                  width="24"
                  height="24"
                  src={gamepadImages[result.botChoosen]}
                  alt={gameOptions[result.botChoosen]}
                />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <button class="clear-button" on:click={handleReset}>Clear</button>
  {:else}
    <p class="empty-history">You haven't played a game yet</p>
  {/if}
  <slot>Please insert banner</slot>
</div>

<style>
  .game-history-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 1em;
  }

  .empty-history {
    font-size: 18px;
    text-align: center;
    padding: 0 0 32px;
  }

  .table-wrapper {
    overflow-y: auto;
    max-height: 380px;
  }

  table {
    position: relative;
  }

  thead {
    position: sticky;
    top: 0;
  }

  thead td {
    background-color: var(--text-main);
    color: var(--main);
    text-align: center;
    padding: 12px;
  }

  tbody td {
    text-align: center;
    padding: 20px;
  }

  .result.win {
    color: green;
  }

  .result.lose {
    color: red;
  }

  .result.draw {
    color: blue;
  }

  .clear-button {
    padding: 1em 2em;
    background-image: var(--rock-gradient);
    color: white;
    border-radius: 9px;
    transition: filter 200ms ease-in-out;
  }

  .clear-button:hover {
    filter: opacity(0.8);
  }

  @media screen and (max-width: 480px) {
    .game-history-wrapper {
      bottom: 4em;
    }
  }
</style>
