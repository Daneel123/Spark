$(document).ready(function() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
   $('head').append('<link rel="stylesheet" type="text/css" href="mobile.css">');
  } else {
   $('head').append('<link rel="stylesheet" type="text/css" href="desktop.css">');
  }
});