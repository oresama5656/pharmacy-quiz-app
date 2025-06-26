const CACHE_NAME = 'quiz-rpg-v17';
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
  console.log('Service Worker v17: インストール開始');
  
  // 即座にアクティベート（待機しない）
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker v17: ファイルをキャッシュ中...');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Service Worker v17: キャッシュエラー', error);
      })
  );
});

// Service Workerのアクティベート
self.addEventListener('activate', (event) => {
  console.log('Service Worker v17: アクティベート開始');
  
  // 即座に全てのクライアントを制御
  event.waitUntil(
    Promise.all([
      // 古いキャッシュを全て削除
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker v17: 古いキャッシュを削除', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 即座に全てのクライアントを制御
      self.clients.claim()
    ])
  );
});

// リクエストの処理
self.addEventListener('fetch', (event) => {
  // HTMLファイルは常にネットワークから取得（キャッシュを無視）
  if (event.request.destination === 'document' || 
      event.request.url.includes('.html') ||
      event.request.url.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 新しいレスポンスをキャッシュに保存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // ネットワークエラーの場合のみキャッシュから取得
          return caches.match(event.request);
        })
    );
    return;
  }

  // その他のリソース（CSS、JS、画像など）
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // ネットワークから取得できた場合、キャッシュを更新
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // ネットワークエラーの場合のみキャッシュから取得
        return caches.match(event.request);
      })
  );
}); 