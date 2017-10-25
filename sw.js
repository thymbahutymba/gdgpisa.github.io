---
layout: null
---

var cacheName = 'gdgpisa-cache-v1.2';
var urlsToCache = [
    '/',
    '/index.html',      
    '/blog/',
    '/manifests/manifest_webapp.json',
    '/manifests/manifest_notpush.json',
    '/assets/header.jpg',
    '/static/img/avatar.png',
    '/static/img/logo.png',
    '/static/css/main.css',
    '/static/css/bootstrap-material-design.min.css',
    '/static/css/bootstrap.min.css',
    '/static/css/syntax.css',
    '/static/css/thickbox.css',
    '/static/css/projects.css'
];

{% for asset in site.static_files %}
    {% if asset.path contains '/assets/images' or asset.path contains '/assets/posts' or asset.extname == '.js' %}
    urlsToCache.push("{{ file.path }}")
    {% endif %}
{% endfor %}

// Cache posts
{% for post in site.posts %}
  urlsToCache.push("{{ post.url }}")
{% endfor %}

// Cache pages
{% for page in site.html_pages %}
  urlsToCache.push("{{ page.url }}")
{% endfor %}

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
