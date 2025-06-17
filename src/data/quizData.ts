import { Quiz } from '../types';

// JSONファイルからクイズデータをインポート
import brand2generic from './brand2generic.json';
import brand2effect from './brand2effect.json';
import generic2effect from './generic2effect.json';
import brand2generic_diabetes from './brand2generic_diabetes.json';
import antibiotics from './antibiotics.json';
import simple_math from './simple_math.json';

// クイズデータをエクスポート
export const quizData = {
  brand2generic: brand2generic as Quiz[],
  brand2effect: brand2effect as Quiz[],
  generic2effect: generic2effect as Quiz[],
  brand2generic_diabetes: brand2generic_diabetes as Quiz[],
  antibiotics: antibiotics as Quiz[],
  simple_math: simple_math as Quiz[]
};

// 新しいカテゴリを追加する場合は、JSONファイルを作成してここにインポートするだけでOK