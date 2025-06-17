export const playAttackSound = (type: 'player-attack' | 'enemy-attack'): void => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type === 'player-attack' ? 'sawtooth' : 'square';
    oscillator.frequency.value = type === 'player-attack' ? 600 : 200;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
    oscillator.onended = () => ctx.close();
  } catch (e) {
    console.error('Audio error', e);
  }
};
