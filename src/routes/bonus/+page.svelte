<script lang="ts">
  import {
    gameHistoryState,
    GamePlayState,
    ModalState,
    modalState,
    type GameHistory as GameHistoryType,
  } from '$lib/store';
  import GameConsole from '../../components/Game/GameConsole/GameConsole.svelte';
  import GameHistory from '../../components/Game/GameHistory.svelte';
  import GameResult from '../../components/Game/GameResult.svelte';
  import RulesBonus from '../../components/RulesBonus.svelte';
  import Modal from '../../components/Modals/Modal.svelte';
  import Header from '../../components/Header.svelte';
  import { parseIfJsonString, determineResult, parseResultText } from '$lib';
  import { nanoid } from 'nanoid';
  import { onDestroy, onMount } from 'svelte';

  let gamePlayState = GamePlayState.IDLE;
  let resultText = '';
  let botChoosen: number | null = null;
  let userChoosen: number | null = null;
  let unsubs = () => {};

  const handleOpenRules = () => {
    modalState.set(ModalState.RULES);
  };

  const handleStart = async (e: CustomEvent<number>) => {
    userChoosen = e.detail;
    gamePlayState = GamePlayState.PLAYING;
    await new Promise(resolve => setTimeout(resolve, 800));
    botChoosen = Math.floor(Math.random() * 5);
    const result = determineResult(userChoosen, botChoosen);
    resultText = parseResultText[result];
    gameHistoryState.update(prev => [
      ...prev,
      {
        id: nanoid(4),
        userChoosen: userChoosen as number,
        botChoosen: botChoosen as number,
        result,
      },
    ]);
    gamePlayState = GamePlayState.DONE;
  };

  const handlePLayAgain = () => {
    botChoosen = null;
    userChoosen = null;
    resultText = '';
    gamePlayState = GamePlayState.IDLE;
  };

  onMount(() => {
    const key = 'rps_bonus_game_history';
    const parsed = parseIfJsonString<GameHistoryType[]>(
      localStorage.getItem(key),
      []
    );
    if (Array.isArray(parsed)) {
      gameHistoryState.set(parsed);
    }
    unsubs = gameHistoryState.subscribe(val => {
      localStorage.setItem(key, JSON.stringify(val));
    });
  });

  onDestroy(unsubs);
</script>

<div class="wrapper">
  <div class="container">
    <Header gameMode="bonus" />
  </div>
  <div class="game-container container">
    {#if gamePlayState !== GamePlayState.IDLE}
      <GameResult
        {resultText}
        {botChoosen}
        {userChoosen}
        isLoading={gamePlayState === GamePlayState.PLAYING}
        on:play-again={handlePLayAgain}
      />
    {:else}
      <GameConsole pads={[0, 1, 2, 3, 4]} on:user-select={handleStart} />
    {/if}
  </div>
  <button class="rules-button" on:click={handleOpenRules}>Rules</button>
</div>

<Modal open={$modalState === ModalState.RULES} title="Rules">
  <RulesBonus />
</Modal>

<Modal open={$modalState === ModalState.HISTORY} title="History">
  <GameHistory>
    <p class="banner">
      Back to
      <a href="/">Classic Game</a>
    </p>
  </GameHistory>
</Modal>

<style>
  .wrapper {
    height: 100vh;
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    width: 100%;
    position: relative;
  }

  .game-container {
    display: flex;
    flex: 1;
  }

  .rules-button {
    padding: 0.5em 2em;
    font-size: 20px;
    outline: 1px solid var(--main);
    background: transparent;
    color: white;
    border-radius: 9px;
    width: fit-content;
    position: absolute;
    bottom: 32px;
    right: 32px;
  }

  @media screen and (max-width: 768px) {
    .rules-button {
      right: initial;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
