if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/winter-rent-crm/sw.js', { scope: '/winter-rent-crm/' })})}