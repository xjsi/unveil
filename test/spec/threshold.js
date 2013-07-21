describe("threshold", function() {

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

  it("unveils an image before getting in the viewport if we define a threshold", function() {
    $img.css("margin-top", 1000);
    expect($img.is(":inview")).toBe(false);
    $img.unveil(200);
    $(window).scrollTop(100).trigger("scroll");
    expect($img.is(":inview")).toBe(false);
    expect($img[0].src).toMatch(/image.png/);
  });

  it("doesn't unveil an image before getting in the viewport if we don't define a threshold", function() {
    $img.css("margin-top", 1000);
    expect($img.is(":inview")).toBe(false);
    $img.unveil();
    $(window).scrollTop(100).trigger("scroll");
    expect($img.is(":inview")).toBe(false);
    expect($img[0].src).toMatch(/loader.gif/);
  });

});
