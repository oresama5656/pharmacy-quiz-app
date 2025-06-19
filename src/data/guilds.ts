export const guilds = [
  {
    id: 'chouzai',
    name: '調剤ギルド',
    icon: '💊',
    position: { top: '30%', left: '25%' },
    categories: [
      {
        id: 'brand2generic',
        name: '商品名→一般名',
        icon: '💊',
        description: '商品名から一般名を導く',
        star: 1
      },
      {
        id: 'brand2effect',
        name: '商品名→効果',
        icon: '💊',
        description: '商品名から効果を答える',
        star: 2
      },
      {
        id: 'generic2effect',
        name: '一般名→効果',
        icon: '🧪',
        description: '一般名から効果を答える',
        star: 2
      },
      {
        id: 'brand2generic_diabetes',
        name: '糖尿病薬：商品名→一般名',
        icon: '🍬',
        description: '糖尿病薬で商品名から一般名を導く',
        star: 3
      },
      {
        id: 'antibiotics',
        name: '抗生物質の分類',
        icon: '🦠',
        description: '抗生物質の分類を答える',
        star: 3
      }
    ]
  },
  {
    id: 'math',
    name: '数学ギルド',
    icon: '🔢',
    position: { top: '60%', left: '50%' },
    categories: [
      {
        id: 'simple_math',
        name: '足し算',
        icon: '📐',
        description: '一桁の足し算',
        star: 1
      }
    ]
  },
  {
    id: 'english',
    name: '英語ギルド',
    icon: '🇬🇧',
    position: { top: '40%', left: '80%' },
    categories: [
      {
        id: 'text_length',
        name: '文章表示テスト',
        icon: '📖',
        description: '長文表示テスト',
        star: 1
      }
    ]
  },
] as const;

