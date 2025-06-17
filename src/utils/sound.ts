import { SOUND_EFFECTS } from '../constants';

export const playAttackSound = (type: 'player-attack' | 'enemy-attack'): void => {
  try {
    const src = type === 'player-attack' ? SOUND_EFFECTS.playerAttack : SOUND_EFFECTS.enemyAttack;
    const audio = new Audio(src);
    audio.volume = 1.0; // 音量を100%に設定
    audio.play().catch(() => {});
  } catch (e) {
    console.error('Audio error', e);
  }
};
