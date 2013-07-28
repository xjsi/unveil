function Unveil(selector, threshold, callback) {

    var th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        images = document.querySelectorAll(selector),
        filter = function(images, callback) {
          return [].filter.call(images, callback);
        },
        forEach = function(images, callback) {
          return [].forEach.call(images, callback);
        };

    function unveil() {
      var inview = onscreen(images);
      forEach(inview, trigger);
      images = filter(images, not.bind(this, inview));
      if (!images.length) unlearn();
    }

    function onscreen(images) {
      return filter(images, function(image) {
        if (image.offsetWidth <= 0 && image.offsetHeight <= 0) return false;
        var wintop = window.pageYOffset,
            winbot = wintop + document.documentElement.clientHeight,
            imgtop = image.offsetTop,
            imgbot = imgtop + image.height;
        return imgbot >= wintop - th && imgtop <= winbot + th;
      });
    }

    function trigger(image) {
      var event = document.createEvent("HTMLEvents");
      event.initEvent("unveil", true, true);
      event.eventName = "unveil";
      event.target = image;
      image.dispatchEvent(event);
      image.removeEventListener("unveil", unveil);
    }

    function not(inview, image) {
      return inview.indexOf(image) === -1;
    }

    function unlearn() {
      window.removeEventListener("scroll", unveil);
      window.removeEventListener("resize", unveil);
    }

    forEach(images, function(image) {
      image.addEventListener("unveil", function() {
        var source = retina ? this.getAttribute("data-src-retina") : null;
        source = source || this.getAttribute("data-src");
        if (source) this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      });
    });

    window.addEventListener("scroll", unveil);
    window.addEventListener("resize", unveil);

    unveil();

    return images;

}

// var images = new Unveil("img", 300, function() {
//   this.addEventListener("load", function() {
//     this.style.opacity = 1;
//   });
// });
