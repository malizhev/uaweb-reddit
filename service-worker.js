var CACHE_VERSION = 28;
var CURRENT_CACHES = {
	'reddit': 'v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
	var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
		return CURRENT_CACHES[key];
	});

	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (expectedCacheNames.indexOf(cacheName) == -1) {
						console.log('Deleting out of date cache:', cacheName);
						// Remove from cache
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open(CURRENT_CACHES['reddit']).then(function(cache) {
			return cache.match(event.request).then(function(response) {
				if (response) {
					// Exists in cache: return cached data
					return response;
				} else {
					// Fetching data
					return fetch(event.request.clone()).then(function(response) {
						// Add to cache if succeed
						if (response.status < 400) {
							cache.put(event.request, response.clone());
						}
						return response;
					});
				}
			}).catch(function(error) {
				throw error;
			});
		})
	);
});