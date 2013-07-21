$.extend($.expr[':'], {
  inview: function (el) {
    var $e = $(el),
        $w = $(window),
        wt = $w.scrollTop(),
        wb = wt + $w.height(),
        et = $e.offset().top,
        eb = et + $e.height();
    return eb >= wt && et <= wb;
  }
});
