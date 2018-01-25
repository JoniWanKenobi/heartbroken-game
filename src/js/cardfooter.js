function CardFooter(cardElement, createFunction, puzzleWidth, cellWidth, rowLength){
    var self = this;

    self.puzzleWidth = 360;
    self.cellWidth = 60;
    self.rowLength = rowLength;
    self.createFunction = createFunction;    
    self.pieces = self.createPiecesArray();    
    
    //DOM elements
    self.cardElement = cardElement;      
    self.currentElementDragFunction;
    
}


CardFooter.prototype.mountCardFooter = function(){
    var self = this;    
    var pieceElement = self.pieces.shift();
    var cardFooterElement = self.createFunction('<div class="card-footer"></div>');
    var piecesElement = self.createFunction('<div class="pieces"></div>');
    piecesElement.appendChild(pieceElement);
    cardFooterElement.appendChild(piecesElement);
    self.cardElement.appendChild(cardFooterElement);  
    console.log(self.pieces);
}


CardFooter.prototype.refreshCardFooter = function(){
    var self = this;
    self.removeItself();
    self.mountCardFooter();
}

CardFooter.prototype.removeItself = function(){
    var self = this;
    console.log(self);
    var footer = self.cardElement.querySelector('.card-footer');
    console.log(footer);
    footer.remove();
}

CardFooter.prototype.createPiece = function(i,j, id){
    var self = this;    
    var positionString = 'background-position: ' + i +'px' + ' ' + j + 'px'; 
    var pieceElement = document.createElement('div');
    pieceElement.setAttribute('class', 'jigsaw-img piece');
    pieceElement.setAttribute('style', positionString);

    var idElement = document.createElement('div');
    idElement.setAttribute('id', 'el-'+ (id + 1));
    idElement.appendChild(pieceElement);      

    return idElement;
}

CardFooter.prototype.createPiecesArray = function(){
    var self = this;
    var arr = [];
    for(var i=self.puzzleWidth; i>=self.cellWidth; i-=self.cellWidth){        
        for(var j=self.puzzleWidth; j>=self.cellWidth; j-=self.cellWidth){
            var piece = self.createPiece(j,i,arr.length);
            arr.push(piece);           
        }
    }    

    // return self.shuffle(arr);
    return arr;
}


CardFooter.prototype.shuffle = function (cardsArr) {
    var self = this;
    var copyArr = cardsArr.slice();
    var shuffledArr = [];
    while(copyArr.length>0){
        var ranNum = Math.floor(Math.random() * copyArr.length);
        var el = copyArr.splice(ranNum,1)[0];
        shuffledArr.push(el);
    }

    return shuffledArr;
};