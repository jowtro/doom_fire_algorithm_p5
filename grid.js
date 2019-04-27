//JS DO PROTÓTIPO DE GRID ---
function Grid (){
    this.w = 100; //proporção do quadrado valor padrão
    this.columns;
    this.rows;
    this.grid=[];
    this.debug = true;
    this.firedecay = 1;
    this.firedecay2 = 2;
    this.fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},    {"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},    {"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},    {"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},    {"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},    {"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},    {"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},    {"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},    {"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},    {"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},    {"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},    {"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},    {"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},    {"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},  {"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},    {"r":255,"g":255,"b":255}]
}

//Cria o array 2D dimensional
Grid.prototype.construtor = function (rows,columns){
    this.columns = int(columns/this.w);
    this.rows = int(rows/this.w);
    for(var i=0; i <= this.rows; i++){ //altura
            this.grid[i] = [];
    }
}
//Gera os valores para todos os indices do array
Grid.prototype.generate = function (){
    for(var j=0; j<= this.rows; j++){ //altura
        for(var i=0; i<= this.columns; i++){ //largura
            if(j === (this.rows))//ultima linha
            {
                this.grid[i][j] = 36; //preenche com 36
            }else{
                this.grid[i][j] = 0;
            }
        }
        //console.log(this.grid);
    }
}
//Calcula a propagação do fogo
Grid.prototype.calculateFirePropagation = function(fdecay1,fdecay2){
    //gerar ruido usando random na variável de decay
    for(var row=0; row<= this.rows; row++){ //altura
        for(var column=0; column<= this.columns; column++){ //largura
            var proximaLinha = column+1;
            var valorQuadradoAbaixo = this.grid[row][proximaLinha];
            if(valorQuadradoAbaixo > 0 && valorQuadradoAbaixo != undefined){
                //this.firedecay = int(Math.random()*3);
                //this.firedecay2 = int(Math.random()*5);
                this.firedecay = int(Math.random()*fdecay1);
                this.firedecay2 = int(Math.random()*fdecay2);
                var valorQuadradoAtual = Math.abs(valorQuadradoAbaixo - this.firedecay2);
                indiceAleatorio = (row-this.firedecay) ;
                if(indiceAleatorio < 0){
                    this.grid[row][column] = valorQuadradoAtual;
                }else if (indiceAleatorio < this.rows){
                    this.grid[indiceAleatorio][column] = valorQuadradoAtual;
                }
            }
        }
    }
}

//Pinta o fogo
Grid.prototype.setFireSource = function(){
    //Draw rects
    for(var j=0; j<= this.rows; j++){ //altura
        for(var i=0; i<= this.columns; i++){ //largura
            if(!this.debug){
                noStroke();
            }else{stroke(0);}
            //Pulo do gato preenche o pixel de acordo com o valor do array
            //tira a cor da palleta original baseado no [indice da paleta]
                //Renderiza só celulas que tenham o valor > 3
                if(this.grid[i][j] > 3){
                    fill(
                        this.fireColorsPalette[this.grid[i][j]].r,
                        this.fireColorsPalette[this.grid[i][j]].g,
                        this.fireColorsPalette[this.grid[i][j]].b
                    );
                    rect(i*this.w,j*this.w,this.w,this.w);
                }else{
                    //se for menor que o valor X pinta de preto que é o bg
                    fill(0);
                    rect(i*this.w,j*this.w,this.w,this.w);
                }
        }
    }
}

//Pinta os valores na celulas par debugar
Grid.prototype.drawText = function(){
    //Draw numbers
    for(var j=0; j<= this.rows; j++){ //largura
        for(var i=0; i<= this.columns; i++){ //altura
            fill(0);
            //Conteúdo do array
            text(str(this.grid[i][j]), i*this.w, j*this.w);
            //Valor dos indices
            //text(str(['('+i,j+')']), i*this.w+62, j*this.w-80);
        }
    }
}

//Desenha o fogo
Grid.prototype.draw = function(fdecay1,fdecay2){
    this.calculateFirePropagation(fdecay1,fdecay2);
    this.setFireSource();
    if(this.debug) {
        this.drawText();
    }

}
