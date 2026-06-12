$(document).ready(function () {

  /* ---- Filter buttons ---- */
  $('.filter-btn').on('click', function () {
    var cat = $(this).data('filter');

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (cat === 'all') {
      $('.g-item').removeClass('hidden');
    } else {
      $('.g-item').each(function () {
        var itemCat = $(this).data('cat');
        if (itemCat === cat) {
          $(this).removeClass('hidden');
        } else {
          $(this).addClass('hidden');
        }
      });
    }
  });

  /* ---- Simple inline lightbox (no plugin dependency) ---- */
  var $overlay = $('<div id="lb-overlay" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.93);align-items:center;justify-content:center;cursor:zoom-out;">'
    + '<img id="lb-img" src="" style="max-width:90vw;max-height:88vh;object-fit:contain;display:block;">'
    + '<button id="lb-prev" style="position:fixed;left:1.5rem;top:50%;transform:translateY(-50%);background:transparent;border:none;color:#fff;font-size:2.5rem;cursor:pointer;line-height:1;">&#8249;</button>'
    + '<button id="lb-next" style="position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);background:transparent;border:none;color:#fff;font-size:2.5rem;cursor:pointer;line-height:1;">&#8250;</button>'
    + '<button id="lb-close" style="position:fixed;top:1.2rem;right:1.5rem;background:transparent;border:none;color:#fff;font-size:2rem;cursor:pointer;line-height:1;">&times;</button>'
    + '</div>');
  $('body').append($overlay);

  var visibleItems = [];
  var currentIdx = 0;

  function openLightbox(idx) {
    visibleItems = [];
    $('.g-item.lightbox-target:not(.hidden)').each(function () {
      visibleItems.push($(this).attr('href'));
    });
    currentIdx = idx;
    $('#lb-img').attr('src', visibleItems[currentIdx]);
    $overlay.css('display', 'flex');
    $('body').css('overflow', 'hidden');
  }

  function closeLightbox() {
    $overlay.css('display', 'none');
    $('body').css('overflow', '');
  }

  $(document).on('click', 'a.lightbox-target', function (e) {
    e.preventDefault();
    var href = $(this).attr('href');
    var idx = 0;
    var items = [];
    $('.g-item.lightbox-target:not(.hidden)').each(function (i) {
      items.push($(this).attr('href'));
      if ($(this).attr('href') === href) idx = i;
    });
    openLightbox(idx);
  });

  $('#lb-close, #lb-overlay').on('click', function (e) {
    if (e.target === this) closeLightbox();
  });

  $('#lb-next').on('click', function (e) {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % visibleItems.length;
    $('#lb-img').attr('src', visibleItems[currentIdx]);
  });

  $('#lb-prev').on('click', function (e) {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + visibleItems.length) % visibleItems.length;
    $('#lb-img').attr('src', visibleItems[currentIdx]);
  });

  $(document).on('keydown', function (e) {
    if ($overlay.css('display') === 'none') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') $('#lb-next').click();
    if (e.key === 'ArrowLeft') $('#lb-prev').click();
  });

});
