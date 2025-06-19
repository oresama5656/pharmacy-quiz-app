export interface Progress {
  unlockedStars: number;
  clearedStars: Record<number, boolean>;
  currentFloor: number;
}

const DEFAULT_PROGRESS: Progress = {
  unlockedStars: 1,
  clearedStars: {},
  currentFloor: 0,
};

const keyFor = (guildId: string, catId: string): string =>
  `progress_${guildId}_${catId}`;

export function getProgress(guildId: string, catId: string): Progress {
  const raw = localStorage.getItem(keyFor(guildId, catId));
  if (!raw) return { ...DEFAULT_PROGRESS };
  try {
    const data = JSON.parse(raw) as Partial<Progress>;
    return {
      unlockedStars: data.unlockedStars ?? 1,
      clearedStars: data.clearedStars ?? {},
      currentFloor: data.currentFloor ?? 0,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function setProgress(
  guildId: string,
  catId: string,
  prog: Progress,
): void {
  localStorage.setItem(keyFor(guildId, catId), JSON.stringify(prog));
}
