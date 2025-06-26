const CACHE_NAME = 'quiz-rpg-v13';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/background/eyecatch.png',
  '/background/paper-texture.png',
  '/background/wood-bg.png',
  '/character/hero.png',
  '/audio/bgm/sleepy.mp3',
  '/audio/se/slash.mp3',
  '/audio/se/warning.mp3'
];

// Service Workerのインストール
self.addEventListener('install', (event) => {
  console.log('Service Worker: インストール開始');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: ファイルをキャッシュ中...');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Service Worker: キャッシュエラー', error);
      })
  );
});

// Service Workerのアクティベート
self.addEventListener('activate', (event) => {
  console.log('Service Worker: アクティベート開始');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 古いキャッシュを削除', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// リクエストの処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // キャッシュにあれば、それを使う
          console.log('Service Worker: キャッシュから取得', event.request.url);
          return response;
        }
        
        // キャッシュになければ、ネットワークから取得
        console.log('Service Worker: ネットワークから取得', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // レスポンスが有効な場合、キャッシュに保存
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
      .catch(() => {
        // オフライン時のフォールバック
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
}); 