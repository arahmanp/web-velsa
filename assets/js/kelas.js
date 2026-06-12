$(document).ready(function () {

  /* ---- Class card hover tilt effect ---- */
  $('.class-card').on('mousemove', function (e) {
    var rect = this.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var cx = rect.width / 2;
    var cy = rect.height / 2;
    var dx = (x - cx) / cx;
    var dy = (y - cy) / cy;
    $(this).css('transform', 'perspective(800px) rotateY(' + (dx * 4) + 'deg) rotateX(' + (-dy * 4) + 'deg) scale(1.02)');
  }).on('mouseleave', function () {
    $(this).css('transform', '');
  });

});
