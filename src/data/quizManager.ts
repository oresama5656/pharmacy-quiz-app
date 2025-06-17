import { Quiz } from '../types';
import { quizData } from './quizData';
import categories from './categories.json';

// カテゴリ情報の型定義
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  clearFloor: number;
}

// カテゴリIDの型を定義
export type CategoryId = keyof typeof quizData;

// カテゴリ一覧を取得
export const getCategories = (): Category[] => {
  return categories as Category[];
};

// 特定のカテゴリのクイズを取得
export const getQuizzesByCategory = (categoryId: string): Quiz[] => {
  return quizData[categoryId as CategoryId];
};

// 特定のカテゴリ情報を取得
export const getCategoryById = (categoryId: string): Category | undefined => {
  return (categories as Category[]).find((category) => category.id === categoryId);
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