//Grid Prototype
// TODO convert to ES6
function Grid() {
    this.w = 50; // default value , would be overwritten by sketch_js
    this.columns;
    this.rows;
    this.grid = [];
    this.debug = true;
    this.firedecay = 1;
    this.firedecay2 = 2;
    this.fireColorsPalette = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 },
        { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 },
        { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 },
        { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 },
        { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 },
        { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 },
        { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 },
        { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 },
        { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 },
        { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 },
        { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 },
        { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]
}

//Creates a 2D dimensional Array
Grid.prototype.constructor = function (rows, columns) {
    this.columns = int(columns / this.w);
    this.rows = int(rows / this.w);
    for (var i = 0; i <= this.rows; i++) { //Height
        this.grid[i] = [];
    }
}
//Generate value to the arrays indices
Grid.prototype.generate = function () {
    for (var j = 0; j <= this.rows; j++) { //Height
        for (var i = 0; i <= this.columns; i++) { //Width
            if (j === (this.rows))//ultima linha
            {
                this.grid[i][j] = 36; //preenche com 36
            } else {
                this.grid[i][j] = 0;
            }
        }
        //console.log(this.grid);
    }
}
//Calculate the fire propagation
Grid.prototype.calculateFirePropagation = function (fdecay1, fdecay2) {
    //generate noise with random in firedecay variable.
    for (var row = 0; row <= this.rows; row++) { //Height
        for (var column = 0; column <= this.columns; column++) { //Width
            var nextRow = column + 1;
            var squareBellow = this.grid[row][nextRow];
            if (squareBellow > 0 && squareBellow != undefined) {
                this.firedecay = int(Math.random() * fdecay1);
                this.firedecay2 = int(Math.random() * fdecay2);
                var currentSquare = Math.abs(squareBellow - this.firedecay2);
                randomIndex = (row - this.firedecay);
                if (randomIndex < 0) {
                    this.grid[row][column] = currentSquare;
                } else if (randomIndex < this.rows) {
                    this.grid[randomIndex][column] = currentSquare;
                }
            }
        }
    }
}

//Draw the fire
Grid.prototype.setFireSource = function () {
    //Draw rects
    for (var j = 0; j <= this.rows; j++) { //Height
        for (var i = 0; i <= this.columns; i++) { //Width
            if (!this.debug) {
                noStroke();
            } else { stroke(0); }
            //Fills the pixel accordinly with the value of array
            //takes the color of the original pallette based on the value of array.
            //Render just cells that have value higher than 3
            if (this.grid[i][j] > 3) {
                fill(
                    this.fireColorsPalette[this.grid[i][j]].r,
                    this.fireColorsPalette[this.grid[i][j]].g,
                    this.fireColorsPalette[this.grid[i][j]].b
                );
                rect(i * this.w, j * this.w, this.w, this.w); //draw square
            } else {
                //if the value is lower; draw black square , that`s the background
                fill(0);
                rect(i * this.w, j * this.w, this.w, this.w); //draw square
            }
        }
    }
}

//draw the cells to debug
Grid.prototype.drawText = function () {
    //Draw numbers
    for (var j = 0; j <= this.rows; j++) { //Width
        for (var i = 0; i <= this.columns; i++) { //Height
            fill(0);
            //Array content
            text(str(this.grid[i][j]), i * this.w, j * this.w);
            //Index value
            //text(str(['('+i,j+')']), i*this.w+62, j*this.w-80);
        }
    }
}

//Draw the fire
Grid.prototype.draw = function (fdecay1, fdecay2) {
    this.calculateFirePropagation(fdecay1, fdecay2);
    this.setFireSource();
    if (this.debug) {
        this.drawText();
    }

}
