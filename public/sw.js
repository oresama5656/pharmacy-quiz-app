const CACHE_NAME = 'quiz-rpg-v19';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/background/eyecatch.png',
  '/background/paper-texture.png',
  '/background/wood-bg.png',
  '/character/hero.png'
  // 音声ファイルはキャッシュリストから除外（Range Request対応のため）
];

// Service Workerのインストール
self.addEventListener('install', (event) => {
  console.log('Service Worker v19: インストール開始');
  
  // 即座にアクティベート（待機しない）
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker v19: ファイルをキャッシュ中...');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Service Worker v19: キャッシュエラー', error);
      })
  );
});

// Service Workerのアクティベート
self.addEventListener('activate', (event) => {
  console.log('Service Worker v19: アクティベート開始');
  
  // 即座に全てのクライアントを制御
  event.waitUntil(
    Promise.all([
      // 古いキャッシュを全て削除
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker v19: 古いキャッシュを削除', cacheName);
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
  // 音声ファイルはキャッシュしない（Range Request対応）
  if (event.request.url.includes('/audio/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // HTMLファイルは常にネットワークから取得（キャッシュを無視）
  if (event.request.destination === 'document' || 
      event.request.url.includes('.html') ||
      event.request.url.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 成功レスポンス（200）のみキャッシュ
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
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
        // 成功レスポンス（200）のみキャッシュ
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // ネットワークエラーの場合のみキャッシュから取得
        return caches.match(event.request);
      })
  );
}); 