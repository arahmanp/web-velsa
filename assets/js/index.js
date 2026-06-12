$(document).ready(function () {

  /* ---- Counter animation ---- */
  function animateCounters() {
    $('.stat-number[data-target]').each(function () {
      var $el = $(this);
      var target = parseInt($el.data('target'));
      var suffix = $el.data('suffix') || '';
      var duration = 1800;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        $el.text(current + suffix);
        if (progress < 1) requestAnimationFrame(step);
        else $el.text(target + suffix);
      }
      requestAnimationFrame(step);
    });
  }

  /* Trigger counter when stats section enters viewport */
  var counterFired = false;
  $(window).on('scroll.counter', function () {
    if (counterFired) return;
    var $stats = $('.stats-section');
    if (!$stats.length) return;
    var top = $stats.offset().top;
    var winBottom = $(window).scrollTop() + $(window).height();
    if (winBottom > top + 80) {
      counterFired = true;
      animateCounters();
      $(window).off('scroll.counter');
    }
  });

  /* Trigger on load if already visible */
  $(window).trigger('scroll.counter');

});
