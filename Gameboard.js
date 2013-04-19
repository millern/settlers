// declare collections
// this code should be included in both the client and the server
Gameboard = function() {

  var index = 0;
  var indexPt = 0;
  var currTerrain = "";
  var currPointValue;
  var xPos = 0;
  var yPos = 0;
  this.terrainHexes = new terrainHexes();

  this.pointValues = new pointValues();

  this.vertices = new vertexMap();

  this.hexNodes = [];
  for (var i = 0; i<7; i++){
    this.hexNodes[i] = [];
    for (var j=0;j<7;j++){
      //check to see if the hexagon is terrian
      if ((i==1&&j==2) || (i==1&&j==3) || (i==1&&j==4) || 
          (i==2&&j==1) || (i==2&&j==2) || (i==2&&j==3) || 
          (i==2&&j==4) || (i==3&&j==1) || (i==3&&j==2) || 
          (i==3&&j==3) || (i==3&&j==4) || (i==3&&j==5) || 
          (i==4&&j==1) || (i==4&&j==2) || (i==4&&j==3) || 
          (i==4&&j==4) || (i==5&&j==2) || (i==5&&j==3) || 
          (i==5&&j==4)) {

          //calculate the hexagon's x and y position in the mapping grid that includes hexagons, sides, and vertices
          if (i%2!=0) {
            xPos = i*3-1;
            yPos = j*2-1;
          } else {
            xPos = i*3-1;
            yPos = j*2;
          }
          
          //get the type of terrain
          currTerrain = this.terrainHexes.terrainArray[index];
          //don't assign a point value to the desert terrin hexagon
          if (currTerrain!="desert"){
            currPointValue = this.pointValues.pointArray[indexPt];
            indexPt++;
          } else {
            currPointValue = "";
          }     
        index++;
      } else if ((i==0&&j==0) || (i==0&&j==6) || (i==0&&j==5) || (i==1&&j==0) || (i==1&&j==6) || (i==2&&j==6) || (i==4&&j==6) || (i==5&&j==0) || (i==5&&j==6) || (i==6&&j==0) || (i==6&&j==5) || (i==6&&j==6)) {
        currTerrain = "water";
        currPointValue = "";
      } else {
        currTerrain = "water";
        currPointValue="";
      }
     this.hexNodes[i][j] = new Hex(currTerrain,currPointValue, false,i,j,xPos,yPos);
    }
  }
  this.hexVerts = [];
  this.hexSides = [];
  for (var i = 0; i<16; i++){
    this.hexVerts[i] = [];
    this.hexSides[i] = [];
    for (var j=0;j<16;j++){
      this.hexVerts[i][j] = new Vert("",i,j);
      this.hexSides[i][j] = new Side("",i,j);
    } 
  }


  function Hex(terrain, pointValue, robber,x,y,posX,posY) {
    this.terrain = terrain;
    this.pointValue = pointValue;
    this.robber = robber;
    //x and y denote the hexagon's position on the gameboard
    this.x = x;
    this.y = y;
    //posX and posY denote the hexagon's position in a grid that includes hexagons, sides, and vertices
    this.posX = posX;
    this.posY = posY;
  }

  function Vert(param,x,y,num,posX,posY){
    this.param = param;
    this.x = x;
    this.y = y;
    this.num = num;
    this.posX = posX;
    this.posY = posY;
  }
  function Side(param,x,y){
    this.param = param;
    this.x = x;
    this.y = y;
  }
  function terrainHexes() {
    this.terrainArray = ["desert","rock","rock","rock","sheep","sheep","sheep","sheep","clay","clay","clay","forest","forest","forest","forest","wheat","wheat","wheat","wheat"];
    shuffle(this.terrainArray);
  }
  function pointValues() {
    this.pointArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12];
    shuffle(this.pointArray);
  }
  function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

    return array;
  }
  function vertexMap() {
    this.vertexArray = [];
    var index = 0;
    var posX = 0;
    var posY = 0;
    for (var i = 0; i<12; i++){
      this.vertexArray[i] = [];
      for (var j = 0; j < 11; j++){
        //calculate posX, posY on the same coordinate grid as the hexagons
        this.vertexArray[i][j] = new Vert("vertex",i,j,index,posX,j);
        index++;
      }
      if ((i+1)%2==0){
        posX++;
      }
      posX++;
    }

    vertexMap.prototype.getVertex = function(x,y){
      for (var i = 0; i < 12; i++) {
        for (var j = 0; j<11; j++){
          if (this.vertexArray[i][j].posX==x && this.vertexArray[i][j].posY==y){
            return this.vertexArray[i][j];
          }
        }
      }
    } 
  }

  Gameboard.prototype.findVerticesByHexagon = function(hexagon){
    rtnArray = [];
    var x = hexagon.posX;
    var y = hexagon.posY;
    rtnArray.push(this.vertices.getVertex(x+1,y-1));
    rtnArray.push(this.vertices.getVertex(x+2,y));
    rtnArray.push(this.vertices.getVertex(x+1,y+1));
    rtnArray.push(this.vertices.getVertex(x-1,y+1));
    rtnArray.push(this.vertices.getVertex(x-2,y));
    rtnArray.push(this.vertices.getVertex(x-1,y-1));
    return rtnArray;
  }

}