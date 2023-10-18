<script lang="ts">
  export let title = 'Modal Title';
  export let open = false;

  import { ModalState, modalState } from '$lib/store';
  import { fade } from 'svelte/transition';
  import IconClose from '../Icon/IconClose.svelte';

  const handleClose = () => {
    modalState.set(ModalState.NONE);
  };
</script>

{#if open}
  <div transition:fade={{ duration: 150 }} class="modal-wrapper">
    <div class="modal-overlay" on:click={handleClose} />
    <div class="modal-content">
      <h1>{title}</h1>
      <div class="modal-body">
        <slot>Content Goes here</slot>
      </div>
      <button class="modal-close-button" on:click={handleClose}>
        <IconClose />
      </button>
    </div>
  </div>
{/if}

<style>
  .modal-wrapper {
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
  }

  .modal-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal-content {
    background-color: white;
    padding: 1.5em 2em;
    border-radius: 9px;
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 2em;
  }

  .modal-content h1 {
    color: var(--text-main);
    text-transform: uppercase;
  }

  .modal-close-button {
    position: absolute;
    top: 1.5em;
    right: 1.5em;
    background-color: transparent;
  }

  @media screen and (max-width: 480px) {
    .modal-content {
      height: 100vh;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 0;
    }

    .modal-close-button {
      bottom: 32px;
      top: initial;
      right: 50%;
      transform: translate(60%, -50%);
    }
  }
</style>
