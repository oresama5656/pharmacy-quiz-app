import { Quiz } from '../types';
import categoriesData from './categories.json';

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
    if (filePath.includes('math/') || filePath.includes('basic_math/')) {
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
  const categories = categoriesData as CategoryWithFile[];
  return categories.map(({ file, ...category }) => category);
};

// カテゴリIDからクイズ一覧を取得
export const getQuizzesByCategory = (categoryId: string): Quiz[] => {
  const categories = categoriesData as CategoryWithFile[];
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category || !category.file) {
    console.error(`Category not found or file not specified: ${categoryId}`);
    return [];
  }
  
  return loadQuizFile(category.file);
};

// カテゴリIDからカテゴリ情報を取得
export const getCategoryById = (categoryId: string): Category | undefined => {
  const categories = categoriesData as CategoryWithFile[];
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return undefined;
  }
  
  // fileプロパティを除いて返す
  const { file, ...categoryWithoutFile } = category;
  return categoryWithoutFile;
};

// クイズを追加（開発用）
export const addQuiz = (categoryId: string, quiz: Quiz): void => {
  const category = getCategoryById(categoryId);
  if (!category) {
    console.error(`Category not found: ${categoryId}`);
    return;
  }
  
  // 開発環境でのみ実行可能
  console.log(`Adding quiz to category ${categoryId}:`, quiz);
};

// 配列をシャッフル
export const shuffleQuizzes = <T>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// クイズの選択肢をシャッフル
export const shuffleChoices = (quiz: Quiz): Quiz => {
  const correctAnswer = quiz.correct;
  const shuffledChoices = shuffleQuizzes(quiz.choices);
  
  return {
    ...quiz,
    choices: shuffledChoices,
    correct: correctAnswer // 正解は変更しない
  };
}; 