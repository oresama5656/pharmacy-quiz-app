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
        icon: '📜',
        description: '商品名から一般名を導く',
      },
      {
        id: 'generic2effect',
        name: '一般名→作用',
        icon: '🧪',
        description: '一般名から薬理作用を導く',
      },
    ],
  },
  {
    id: 'renkin',
    name: '錬金ギルド',
    icon: '⚗️',
    position: { top: '55%', left: '60%' },
    categories: [],
  },
] as const;
