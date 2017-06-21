// Tutorial followed: https://github.com/jakearchibald/simple-serviceworker-tutorial

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('jpeer-sw-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/assets/js/vendor.js',
        '/assets/js/app.js',
        '/assets/js/template.js',
        '/assets/js/main.js',
        '/assets/css/global.css',
        '/i18n/locale-en-us.json',
        '/i18n/locale-de-de.json',
        '/assets/fonts/fontawesome-webfont.woff2?v=4.6.3',
        '/assets/fonts/fontawesome-webfont.woff?v=4.6.3',
        '/assets/fonts/fontawesome-webfont.ttf?v=4.6.3',
        '/assets/img/github-logo.png',
        '/assets/img/logo.svg',
        '/assets/img/slider/hoverfly.jpg',
        '/assets/img/slider/fish.jpg',
        '/assets/img/me_bw.png',
        '/assets/img/code.svg',
        '/assets/img/ci.png',
        '/assets/img/balloons.svg',
        '/assets/img/projects/schwarzkoenig.png',
        '/assets/img/projects/somnia.jpg',
        '/assets/img/projects/volxpop.jpg',
        '/assets/img/projects/prazna.jpg',
        '/assets/img/projects/railroad.png',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
