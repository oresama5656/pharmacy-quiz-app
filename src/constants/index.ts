// キャラクター画像のURL（簡単に差し替え可能）
export const CHARACTER_IMAGES = {
    player: "/character/hero.png"
  };

// 敵キャラクターの画像URL（複数）
export const ENEMY_IMAGES = [
  "/enemy/ghost_blue.png",
  "/enemy/ghost_white.png",
  "/enemy/wolf_blue.png",
  "/enemy/wolf_white.png",
  "/enemy/warwolf.png",
  "/enemy/minotor.png",
  "/enemy/kappa.png",
  "/enemy/gremrin.png",
  "/enemy/harpy.png",
  "/enemy/mimic.png",
  "/enemy/oak_warriar1.png",
  "/enemy/oak_warriar2.png",
  "/enemy/oak_warriar3.png",
  "/enemy/inp.png"
];

// ボスキャラクターの画像URL（複数定義可能）
export const BOSS_IMAGES = [
  "/boss_enemy/oakking.png",
  "/boss_enemy/robot.png",
  "/boss_enemy/warm.png",
  "/boss_enemy/engel.png",
  "/boss_enemy/black_dragon_right.png",
  "/boss_enemy/satan_right.png"
];
  
// 背景画像のURL
export const BACKGROUND_IMAGES = {
  title: "/background/yusha_overthetown.png",
  category: "/background/map-town.png",
  battle: "https://github.com/oresama5656/GameData_Public/blob/main/background/sougen.png?raw=true",
  result: "https://github.com/oresama5656/GameData_Public/blob/main/background/orange_sougen_and_sourd.png?raw=true"
};

// BGM ファイルのURL
export const BGM = {
  game: '/audio/bgm/ClashofShadows.mp3',
  category: '/audio/bgm/sleepy.mp3',
  win: '/audio/bgm/VictorysEcho.mp3',
  lose: '/audio/bgm/FallenDreams.mp3'
};

// 効果音のURL
export const SOUND_EFFECTS = {
  // プレイヤーが敵を攻撃する音
  playerAttack: '/audio/se/slash.mp3',
  // 敵がプレイヤーを攻撃する音
  enemyAttack: '/audio/se/blow.mp3',
  // ボス警告音
  warning: '/audio/se/warning.mp3',
  // UI効果音
  uiStart: '/audio/se/slash.mp3',  // 代用
  clickGuild: '/audio/se/blow.mp3', // 代用
  clickCard: '/audio/se/warning.mp3' // 代用
};

// ゲーム設定
export const GAME_CONFIG = {
  // プレイヤーの最大HP
  PLAYER_MAX_HP: 20,
  // 通常敵のHP
  NORMAL_ENEMY_HP: 5,
  // ボス敵のHP
  BOSS_ENEMY_HP: 40
};

// 敵のHPを階層に応じて取得する関数
export const getEnemyHpForFloor = (floor: number): number => {
  return floor % 10 === 0 ? GAME_CONFIG.BOSS_ENEMY_HP : GAME_CONFIG.NORMAL_ENEMY_HP;
};