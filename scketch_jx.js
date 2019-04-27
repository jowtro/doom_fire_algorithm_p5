var grid = undefined;

function setup() {
    var canvas = createCanvas(401,401);
    canvas.parent('sketch-holder');
    background(0);
    slider = createSlider(0,10, 3);
    slider.position(20,height+40);
    slider2 = createSlider(0,5, 5);
    slider2.position(20,height+60);
    grid = new Grid();
    grid.w = 4; //Square proportion
    grid.debug = false;
    grid.construtor(height,width);
    grid.generate();
}


function draw() {
    const fdecay1 = slider.value();
    const fdecay2 = slider2.value();
    fill(255);
    stroke(0);
    grid.draw(fdecay1,fdecay2);
}
