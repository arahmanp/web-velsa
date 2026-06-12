$(document).ready(function () {

  /* ---- Detect depth for kelas sub-pages ---- */
  var path = window.location.pathname;
  var inSubDir = path.indexOf('/kelas/') !== -1;
  var prefix = inSubDir ? '../' : '';

  /* ---- Inject navbar & footer ---- */
  $("#navbar-placeholder").load(prefix + "components/navbar.html", function () {
    /* Mark active nav link based on current page */
    var page = path.split('/').pop() || 'index.html';
    if (inSubDir) page = 'kelas.html';
    $('#navbar-placeholder .nav-link').each(function () {
      var href = $(this).attr('href');
      if (href && href.indexOf(page) !== -1) {
        $(this).addClass('active');
      }
    });

    /* Navbar scroll shrink */
    $(window).scroll(function () {
      if ($(this).scrollTop() > 60) {
        $('#navbar-placeholder .navbar').addClass('navbar-scrolled');
      } else {
        $('#navbar-placeholder .navbar').removeClass('navbar-scrolled');
      }
    });
  });

  $("#footer-placeholder").load(prefix + "components/footer.html");

});
