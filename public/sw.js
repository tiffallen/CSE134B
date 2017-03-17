//Service worker
//Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

// creates the initial cache
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/images/vision-sad-offline.gif'
      ]);
    })
  );
});


// retrieving from caches needs polish!
this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              console.log('Using cache');
              // return caches.match(offlineUrl);
              // return new Response("Network error! Please check your connections!");
              return caches.match('images/vision-sad-offline.gif');
          })
    );
  }
  else{
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
                        .then(function (response) {
                         console.log("retreiving from network");
                        return response || fetch(event.request);
                    })
            );
      }
});
