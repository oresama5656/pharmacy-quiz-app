import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

type HelpSection = 'overview' | 'gameplay' | 'save' | 'controls';

const HelpScreen: React.FC<HelpScreenProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<HelpSection>('overview');

  if (!isOpen) return null;

  const sections = [
    { id: 'overview' as HelpSection, title: '🎮 ゲーム概要', icon: '🎮' },
    { id: 'gameplay' as HelpSection, title: '⚔️ 遊び方', icon: '⚔️' },
    { id: 'save' as HelpSection, title: '💾 セーブ機能', icon: '💾' },
    { id: 'controls' as HelpSection, title: '🎯 操作方法', icon: '🎯' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-800 mb-4">🎮 ゲーム概要</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">📚 クイズRPGとは？</h4>
              <p className="text-blue-700 text-sm">
                このゲームは、勉強とRPGを組み合わせた学習ゲームです。<br/>
                クイズに正解して敵を倒し、階層を進んでいきましょう！
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">🏰 ギルドシステム</h4>
              <p className="text-green-700 text-sm mb-2">
                各ギルドには複数のクエスト（カテゴリ）があります：
              </p>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• 🔒 <strong>ロック</strong>：まだ挑戦できません</li>
                <li>• 🆕 <strong>New!</strong>：新しく解放されたクエスト</li>
                <li>• ⚔️ <strong>挑戦可能</strong>：いつでもプレイできます</li>
                <li>• ✅ <strong>クリア済み</strong>：目標階層に到達済み</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-800 mb-2">🎯 目標</h4>
              <p className="text-yellow-700 text-sm">
                各カテゴリの目標階層（通常10階）に到達することを目指しましょう！<br/>
                クリアすると次のクエストが解放されます。
              </p>
            </div>
          </div>
        );

      case 'gameplay':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-800 mb-4">⚔️ 遊び方</h3>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">💚 HP（体力）システム</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• プレイヤーHP：正解で維持、不正解で減少</li>
                <li>• 敵HP：階層が上がるほど増加</li>
                <li>• HPが0になるとゲームオーバー</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-800 mb-2">⚔️ バトルの流れ</h4>
              <ol className="text-purple-700 text-sm space-y-1">
                <li>1. クイズが出題される</li>
                <li>2. 4つの選択肢から正解を選ぶ</li>
                <li>3. <strong>正解</strong>：敵にダメージ</li>
                <li>4. <strong>不正解</strong>：プレイヤーがダメージを受ける</li>
                <li>5. 敵のHPが0になると次の階層へ</li>
              </ol>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-800 mb-2">🏆 ボス戦</h4>
              <p className="text-orange-700 text-sm">
                10階、20階など10の倍数の階層ではボスが登場！<br/>
                通常の敵より強いので、慎重に挑みましょう。
              </p>
            </div>

            {/* <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-bold text-indigo-800 mb-2">📊 スコアシステム</h4>
              <p className="text-indigo-700 text-sm">
                正解するたびにスコアが1ポイント増加します。<br/>
                高スコアを目指して頑張りましょう！
              </p>
            </div> */}
          </div>
        );

      case 'save':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-800 mb-4">💾 セーブ機能</h3>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">⚠️ 重要な注意点</h4>
              <p className="text-red-700 text-sm mb-2">
                進行状況は<strong>ブラウザのローカルストレージ</strong>に保存されます。
              </p>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• ブラウザのキャッシュクリアでデータが消失</li>
                <li>• 別のブラウザ・デバイスでは引き継げません</li>
                <li>• プライベートブラウジングでは保存されません</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">💾 セーブデータ管理</h4>
              <p className="text-blue-700 text-sm mb-2">
                MAP画面右上の「💾 セーブデータ管理」ボタンから：
              </p>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• <strong>エクスポート</strong>：進行状況をファイルでダウンロード</li>
                <li>• <strong>インポート</strong>：バックアップファイルから復元</li>
                <li>• <strong>緊急復元</strong>：インポート前の状態に戻す</li>
                <li>• <strong>データ削除</strong>：全進行状況をリセット</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">🔄 推奨バックアップ方法</h4>
              <ol className="text-green-700 text-sm space-y-1">
                <li>1. 定期的（週1回程度）にエクスポート</li>
                <li>2. ファイルを安全な場所に保存</li>
                <li>3. デバイス変更時にインポートで復元</li>
                <li>4. ブラウザ変更前にも必ずエクスポート</li>
              </ol>
            </div>
          </div>
        );

      case 'controls':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-800 mb-4">🎯 操作方法</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">🗺️ MAP画面</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• ギルド看板をクリック：クエストボードを表示</li>
                <li>• 右上「💾」ボタン：セーブデータ管理</li>
                <li>• 右上「❓」ボタン：このヘルプを表示</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">📋 クエストボード画面</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• カテゴリカードをクリック：ゲーム開始</li>
                <li>• 右上「×」ボタン：MAP画面に戻る</li>
                <li>• 画面外クリック：MAP画面に戻る</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-800 mb-2">⚔️ ゲーム画面</h4>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• 選択肢をクリック：回答</li>
                <li>• 一度選択すると変更不可</li>
                <li>• 正解・不正解の演出後、自動で次の問題へ</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-800 mb-2">🏆 結果画面</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• 「もう一度挑戦」：同じカテゴリを再プレイ</li>
                <li>• 「カテゴリ選択に戻る」：MAP画面に戻る</li>
                <li>• 進行状況は自動保存されます</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-800 mb-2">🔊 音声・音楽</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• START画面で音声が初期化されます</li>
                <li>• BGMと効果音が自動再生されます</li>
                <li>• ブラウザの設定で音量調整可能</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
        style={{
          backgroundImage: `url('/background/paper-texture.png')`,
          backgroundSize: 'cover'
        }}
      >
        {/* ヘッダー */}
        <div className="bg-amber-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            📖 ゲームヘルプ
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-200 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* サイドバー */}
          <div className="w-1/3 bg-amber-50 border-r border-amber-200 p-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-white text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <span className="text-lg mr-2">{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* コンテンツエリア */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* フッター */}
        <div className="bg-amber-100 p-4 border-t border-amber-200">
          <div className="flex justify-between items-center">
            <p className="text-amber-700 text-sm">
              💡 ヒント：このヘルプはいつでもMAP画面の「❓」ボタンから開けます
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpScreen; 