import { writable } from 'svelte/store';

export enum GamePlayState {
  IDLE,
  PLAYING,
  DONE,
}

export type GameHistory = {
  userChoosen: number;
  botChoosen: number;
  result: number;
  id: string;
};

export const gameHistoryState = writable<GameHistory[]>([]);
