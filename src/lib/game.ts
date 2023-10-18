import paperIcon from '$lib/assets/images/icon-paper.svg';
import scissorsIcon from '$lib/assets/images/icon-scissors.svg';
import rockIcon from '$lib/assets/images/icon-rock.svg';
import spockIcon from '$lib/assets/images/icon-spock.svg';
import lizardIcon from '$lib/assets/images/icon-lizard.svg';

export const gamepadImages = [
  rockIcon,
  paperIcon,
  scissorsIcon,
  spockIcon,
  lizardIcon,
];
export const gameOptions = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

export const parseResultText: { [key: number]: string } = {
  '-1': 'LOSE',
  '0': 'DRAW',
  '1': 'WIN',
};

export function determineResult(userWeaponIdx: number, botWeaponIdx: number) {
  const userWeapon = gameOptions[userWeaponIdx];
  const botWeapon = gameOptions[botWeaponIdx];
  if (!userWeapon || !botWeapon) return 0;
  const pair = userWeapon.substring(0, 2) + botWeapon.substring(0, 2);
  switch (pair.toLowerCase()) {
    case 'roro':
    case 'papa':
    case 'scsc':
    // Bonus
    case 'spsp':
    case 'lili':
      return 0;
    case 'paro':
    case 'pasp':
    case 'rosc':
    case 'roli':
    case 'scpa':
    case 'scli':
    // Bonus
    case 'lisp':
    case 'lipa':
    case 'spsc':
    case 'spro':
      return 1;
    case 'ropa':
    case 'rosp':
    case 'scro':
    case 'scsp':
    case 'pasc':
    case 'pali':
    // Bonus
    case 'liro':
    case 'lisc':
    case 'spli':
    case 'sppa':
      return -1;
    default:
      throw new Error('Unknown options: ' + pair);
  }
}
