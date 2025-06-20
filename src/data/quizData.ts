import { Quiz } from '../types';

// JSONファイルからクイズデータをインポート
import brand2generic from './brand2generic.json';
import brand2effect from './brand2effect.json';
import generic2effect from './generic2effect.json';
import brand2generic_diabetes from './brand2generic_diabetes.json';
import antibiotics from './antibiotics.json';
import simple_math from './simple_math.json';
import text_length from './text_length.json';
import p2d_best30_ayame from './p2d_best30_ayame.json';
import p2d_best31to60_ayame from './p2d_best31to60_ayame.json';
import p2d_best61to90_ayame from './p2d_best61to90_ayame.json';
import p2d_best91to120_ayame from './p2d_best91to120_ayame.json';
import p2d_best121to150_ayame from './p2d_best121to150_ayame.json';


// クイズデータをエクスポート
export const quizData = {
  brand2generic: brand2generic as Quiz[],
  brand2effect: brand2effect as Quiz[],
  generic2effect: generic2effect as Quiz[],
  brand2generic_diabetes: brand2generic_diabetes as Quiz[],
  antibiotics: antibiotics as Quiz[],
  simple_math: simple_math.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  text_length: text_length as Quiz[],
  p2d_best30_ayame: p2d_best30_ayame as Quiz[],
  p2d_best31to60_ayame: p2d_best31to60_ayame as Quiz[],
  p2d_best61to90_ayame: p2d_best61to90_ayame as Quiz[],
  p2d_best91to120_ayame: p2d_best91to120_ayame as Quiz[],
  p2d_best121to150_ayame: p2d_best121to150_ayame as Quiz[]
};

// 新しいカテゴリを追加する場合は、JSONファイルを作成してここにインポートするだけでOK