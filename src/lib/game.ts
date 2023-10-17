import paperIcon from '$lib/assets/images/icon-paper.svg';
import scissorsIcon from '$lib/assets/images/icon-scissors.svg';
import rockIcon from '$lib/assets/images/icon-rock.svg';

export const gamepadImages = [rockIcon, paperIcon, scissorsIcon];
export const gameOptions = ['rock', 'paper', 'scissors'];

export const parseResultText: { [key: number]: string } = {
  '-1': 'LOSE',
  '0': 'DRAW',
  '1': 'WIN',
};

export function determineResult(userWeaponIdx: number, botWeaponIdx: number) {
  const userWeapon = gameOptions[userWeaponIdx];
  const botWeapon = gameOptions[botWeaponIdx];
  if (!userWeapon || !botWeapon) return 0;
  const pair = userWeapon.substring(0, 1) + botWeapon.substring(0, 1);
  switch (pair.toLowerCase()) {
    case 'rr':
    case 'pp':
    case 'ss':
      return 0;
    case 'pr':
    case 'rs':
    case 'sp':
      return 1;
    case 'rp':
    case 'sr':
    case 'ps':
      return -1;
    default:
      throw new Error('Unknown options');
  }
}
