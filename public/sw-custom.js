// Dedicated Custom Service Worker for JapanApp Background Web Push & PWA
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Periodic Background Sync Event Handler (Runs when PWA is closed)
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "japanapp-daily-reminder") {
    event.waitUntil(
      self.registration.showNotification("⏰ Waktunya Belajar Jepang!", {
        body: "Luangkan 5 menit hari ini untuk kuis Kana & Kanji agar streak kamu tetap terjaga!",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        image: "/icons/icon-512.png",
        vibrate: [500, 110, 500, 110, 500, 110, 500],
        tag: "japanapp_background_" + Date.now(),
        renotify: true,
        requireInteraction: true,
        silent: false,
        timestamp: Date.now(),
        actions: [{ action: "open", title: "🚀 Belajar Sekarang" }],
        data: { url: "/practice" },
      })
    );
  }
});

// Push Event Handler for Remote / Background Web Push (Runs when app is closed)
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: "JapanApp", body: event.data ? event.data.text() : "Waktunya Belajar Jepang!" };
  }

  const title = data.title || "JapanApp";
  const options = {
    body: data.body || "Luangkan 5 menit hari ini untuk kuis Kana & Kanji!",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    image: "/icons/icon-512.png",
    vibrate: [500, 110, 500, 110, 500, 110, 500],
    tag: "japanapp_urgent_" + Date.now(),
    renotify: true,
    requireInteraction: true,
    silent: false,
    timestamp: Date.now(),
    actions: [{ action: "open", title: "🚀 Belajar Sekarang" }],
    data: { url: data.url || "/practice" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification Click Handler (Focuses/Opens app when notification is tapped)
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = (event.notification.data && event.notification.data.url) || "/practice";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url && client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
