import { SOUND_EFFECTS } from '../constants';

/**
 * 汎用的なサウンド再生ヘルパー
 * @param src 再生する効果音の URL
 */
const playSound = (src: string): void => {
  try {
    const audio = new Audio(src);
    audio.volume = 1.0;
    audio.play().catch(() => {});
  } catch (e) {
    console.error('Audio error', e);
  }
};

export const playAttackSound = (type: 'player-attack' | 'enemy-attack'): void => {
  const src = type === 'player-attack' ? SOUND_EFFECTS.playerAttack : SOUND_EFFECTS.enemyAttack;
  playSound(src);
};

export const playWarningSound = (): void => {
  playSound(SOUND_EFFECTS.warning);
};
