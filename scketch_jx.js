var grid = undefined;
let font,fontsize = 20;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
    var canvas = createCanvas(401,401);
    canvas.parent('sketch-holder');
    background(0);
    slider = createSlider(0,10, 3);
    slider.position(20,height+40);
    slider2 = createSlider(0,5, 5);
    slider2.position(20,height+60);

    // Set text characteristics
    textFont(font);
    textSize(fontsize);
    textAlign(LEFT, LEFT);
    grid = new Grid();
    grid.w = 10;
    grid.debug = false;
    //grid.debug = true;
    grid.construtor(height,width);
    grid.generate();
}


function draw() {
    const fdecay1 = slider.value();
    const fdecay2 = slider2.value();
    fill(255);
    stroke(0);
    text('red', slider.x * 2 + slider.width, 35);
    text('green', slider2.x * 2 + slider2.width, 65);
    grid.draw(fdecay1,fdecay2);
}
