// $(function() {
  var page =  location.pathname.split("/")[1];
  if (page != "") {
      $('nav a[href^="/' + page + '"]').addClass('active');
  }
});