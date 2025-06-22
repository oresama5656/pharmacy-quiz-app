import { QuestStatus, GuildProgress } from '../types';
import guildsData from '../data/guilds.json';

// ギルド情報の型定義
interface Guild {
  id: string;
  name: string;
  icon: string;
  position: { top: string; left: string };
  categoryIds: string[];
}

// レベル番号を抽出する関数
const extractLevelFromCategoryId = (categoryId: string): number => {
  // "english_lv1" -> 1, "basic_math_lv10" -> 10 のような形式から数字を抽出
  const match = categoryId.match(/lv(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  // レベル表記がない場合は1とする
  return 1;
};

// ギルド内のカテゴリをレベル順にソート
const sortCategoriesByLevel = (categoryIds: string[]): string[] => {
  return [...categoryIds].sort((a, b) => {
    const levelA = extractLevelFromCategoryId(a);
    const levelB = extractLevelFromCategoryId(b);
    return levelA - levelB;
  });
};

// ギルドの進行状況を取得
export const getGuildProgress = (guildId: string): GuildProgress => {
  try {
    const saved = localStorage.getItem(`guild_progress_${guildId}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load guild progress:', error);
  }

  // デフォルト進行状況を作成
  const guild = (guildsData as Guild[]).find(g => g.id === guildId);
  if (!guild) {
    return { guildId, questStatuses: {} };
  }

  const sortedCategories = sortCategoriesByLevel(guild.categoryIds);
  const questStatuses: Record<string, QuestStatus> = {};

  // 最初のクエストのみ解放、残りはロック
  sortedCategories.forEach((categoryId, index) => {
    questStatuses[categoryId] = index === 0 ? 'unlocked' : 'locked';
  });

  return { guildId, questStatuses };
};

// ギルドの進行状況を保存
export const saveGuildProgress = (guildProgress: GuildProgress): void => {
  try {
    localStorage.setItem(
      `guild_progress_${guildProgress.guildId}`,
      JSON.stringify(guildProgress)
    );
  } catch (error) {
    console.error('Failed to save guild progress:', error);
  }
};

// クエストクリア時の処理
export const handleQuestClear = (guildId: string, clearedCategoryId: string): void => {
  const guild = (guildsData as Guild[]).find(g => g.id === guildId);
  if (!guild) return;

  const progress = getGuildProgress(guildId);
  const sortedCategories = sortCategoriesByLevel(guild.categoryIds);
  const clearedIndex = sortedCategories.indexOf(clearedCategoryId);

  if (clearedIndex === -1) return;

  // クリアしたクエストを "cleared" に設定
  progress.questStatuses[clearedCategoryId] = 'cleared';

  // 次のクエストがある場合は "justUnlocked" に設定
  if (clearedIndex + 1 < sortedCategories.length) {
    const nextCategoryId = sortedCategories[clearedIndex + 1];
    if (progress.questStatuses[nextCategoryId] === 'locked') {
      progress.questStatuses[nextCategoryId] = 'justUnlocked';
    }
  }

  saveGuildProgress(progress);
};

// "justUnlocked" を "unlocked" に変更
export const markQuestAsUnlocked = (guildId: string, categoryId: string): void => {
  const progress = getGuildProgress(guildId);
  if (progress.questStatuses[categoryId] === 'justUnlocked') {
    progress.questStatuses[categoryId] = 'unlocked';
    saveGuildProgress(progress);
  }
};

// 特定のクエストのステータスを取得
export const getQuestStatus = (guildId: string, categoryId: string): QuestStatus => {
  const progress = getGuildProgress(guildId);
  return progress.questStatuses[categoryId] || 'locked';
};

// ギルドIDを取得する関数
export const getGuildIdByCategoryId = (categoryId: string): string | null => {
  const guild = (guildsData as Guild[]).find(g => 
    g.categoryIds.includes(categoryId)
  );
  return guild ? guild.id : null;
}; 