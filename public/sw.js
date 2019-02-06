var CACHE_VERSION = 1;
var STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;
var IMAGES_CACHE = `images-cache-v`;
var OTHERS_CACHE = `others-cache-v`;
var allCaches = [
    STATIC_CACHE,
    IMAGES_CACHE,
    OTHERS_CACHE
];


function isImageURL(url) {
    let img_types = ["jpg","jpeg","png","gif"];
    var isImage = false;
    for(let type of img_types) {
        if(url.endsWith(type)) {
            isImage = true; break;
        }
        return isImage;
    }
}

function storeInCache(cacheName, requestClone, responseClone) {
    return caches.open(cacheName).then(function(cache){
        return cache.put(requestClone, responseClone)
    });
}



self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function(cache) {
            console.log("current Cache: ", STATIC_CACHE);
            return cache.addAll([
                "/",
                "/index.html"
            ]);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            console.log("Clearing Old Caches...");
            Promise.all (
                cacheNames.map(function(cacheName) {
                    if(!allCaches.includes(cacheName)) {
                        console.log(`Deleting: ${cacheName}` );
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", function(event) {
    if(event.request.method === "GET") {
        event.respondWith(
            caches.match(event.request).then(function(result) {
                if(result) {return result;}
                const url = new URL(event.request.url);
                try {
                    return fetch(event.request).then(function(response) {
                        let useCache = isImageURL(event.request.url) ? IMAGES_CACHE : STATIC_CACHE;
                        storeInCache(useCache, event.request.clone(), response.clone());
                        return response;
                    });
                }
                catch(e) {
                    console.log(e);
                }
            })

        );
    }else {
        event.respondWith(fetch(event.request) );
    }
});