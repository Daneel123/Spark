document.addEventListener("DOMContentLoaded", function() {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = isMobile ? 'mobile.css' : 'desktop.css';
  document.head.appendChild(link);
});
