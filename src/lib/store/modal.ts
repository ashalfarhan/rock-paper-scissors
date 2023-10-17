import { writable } from 'svelte/store';

export enum ModalState {
  NONE,
  RULES,
  HISTORY,
}

export const modalState = writable(ModalState.NONE);
