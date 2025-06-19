// キャラクター画像のURL（簡単に差し替え可能）
export const CHARACTER_IMAGES = {
    player: "https://github.com/oresama5656/GameData_Public/blob/main/character/battle_unit/red_swordman.png?raw=true"
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
  "/enemy/fukushi_madoushi.png",
  "/enemy/inp.png"
];

// ボスキャラクターの画像URL（複数定義可能）
export const BOSS_IMAGES = [
  "/enemy/hosoya_knight.png",
  "/enemy/hosoya_murabito.png",
  "/enemy/hosoya_syonin.png",
  "/enemy/hosoya_king.png",
  "/enemy/fukushi_madoushi.png"
];
  
  // 背景画像のURL
export const BACKGROUND_IMAGES = {
  title: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
  category: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
  battle: "https://github.com/oresama5656/GameData_Public/blob/main/background/sougen.png?raw=true",
  result: "https://github.com/oresama5656/GameData_Public/blob/main/background/orange_sougen_and_sourd.png?raw=true"
};

// // BGM ファイルのURL
// export const BGM = {
//   game: "https://github.com/oresama5656/GameData_Public/blob/main/audio/bgm/battle/Fallen%20Dreams.wav?raw=true",
//   category: "https://github.com/oresama5656/GameData_Public/blob/main/audio/bgm/other/sleepy.mp3?raw=true",
//   win: "https://github.com/oresama5656/GameData_Public/blob/main/audio/bgm/other/Victory's%20Echo.wav?raw=true",
//   lose: "https://github.com/oresama5656/GameData_Public/blob/main/audio/bgm/other/Fallen%20Dreams.wav?raw=true"
// };

// // 効果音のURL
// export const SOUND_EFFECTS = {
//   // プレイヤーが敵を攻撃する音
//   playerAttack: "https://github.com/oresama5656/GameData_Public/blob/main/audio/se/effect/slash.mp3?raw=true",
//   // 敵がプレイヤーを攻撃する音
//   enemyAttack: "https://github.com/oresama5656/GameData_Public/blob/main/audio/se/effect/blow.mp3?raw=true",
//   // ボス警告音
//   warning: "https://github.com/oresama5656/GameData_Public/blob/main/audio/se/effect/warning.mp3?raw=true"
// };

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
  warning: '/audio/se/warning.mp3'
};