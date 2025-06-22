import { Quiz } from '../types';

// JSONファイルからクイズデータをインポート
import brand2generic from './brand2generic.json';
import brand2effect from './brand2effect.json';
import generic2effect from './generic2effect.json';
import brand2generic_diabetes from './brand2generic_diabetes.json';
import antibiotics from './antibiotics.json';
import simple_math from './simple_math.json';
import single_digit_subtraction from './single_digit_subtraction.json';
import single_digit_multiplication from './single_digit_multiplication.json';
import single_digit_division from './single_digit_division.json';
import double_digit_addition from './double_digit_addition.json';
import double_digit_subtraction from './double_digit_subtraction.json';
import double_digit_multiplication from './double_digit_multiplication.json';
import double_digit_division from './double_digit_division.json';
import single_digit_mixed from './single_digit_mixed.json';
import double_digit_mixed from './double_digit_mixed.json';
import text_length from './text_length.json';
import p2d_best30_ayame from './p2d_best30_ayame.json';
import p2d_best31to60_ayame from './p2d_best31to60_ayame.json';
import p2d_best61to90_ayame from './p2d_best61to90_ayame.json';
import p2d_best91to120_ayame from './p2d_best91to120_ayame.json';
import p2d_best121to150_ayame from './p2d_best121to150_ayame.json';

// 数学ギルドの新しいクイズをインポート
import lv1_single_digit_multiplication_quiz from './math/lv1_single_digit_multiplication_quiz.json';
import lv2_single_digit_division_quiz from './math/lv2_single_digit_division_quiz.json';
import lv3_single_digit_by_two_digit_multiplication from './math/lv3_single_digit_by_two_digit_multiplication.json';
import lv4_two_digit_division_quiz from './math/lv4_two_digit_division_quiz.json';
import lv5_multiplication_word_problems from './math/lv5_multiplication_word_problems.json';
import lv6_division_word_problems from './math/lv6_division_word_problems.json';
import lv7_two_digit_times_one_digit_multiplication from './math/lv7_two_digit_times_one_digit_multiplication.json';
import lv8_two_digit_division_with_remainder from './math/lv8_two_digit_division_with_remainder.json';
import lv9_mixed_operations from './math/lv9_mixed_operations.json';
import lv10_advanced_word_problems from './math/lv10_advanced_word_problems.json';

// 英語ギルドの新しいクイズをインポート
import english_lv1 from './english/english_lv1.json';
import english_lv2 from './english/english_lv2.json';
import english_lv3 from './english/english_lv3.json';
import english_lv4 from './english/english_lv4.json';
import english_lv5 from './english/english_lv5.json';
import english_lv6 from './english/english_lv6.json';
import english_lv7 from './english/english_lv7.json';
import english_lv8 from './english/english_lv8.json';
import english_lv9 from './english/english_lv9.json';
import english_lv10 from './english/english_lv10.json';

// 基礎計算クイズをインポート
import basic_math_lv1 from './basic_math/basic_math_lv1.json';
import basic_math_lv2 from './basic_math/basic_math_lv2.json';
import basic_math_lv3 from './basic_math/basic_math_lv3.json';
import basic_math_lv4 from './basic_math/basic_math_lv4.json';
import basic_math_lv5 from './basic_math/basic_math_lv5.json';
import basic_math_lv6 from './basic_math/basic_math_lv6.json';
import basic_math_lv7 from './basic_math/basic_math_lv7.json';
import basic_math_lv8 from './basic_math/basic_math_lv8.json';
import basic_math_lv9 from './basic_math/basic_math_lv9.json';
import basic_math_lv10 from './basic_math/basic_math_lv10.json';


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
  single_digit_subtraction: single_digit_subtraction.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  single_digit_multiplication: single_digit_multiplication.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  single_digit_division: single_digit_division.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  double_digit_addition: double_digit_addition.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  double_digit_subtraction: double_digit_subtraction.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  double_digit_multiplication: double_digit_multiplication.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  double_digit_division: double_digit_division.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  single_digit_mixed: single_digit_mixed.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  double_digit_mixed: double_digit_mixed.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  text_length: text_length as Quiz[],
  p2d_best30_ayame: p2d_best30_ayame as Quiz[],
  p2d_best31to60_ayame: p2d_best31to60_ayame as Quiz[],
  p2d_best61to90_ayame: p2d_best61to90_ayame as Quiz[],
  p2d_best91to120_ayame: p2d_best91to120_ayame as Quiz[],
  p2d_best121to150_ayame: p2d_best121to150_ayame as Quiz[],
  
  // 数学ギルドの新しいクイズを追加
  lv1_single_digit_multiplication_quiz: lv1_single_digit_multiplication_quiz.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv2_single_digit_division_quiz: lv2_single_digit_division_quiz.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv3_single_digit_by_two_digit_multiplication: lv3_single_digit_by_two_digit_multiplication.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv4_two_digit_division_quiz: lv4_two_digit_division_quiz.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv5_multiplication_word_problems: lv5_multiplication_word_problems.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv6_division_word_problems: lv6_division_word_problems.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv7_two_digit_times_one_digit_multiplication: lv7_two_digit_times_one_digit_multiplication.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv8_two_digit_division_with_remainder: lv8_two_digit_division_with_remainder.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv9_mixed_operations: lv9_mixed_operations.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],
  lv10_advanced_word_problems: lv10_advanced_word_problems.map(quiz => ({
    question: quiz.question,
    correct: String(quiz.correct),
    choices: quiz.choices.map(choice => String(choice))
  })) as Quiz[],

  // 基礎計算クイズを追加
  basic_math_lv1: basic_math_lv1 as Quiz[],
  basic_math_lv2: basic_math_lv2 as Quiz[],
  basic_math_lv3: basic_math_lv3 as Quiz[],
  basic_math_lv4: basic_math_lv4 as Quiz[],
  basic_math_lv5: basic_math_lv5 as Quiz[],
  basic_math_lv6: basic_math_lv6 as Quiz[],
  basic_math_lv7: basic_math_lv7 as Quiz[],
  basic_math_lv8: basic_math_lv8 as Quiz[],
  basic_math_lv9: basic_math_lv9 as Quiz[],
  basic_math_lv10: basic_math_lv10 as Quiz[],

  // 英語ギルドの新しいクイズを追加
  english_lv1: english_lv1 as Quiz[],
  english_lv2: english_lv2 as Quiz[],
  english_lv3: english_lv3 as Quiz[],
  english_lv4: english_lv4 as Quiz[],
  english_lv5: english_lv5 as Quiz[],
  english_lv6: english_lv6 as Quiz[],
  english_lv7: english_lv7 as Quiz[],
  english_lv8: english_lv8 as Quiz[],
  english_lv9: english_lv9 as Quiz[],
  english_lv10: english_lv10 as Quiz[]
};

// 新しいカテゴリを追加する場合は、JSONファイルを作成してここにインポートするだけでOK