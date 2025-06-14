import { Quiz } from '../types';

// サンプルクイズデータ
export const quizData = {
  brand2generic: [
    {
      question: "ムコダイン",
      correct: "カルボシステイン",
      choices: ["アンブロキソール", "カルボシステイン", "エプラジノン", "メキタジン"]
    },
    {
      question: "ロキソニン",
      correct: "ロキソプロフェン", 
      choices: ["イブプロフェン", "アセトアミノフェン", "ロキソプロフェン", "ジクロフェナク"]
    },
    {
      question: "フロモックス",
      correct: "セフカペン ピボキシル",
      choices: ["アモキシシリン", "セフカペン ピボキシル", "クラリスロマイシン", "レボフロキサシン"]
    },
    {
      question: "PL顆粒",
      correct: "サリチルアミド配合剤",
      choices: ["アセトアミノフェン", "イブプロフェン", "サリチルアミド配合剤", "ロキソプロフェン"]
    },
    {
      question: "マイスリー",
      correct: "ゾルピデム",
      choices: ["ゾピクロン", "エスゾピクロン", "ゾルピデム", "ブロチゾラム"]
    }
  ] as Quiz[],
  brand2effect: [
    {
      question: "ロキソニン",
      correct: "解熱鎮痛消炎",
      choices: ["解熱鎮痛消炎", "抗菌", "去痰", "鎮咳"]
    },
    {
      question: "ムコダイン",
      correct: "去痰",
      choices: ["鎮咳", "去痰", "抗アレルギー", "気管支拡張"]
    },
    {
      question: "アレジオン",
      correct: "抗アレルギー",
      choices: ["抗菌", "抗アレルギー", "解熱鎮痛", "胃酸分泌抑制"]
    },
    {
      question: "ガスター",
      correct: "胃酸分泌抑制",
      choices: ["胃粘膜保護", "胃酸分泌抑制", "消化酵素", "整腸"]
    },
    {
      question: "デパス",
      correct: "抗不安・筋弛緩",
      choices: ["抗うつ", "抗不安・筋弛緩", "睡眠導入", "抗精神病"]
    }
  ] as Quiz[],
  generic2effect: [
    {
      question: "アンブロキソール",
      correct: "去痰",
      choices: ["鎮咳", "去痰", "気管支拡張", "抗アレルギー"]
    },
    {
      question: "ロキソプロフェン",
      correct: "解熱鎮痛消炎",
      choices: ["解熱鎮痛消炎", "抗菌", "抗ウイルス", "抗真菌"]
    },
    {
      question: "オメプラゾール",
      correct: "胃酸分泌抑制",
      choices: ["胃粘膜保護", "胃酸分泌抑制", "胃運動促進", "消化酵素"]
    },
    {
      question: "アムロジピン",
      correct: "Ca拮抗・降圧",
      choices: ["ACE阻害・降圧", "β遮断・降圧", "Ca拮抗・降圧", "利尿・降圧"]
    },
    {
      question: "メトホルミン",
      correct: "血糖降下",
      choices: ["血糖降下", "血圧降下", "コレステロール低下", "血栓予防"]
    }
  ] as Quiz[]
};