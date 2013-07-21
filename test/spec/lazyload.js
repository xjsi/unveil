describe("lazy load", function() {

  var $img;

  beforeEach(function() {
    $img = $("<img/>", {
      "src": "loader.gif",
      "data-src": "image.png"
    }).appendTo("body");
  });

  afterEach(function() {
    $img.remove();
    window.scrollTo(0, 0);
  });

  it("unveils images in the viewport", function() {
    $img.unveil();
    expect($img[0].src).toMatch(/image.png/);
  });

  it("doesn't unveil images outside the viewport", function() {
    $img.css("margin-top", 1000);
    expect($img.is(":inview")).toBe(false);
    $img.unveil();
    expect($img[0].src).toMatch(/loader.gif/);
  });

  it("unveils images outside the viewport when the user scrolls to them", function() {
    $img.css("margin-top", 1000);
    expect($img.is(":inview")).toBe(false);
    $img.unveil();
    $(window).scrollTop(1000).trigger("scroll");
    expect($img.is(":inview")).toBe(true);
    expect($img[0].src).toMatch(/image.png/);
  });

  it("unveils images outside the viewport when the window is resized and they became visible", function() {
    $img.css("margin-top", 1000);
    expect($img.is(":inview")).toBe(false);
    $img.unveil();
    $img.css("margin-top", 500);
    expect($img.is(":inview")).toBe(true);
    $(window).trigger("resize");
    expect($img[0].src).toMatch(/image.png/);
  });

});
