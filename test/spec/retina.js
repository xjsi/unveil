describe("retine", function() {

  var $img;

  beforeEach(function() {
    $img = $("<img/>", {
      "src": "loader.gif",
      "data-src": "image.png",
      "data-src-retina": "image-retina.png"
    }).appendTo("body");
  });

  afterEach(function() {
    $img.remove();
  });

  it("goes for the data-src if window.devicePixelRatio <= 1", function() {
    window.devicePixelRatio = 1;
    $img.unveil();
    expect($img[0].src).toMatch(/image.png/);
  });

  it("goes for the data-src-retina if window.devicePixelRatio > 1", function() {
    window.devicePixelRatio = 2;
    $img.unveil();
    expect($img[0].src).toMatch(/image-retina.png/);
  });

  it("falls back to data-src if it can't find a data-src-retina", function() {
    window.devicePixelRatio = 2;
    $img.removeAttr("data-src-retina");
    $img.unveil();
    expect($img[0].src).toMatch(/image.png/);
  });

  it("it does nothing if it can't find a data-src or a data-src-retina", function() {
    window.devicePixelRatio = 2;
    $img.removeAttr("data-src data-src-retina");
    $img.unveil();
    expect($img[0].src).toMatch(/loader.gif/);
  });

});
