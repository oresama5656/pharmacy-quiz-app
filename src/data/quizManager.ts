import { Quiz } from '../types';
import categoriesData from './categories.json';

// 静的インポートですべてのクイズファイルを読み込み
import brand2generic from './quizzes/pharma/brand2generic.json';
import brand2effect from './quizzes/pharma/brand2effect.json';
import generic2effect from './quizzes/pharma/generic2effect.json';
import brand2generic_diabetes from './quizzes/pharma/brand2generic_diabetes.json';
import antibiotics from './quizzes/pharma/antibiotics.json';
import simple_math from './quizzes/math_mix/simple_math.json';
import single_digit_division from './quizzes/math_mix/single_digit_division.json';
import single_digit_mixed from './quizzes/math_mix/single_digit_mixed.json';
import single_digit_multiplication from './quizzes/math_mix/single_digit_multiplication.json';
import single_digit_subtraction from './quizzes/math_mix/single_digit_subtraction.json';
import double_digit_addition from './quizzes/math_mix/double_digit_addition.json';
import double_digit_division from './quizzes/math_mix/double_digit_division.json';
import double_digit_mixed from './quizzes/math_mix/double_digit_mixed.json';
import double_digit_multiplication from './quizzes/math_mix/double_digit_multiplication.json';
import double_digit_subtraction from './quizzes/math_mix/double_digit_subtraction.json';
import text_length from './quizzes/text_length.json';
import p2d_best30_ayame from './quizzes/ayame/p2d_best30_ayame.json';
import p2d_best31to60_ayame from './quizzes/ayame/p2d_best31to60_ayame.json';
import p2d_best61to90_ayame from './quizzes/ayame/p2d_best61to90_ayame.json';
import p2d_best91to120_ayame from './quizzes/ayame/p2d_best91to120_ayame.json';
import p2d_best121to150_ayame from './quizzes/ayame/p2d_best121to150_ayame.json';

// 数学クイズ
import lv1_single_digit_multiplication_quiz from './quizzes/math/lv1_single_digit_multiplication_quiz.json';
import lv2_single_digit_division_quiz from './quizzes/math/lv2_single_digit_division_quiz.json';
import lv3_single_digit_by_two_digit_multiplication from './quizzes/math/lv3_single_digit_by_two_digit_multiplication.json';
import lv4_two_digit_division_quiz from './quizzes/math/lv4_two_digit_division_quiz.json';
import lv5_multiplication_word_problems from './quizzes/math/lv5_multiplication_word_problems.json';
import lv6_division_word_problems from './quizzes/math/lv6_division_word_problems.json';
import lv7_two_digit_times_one_digit_multiplication from './quizzes/math/lv7_two_digit_times_one_digit_multiplication.json';
import lv8_two_digit_division_with_remainder from './quizzes/math/lv8_two_digit_division_with_remainder.json';
import lv9_mixed_operations from './quizzes/math/lv9_mixed_operations.json';
import lv10_advanced_word_problems from './quizzes/math/lv10_advanced_word_problems.json';

// 英語クイズ
import english_lv1 from './quizzes/english/english_lv1.json';
import english_lv2 from './quizzes/english/english_lv2.json';
import english_lv3 from './quizzes/english/english_lv3.json';
import english_lv4 from './quizzes/english/english_lv4.json';
import english_lv5 from './quizzes/english/english_lv5.json';
import english_lv6 from './quizzes/english/english_lv6.json';
import english_lv7 from './quizzes/english/english_lv7.json';
import english_lv8 from './quizzes/english/english_lv8.json';
import english_lv9 from './quizzes/english/english_lv9.json';
import english_lv10 from './quizzes/english/english_lv10.json';

// 基本算数クイズ
import basic_math_lv1 from './quizzes/basic_math/basic_math_lv1.json';
import basic_math_lv2 from './quizzes/basic_math/basic_math_lv2.json';
import basic_math_lv3 from './quizzes/basic_math/basic_math_lv3.json';
import basic_math_lv4 from './quizzes/basic_math/basic_math_lv4.json';
import basic_math_lv5 from './quizzes/basic_math/basic_math_lv5.json';
import basic_math_lv6 from './quizzes/basic_math/basic_math_lv6.json';
import basic_math_lv7 from './quizzes/basic_math/basic_math_lv7.json';
import basic_math_lv8 from './quizzes/basic_math/basic_math_lv8.json';
import basic_math_lv9 from './quizzes/basic_math/basic_math_lv9.json';
import basic_math_lv10 from './quizzes/basic_math/basic_math_lv10.json';

// 国語クイズ
import lv1_kanji_yomikata from './quizzes/kokugo/lv1_kanji_yomikata.json';
import lv2_douon_igigo from './quizzes/kokugo/lv2_douon_igigo.json';
import lv3_kotowaza from './quizzes/kokugo/lv3_kotowaza.json';
import lv4_keigo from './quizzes/kokugo/lv4_keigo.json';
import lv5_taigigo_ruigigo from './quizzes/kokugo/lv5_taigigo_ruigigo.json';
import lv6_jukugo from './quizzes/kokugo/lv6_jukugo.json';
import lv7_grammar from './quizzes/kokugo/lv7_grammar.json';
import lv8_short_reading from './quizzes/kokugo/lv8_short_reading.json';
import lv9_sentence_structure from './quizzes/kokugo/lv9_sentence_structure.json';
import lv10_long_reading from './quizzes/kokugo/lv10_long_reading.json';

// カテゴリ情報の型定義
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  clearFloor: number;
  file?: string;
}

// 内部用のカテゴリ型（fileプロパティ付き）
interface CategoryWithFile extends Category {
  file: string;
}

// 静的インポートマップ
const quizImportMap: Record<string, any> = {
  // 薬学クイズ
  'quizzes/pharma/brand2generic.json': brand2generic,
  'quizzes/pharma/brand2effect.json': brand2effect,
  'quizzes/pharma/generic2effect.json': generic2effect,
  'quizzes/pharma/brand2generic_diabetes.json': brand2generic_diabetes,
  'quizzes/pharma/antibiotics.json': antibiotics,
  
  // 算数・数学ミックス
  'quizzes/math_mix/simple_math.json': simple_math,
  'quizzes/math_mix/single_digit_division.json': single_digit_division,
  'quizzes/math_mix/single_digit_mixed.json': single_digit_mixed,
  'quizzes/math_mix/single_digit_multiplication.json': single_digit_multiplication,
  'quizzes/math_mix/single_digit_subtraction.json': single_digit_subtraction,
  'quizzes/math_mix/double_digit_addition.json': double_digit_addition,
  'quizzes/math_mix/double_digit_division.json': double_digit_division,
  'quizzes/math_mix/double_digit_mixed.json': double_digit_mixed,
  'quizzes/math_mix/double_digit_multiplication.json': double_digit_multiplication,
  'quizzes/math_mix/double_digit_subtraction.json': double_digit_subtraction,
  
  // テスト系
  'quizzes/text_length.json': text_length,
  
  // あやめ（p2d）系
  'quizzes/ayame/p2d_best30_ayame.json': p2d_best30_ayame,
  'quizzes/ayame/p2d_best31to60_ayame.json': p2d_best31to60_ayame,
  'quizzes/ayame/p2d_best61to90_ayame.json': p2d_best61to90_ayame,
  'quizzes/ayame/p2d_best91to120_ayame.json': p2d_best91to120_ayame,
  'quizzes/ayame/p2d_best121to150_ayame.json': p2d_best121to150_ayame,
  
  // 数学クイズ
  'quizzes/math/lv1_single_digit_multiplication_quiz.json': lv1_single_digit_multiplication_quiz,
  'quizzes/math/lv2_single_digit_division_quiz.json': lv2_single_digit_division_quiz,
  'quizzes/math/lv3_single_digit_by_two_digit_multiplication.json': lv3_single_digit_by_two_digit_multiplication,
  'quizzes/math/lv4_two_digit_division_quiz.json': lv4_two_digit_division_quiz,
  'quizzes/math/lv5_multiplication_word_problems.json': lv5_multiplication_word_problems,
  'quizzes/math/lv6_division_word_problems.json': lv6_division_word_problems,
  'quizzes/math/lv7_two_digit_times_one_digit_multiplication.json': lv7_two_digit_times_one_digit_multiplication,
  'quizzes/math/lv8_two_digit_division_with_remainder.json': lv8_two_digit_division_with_remainder,
  'quizzes/math/lv9_mixed_operations.json': lv9_mixed_operations,
  'quizzes/math/lv10_advanced_word_problems.json': lv10_advanced_word_problems,
  
  // 英語クイズ
  'quizzes/english/english_lv1.json': english_lv1,
  'quizzes/english/english_lv2.json': english_lv2,
  'quizzes/english/english_lv3.json': english_lv3,
  'quizzes/english/english_lv4.json': english_lv4,
  'quizzes/english/english_lv5.json': english_lv5,
  'quizzes/english/english_lv6.json': english_lv6,
  'quizzes/english/english_lv7.json': english_lv7,
  'quizzes/english/english_lv8.json': english_lv8,
  'quizzes/english/english_lv9.json': english_lv9,
  'quizzes/english/english_lv10.json': english_lv10,
  
  // 基本算数クイズ
  'quizzes/basic_math/basic_math_lv1.json': basic_math_lv1,
  'quizzes/basic_math/basic_math_lv2.json': basic_math_lv2,
  'quizzes/basic_math/basic_math_lv3.json': basic_math_lv3,
  'quizzes/basic_math/basic_math_lv4.json': basic_math_lv4,
  'quizzes/basic_math/basic_math_lv5.json': basic_math_lv5,
  'quizzes/basic_math/basic_math_lv6.json': basic_math_lv6,
  'quizzes/basic_math/basic_math_lv7.json': basic_math_lv7,
  'quizzes/basic_math/basic_math_lv8.json': basic_math_lv8,
  'quizzes/basic_math/basic_math_lv9.json': basic_math_lv9,
  'quizzes/basic_math/basic_math_lv10.json': basic_math_lv10,
  
  // 国語クイズ
  'quizzes/kokugo/lv1_kanji_yomikata.json': lv1_kanji_yomikata,
  'quizzes/kokugo/lv2_douon_igigo.json': lv2_douon_igigo,
  'quizzes/kokugo/lv3_kotowaza.json': lv3_kotowaza,
  'quizzes/kokugo/lv4_keigo.json': lv4_keigo,
  'quizzes/kokugo/lv5_taigigo_ruigigo.json': lv5_taigigo_ruigigo,
  'quizzes/kokugo/lv6_jukugo.json': lv6_jukugo,
  'quizzes/kokugo/lv7_grammar.json': lv7_grammar,
  'quizzes/kokugo/lv8_short_reading.json': lv8_short_reading,
  'quizzes/kokugo/lv9_sentence_structure.json': lv9_sentence_structure,
  'quizzes/kokugo/lv10_long_reading.json': lv10_long_reading,
};

// クイズファイルのキャッシュ
const quizCache: Record<string, Quiz[]> = {};

// クイズファイルを読み込み
const loadQuizFile = (filePath: string): Quiz[] => {
  // キャッシュがあれば返す
  if (quizCache[filePath]) {
    return quizCache[filePath];
  }

  try {
    // 静的インポートマップから取得
    const rawQuizzes = quizImportMap[filePath];
    if (!rawQuizzes) {
      console.error(`Quiz file not found in import map: ${filePath}`);
      return [];
    }

    let quizzes = rawQuizzes as Quiz[];
    
    // 数学系クイズの場合、数値を文字列に変換
    if (filePath.includes('math/') || filePath.includes('math_mix/') || filePath.includes('basic_math/')) {
      quizzes = quizzes.map(quiz => ({
        question: quiz.question,
        correct: String(quiz.correct),
        choices: quiz.choices.map(choice => String(choice))
      }));
    }
    
    // キャッシュに保存
    quizCache[filePath] = quizzes;
    return quizzes;
  } catch (error) {
    console.error(`Failed to load quiz file: ${filePath}`, error);
    return [];
  }
};

// カテゴリ一覧を取得
export const getCategories = (): Category[] => {
  return (categoriesData as CategoryWithFile[]).map(cat => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon: cat.icon,
    difficulty: cat.difficulty,
    clearFloor: cat.clearFloor
  }));
};

// 特定のカテゴリのクイズを取得（同期版に変更）
export const getQuizzesByCategory = (categoryId: string): Quiz[] => {
  const category = (categoriesData as CategoryWithFile[]).find(cat => cat.id === categoryId);
  if (!category) {
    console.warn(`Category not found: ${categoryId}`);
    return [];
  }
  
  return loadQuizFile(category.file);
};

// 特定のカテゴリ情報を取得
export const getCategoryById = (categoryId: string): Category | undefined => {
  const category = (categoriesData as CategoryWithFile[]).find(cat => cat.id === categoryId);
  if (!category) return undefined;
  
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
    difficulty: category.difficulty,
    clearFloor: category.clearFloor
  };
};

// 新しいクイズを追加する関数（将来的にAPIを使う場合に備えて）
export const addQuiz = (categoryId: string, quiz: Quiz): void => {
  // この関数は現在はローカルでのみ動作します
  // 将来的にはAPIを呼び出してデータベースに保存する処理を実装できます
  console.log(`クイズを追加: ${categoryId}`, quiz);
};

// クイズをシャッフルする関数
export const shuffleQuizzes = <T>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 選択肢をシャッフルする関数
export const shuffleChoices = (quiz: Quiz): Quiz => {
  const shuffledChoices = shuffleQuizzes(quiz.choices);
  return {
    ...quiz,
    choices: shuffledChoices
  };
}; 