<script lang="ts">
  import { gameState, modalState } from '../store'
  import imageLogo from '../assets/images/logo.svg'
  const handleOpenHistory = () => {
    modalState.update((prev) => ({ ...prev, historyOpen: true, rulesOpen: false }))
  }
</script>

<header>
  <img src={imageLogo} alt="" />
  <button class="score-panel" on:click={handleOpenHistory}>
    <p>SCORE</p>
    <h1>{$gameState.score}</h1>
  </button>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: 4px solid var(--header-outline);
    border-radius: 9px;
    padding: 1.5em;
    margin: 0 4em;
    position: relative;
  }

  .score-panel {
    display: flex;
    flex-direction: column;
    background-color: var(--main);
    color: var(--text-main);
    padding: 1em 3.2em;
    border-radius: 9px;
    align-items: center;
  }

  .score-panel h1 {
    font-size: 58px;
    font-weight: 700;
    line-height: 50px;
  }

  .score-panel p {
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    header {
      padding: 0.8em;
      margin: 0;
      z-index: 2;
    }
    header img {
      width: 120px;
      height: 70px;
    }
    .score-panel {
      padding: 1em 2em;
    }
  }
</style>
