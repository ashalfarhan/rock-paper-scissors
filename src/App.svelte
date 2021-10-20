<script lang="ts">
  import { gameState, modalState } from './store'
  import GameConsole from '@app/components/Game/GameConsole/index.svelte'
  import GameResult from '@app/components/Game/GameResult.svelte'
  import Modal from './components/Modals/Modal.svelte'
  import Header from './components/Header.svelte'
  import rulesModal from './assets/images/image-rules.svg'
  import GameHistory from './components/Game/GameHistory.svelte'
  const handleOpenRules = () => {
    modalState.update((prev) => ({ ...prev, rulesOpen: true, historyOpen: false }))
  }
</script>

<div class="container">
  <Header />
  <div class="game-container">
    {#if $gameState.isPlaying}
      <GameResult />
    {:else}
      <GameConsole />
    {/if}
  </div>
  <button class="rules-button" on:click={handleOpenRules}>Rules</button>
  <!-- <footer class="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by
    <a href="#">Your Name Here</a>.
  </footer> -->
</div>

<Modal open={$modalState.rulesOpen} title="Rules">
  <span slot="content">
    <img src={rulesModal} alt="RPS Rules" />
  </span>
</Modal>

<Modal open={$modalState.historyOpen} title="History">
  <span slot="content">
    <GameHistory />
  </span>
</Modal>

<style>
  .container {
    height: 100vh;
    max-width: 70vw;
    margin: 0 auto;
    padding: 2em 0 0.5em;
    display: flex;
    flex-direction: column;
  }

  .game-container {
    display: flex;
    flex: 1;
  }

  .rules-button {
    padding: 0.5em 2em;
    font-size: 20px;
    background: transparent;
    outline: 1px solid var(--main);
    border-radius: 9px;
    color: white;
    position: absolute;
    bottom: 2em;
    right: 2em;
  }

  @media screen and (max-width: 768px) {
    .container {
      max-width: 90vw;
    }
    .rules-button {
      bottom: 0.8em;
      right: 50%;
      left: 50%;
      transform: translate(-50%, -30%);
    }
  }
</style>
