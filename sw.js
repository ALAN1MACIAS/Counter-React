const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./style.css",
  "./components/Counter.js",
  "./app.js"
]; // Adding routes that are being used in the system

const CACHE_NAME = "v1_cache_counter_react";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(CACHE_ELEMENTS).then(() => {
        self.skipWaiting()
      }).catch(console.log) // Allows you to add to this cache as many routes as you like
    }) // Allows us to pass any name
  ); // Wait for something to run
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then((cachesNames) => {
      return Promise.all(cachesNames.map(cachesNames => {
        return cacheWhitelist.indexOf(cachesNames) === -1 && caches.delete(cachesNames)
      })) // Resibe un array, puede quitar varias promesas o resolver hambas promesas
    }).then( () => self.clients.claim()) // Gives all the keys in case you have more than one cache installed.
  ); // Wait for something to run
});

self.addEventListener("fetch", (e) => { // Searches for new versions of the files and returns or captures new elements.
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});