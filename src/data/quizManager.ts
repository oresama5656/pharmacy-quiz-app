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
import english2_lv1 from './quizzes/english2/lv1_homophones.json';
import english2_lv2 from './quizzes/english2/lv2_antonyms_synonyms.json';
import english2_lv3 from './quizzes/english2/lv3_phrasal_verbs.json';
import english2_lv4 from './quizzes/english2/lv4_dialogue_fill.json';
import english2_lv5 from './quizzes/english2/lv5_parts_of_speech.json';
import english2_lv6 from './quizzes/english2/lv6_english_definitions.json';
import english2_lv7 from './quizzes/english2/lv7_sentence_order.json';
import english2_lv8 from './quizzes/english2/lv8_short_paragraph_order.json';
import english2_lv9 from './quizzes/english2/lv9_culture_customs.json';
import english2_lv10 from './quizzes/english2/lv10_sentence_correction.json';

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

// 英語3クイズ
import english3_lv1 from './quizzes/english3/lv1_passive_voice.json';
import english3_lv2 from './quizzes/english3/lv2_relative_pronouns.json';
import english3_lv3 from './quizzes/english3/lv3_verb_tenses.json';
import english3_lv4 from './quizzes/english3/lv4_comparison.json';
import english3_lv5 from './quizzes/english3/lv5_if_clauses.json';
import english3_lv6 from './quizzes/english3/lv6_reading_comprehension.json';
import english3_lv7 from './quizzes/english3/lv7_word_usage.json';
import english3_lv8 from './quizzes/english3/lv8_prepositions_advanced.json';
import english3_lv9 from './quizzes/english3/lv9_conversation_selection.json';
import english3_lv10 from './quizzes/english3/lv10_error_correction.json';

// 国語2クイズ
import kokugo2_lv1 from './quizzes/kokugo2/lv1_kanji_yomikata.json';
import kokugo2_lv2 from './quizzes/kokugo2/lv2_jukugo_meaning.json';
import kokugo2_lv3 from './quizzes/kokugo2/lv3_hyougen_gihou.json';
import kokugo2_lv4 from './quizzes/kokugo2/lv4_kango_wago_gairaigo.json';
import kokugo2_lv5 from './quizzes/kokugo2/lv5_keigo_kihon.json';
import kokugo2_lv6 from './quizzes/kokugo2/lv6_bunpou_ouyou.json';
import kokugo2_lv7 from './quizzes/kokugo2/lv7_keigo_tsukaikata.json';
import kokugo2_lv8 from './quizzes/kokugo2/lv8_kaki_hanashi_kotoba.json';
import kokugo2_lv9 from './quizzes/kokugo2/lv9_shugo_jutsugo.json';
import kokugo2_lv10 from './quizzes/kokugo2/lv10_gojun_narabekae.json';

// 国語3クイズ
import kokugo3_lv1 from './quizzes/kokugo3/lv1_kanji_kun_on.json';
import kokugo3_lv2 from './quizzes/kokugo3/lv2_jukugo_structure.json';
import kokugo3_lv3 from './quizzes/kokugo3/lv3_yojijukugo_meaning.json';
import kokugo3_lv4 from './quizzes/kokugo3/lv4_keigo_misuse.json';
import kokugo3_lv5 from './quizzes/kokugo3/lv5_bunshou_hyougen.json';
import kokugo3_lv6 from './quizzes/kokugo3/lv6_bunpou_keitai.json';
import kokugo3_lv7 from './quizzes/kokugo3/lv7_bundokai_tenkai.json';
import kokugo3_lv8 from './quizzes/kokugo3/lv8_setsuzokushi_tsukaikata.json';
import kokugo3_lv9 from './quizzes/kokugo3/lv9_bungaku_jiten.json';
import kokugo3_lv10 from './quizzes/kokugo3/lv10_sakubun_kousou.json';

// 算数3クイズ
import math3_lv1 from './quizzes/math3/lv1_decimal_calculations.json';
import math3_lv2 from './quizzes/math3/lv2_fraction_calculations.json';
import math3_lv3 from './quizzes/math3/lv3_percent_calculations.json';
import math3_lv4 from './quizzes/math3/lv4_unit_conversion.json';
import math3_lv5 from './quizzes/math3/lv5_speed_calculations.json';
import math3_lv6 from './quizzes/math3/lv6_multiples_and_factors.json';
import math3_lv7 from './quizzes/math3/lv7_even_odd_properties.json';
import math3_lv8 from './quizzes/math3/lv8_number_sequences.json';
import math3_lv9 from './quizzes/math3/lv9_mixed_operations_text.json';
import math3_lv10 from './quizzes/math3/lv10_applied_and_tricky.json';

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
  'quizzes/english2/lv1_homophones.json': english2_lv1,
  'quizzes/english2/lv2_antonyms_synonyms.json': english2_lv2,
  'quizzes/english2/lv3_phrasal_verbs.json': english2_lv3,
  'quizzes/english2/lv4_dialogue_fill.json': english2_lv4,
  'quizzes/english2/lv5_parts_of_speech.json': english2_lv5,
  'quizzes/english2/lv6_english_definitions.json': english2_lv6,
  'quizzes/english2/lv7_sentence_order.json': english2_lv7,
  'quizzes/english2/lv8_short_paragraph_order.json': english2_lv8,
  'quizzes/english2/lv9_culture_customs.json': english2_lv9,
  'quizzes/english2/lv10_sentence_correction.json': english2_lv10,
  
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
  
  // 英語3クイズ
  'quizzes/english3/lv1_passive_voice.json': english3_lv1,
  'quizzes/english3/lv2_relative_pronouns.json': english3_lv2,
  'quizzes/english3/lv3_verb_tenses.json': english3_lv3,
  'quizzes/english3/lv4_comparison.json': english3_lv4,
  'quizzes/english3/lv5_if_clauses.json': english3_lv5,
  'quizzes/english3/lv6_reading_comprehension.json': english3_lv6,
  'quizzes/english3/lv7_word_usage.json': english3_lv7,
  'quizzes/english3/lv8_prepositions_advanced.json': english3_lv8,
  'quizzes/english3/lv9_conversation_selection.json': english3_lv9,
  'quizzes/english3/lv10_error_correction.json': english3_lv10,
  
  // 国語2クイズ
  'quizzes/kokugo2/lv1_kanji_yomikata.json': kokugo2_lv1,
  'quizzes/kokugo2/lv2_jukugo_meaning.json': kokugo2_lv2,
  'quizzes/kokugo2/lv3_hyougen_gihou.json': kokugo2_lv3,
  'quizzes/kokugo2/lv4_kango_wago_gairaigo.json': kokugo2_lv4,
  'quizzes/kokugo2/lv5_keigo_kihon.json': kokugo2_lv5,
  'quizzes/kokugo2/lv6_bunpou_ouyou.json': kokugo2_lv6,
  'quizzes/kokugo2/lv7_keigo_tsukaikata.json': kokugo2_lv7,
  'quizzes/kokugo2/lv8_kaki_hanashi_kotoba.json': kokugo2_lv8,
  'quizzes/kokugo2/lv9_shugo_jutsugo.json': kokugo2_lv9,
  'quizzes/kokugo2/lv10_gojun_narabekae.json': kokugo2_lv10,
  
  // 国語3クイズ
  'quizzes/kokugo3/lv1_kanji_kun_on.json': kokugo3_lv1,
  'quizzes/kokugo3/lv2_jukugo_structure.json': kokugo3_lv2,
  'quizzes/kokugo3/lv3_yojijukugo_meaning.json': kokugo3_lv3,
  'quizzes/kokugo3/lv4_keigo_misuse.json': kokugo3_lv4,
  'quizzes/kokugo3/lv5_bunshou_hyougen.json': kokugo3_lv5,
  'quizzes/kokugo3/lv6_bunpou_keitai.json': kokugo3_lv6,
  'quizzes/kokugo3/lv7_bundokai_tenkai.json': kokugo3_lv7,
  'quizzes/kokugo3/lv8_setsuzokushi_tsukaikata.json': kokugo3_lv8,
  'quizzes/kokugo3/lv9_bungaku_jiten.json': kokugo3_lv9,
  'quizzes/kokugo3/lv10_sakubun_kousou.json': kokugo3_lv10,
  
  // 算数3クイズ
  'quizzes/math3/lv1_decimal_calculations.json': math3_lv1,
  'quizzes/math3/lv2_fraction_calculations.json': math3_lv2,
  'quizzes/math3/lv3_percent_calculations.json': math3_lv3,
  'quizzes/math3/lv4_unit_conversion.json': math3_lv4,
  'quizzes/math3/lv5_speed_calculations.json': math3_lv5,
  'quizzes/math3/lv6_multiples_and_factors.json': math3_lv6,
  'quizzes/math3/lv7_even_odd_properties.json': math3_lv7,
  'quizzes/math3/lv8_number_sequences.json': math3_lv8,
  'quizzes/math3/lv9_mixed_operations_text.json': math3_lv9,
  'quizzes/math3/lv10_applied_and_tricky.json': math3_lv10,
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