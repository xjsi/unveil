describe("trigger", function() {

  var $img;

  beforeEach(function() {
    $img = $("<img/>", {
      "src": "loader.gif",
      "data-src": "image.png"
    }).appendTo("body");
  });

  afterEach(function() {
    $img.remove();
  });

  it("unveils an image when triggering 'unveil' on it", function() {
    $img.css("margin-top", 1000);
    $img.unveil();
    expect($img[0].src).toMatch(/loader.gif/);
    $img.trigger("unveil");
    expect($img[0].src).toMatch(/image.png/);
  });

});
