import { Quiz } from '../types';
import categoriesData from './categories.json';

// 静的インポートですべてのクイズファイルを読み込み
import brand2generic from './quizzes/brand2generic.json';
import brand2effect from './quizzes/brand2effect.json';
import generic2effect from './quizzes/generic2effect.json';
import brand2generic_diabetes from './quizzes/brand2generic_diabetes.json';
import antibiotics from './quizzes/antibiotics.json';
import simple_math from './quizzes/simple_math.json';
import single_digit_division from './quizzes/single_digit_division.json';
import single_digit_mixed from './quizzes/single_digit_mixed.json';
import single_digit_multiplication from './quizzes/single_digit_multiplication.json';
import single_digit_subtraction from './quizzes/single_digit_subtraction.json';
import double_digit_addition from './quizzes/double_digit_addition.json';
import double_digit_division from './quizzes/double_digit_division.json';
import double_digit_mixed from './quizzes/double_digit_mixed.json';
import double_digit_multiplication from './quizzes/double_digit_multiplication.json';
import double_digit_subtraction from './quizzes/double_digit_subtraction.json';
import text_length from './quizzes/text_length.json';
import p2d_best30_ayame from './quizzes/p2d_best30_ayame.json';
import p2d_best31to60_ayame from './quizzes/p2d_best31to60_ayame.json';
import p2d_best61to90_ayame from './quizzes/p2d_best61to90_ayame.json';
import p2d_best91to120_ayame from './quizzes/p2d_best91to120_ayame.json';
import p2d_best121to150_ayame from './quizzes/p2d_best121to150_ayame.json';

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
  // 基本クイズ
  'quizzes/brand2generic.json': brand2generic,
  'quizzes/brand2effect.json': brand2effect,
  'quizzes/generic2effect.json': generic2effect,
  'quizzes/brand2generic_diabetes.json': brand2generic_diabetes,
  'quizzes/antibiotics.json': antibiotics,
  'quizzes/simple_math.json': simple_math,
  'quizzes/single_digit_division.json': single_digit_division,
  'quizzes/single_digit_mixed.json': single_digit_mixed,
  'quizzes/single_digit_multiplication.json': single_digit_multiplication,
  'quizzes/single_digit_subtraction.json': single_digit_subtraction,
  'quizzes/double_digit_addition.json': double_digit_addition,
  'quizzes/double_digit_division.json': double_digit_division,
  'quizzes/double_digit_mixed.json': double_digit_mixed,
  'quizzes/double_digit_multiplication.json': double_digit_multiplication,
  'quizzes/double_digit_subtraction.json': double_digit_subtraction,
  'quizzes/text_length.json': text_length,
  
  // p2d系
  'quizzes/p2d_best30_ayame.json': p2d_best30_ayame,
  'quizzes/p2d_best31to60_ayame.json': p2d_best31to60_ayame,
  'quizzes/p2d_best61to90_ayame.json': p2d_best61to90_ayame,
  'quizzes/p2d_best91to120_ayame.json': p2d_best91to120_ayame,
  'quizzes/p2d_best121to150_ayame.json': p2d_best121to150_ayame,
  
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
    if (filePath.includes('math/') || filePath.includes('simple_math') || 
        filePath.includes('single_digit') || filePath.includes('double_digit')) {
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