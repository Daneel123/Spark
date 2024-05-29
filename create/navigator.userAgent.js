document.addEventListener("DOMContentLoaded", function() {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Добавление CSS файла
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = isMobile ? 'mobile.css' : 'desktop.css';
  document.head.appendChild(link);

  // Добавление JS файла
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = isMobile ? 'mobilesaveData.js' : 'desktopsaveData.js';
  document.head.appendChild(script);
});