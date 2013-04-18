// declare collections
// this code should be included in both the client and the server
Gameboard = function() {

  var index = 0;
  var indexPt = 0;
  var currTerrain = "";
  var currPointValue;
  this.terrainHexes = new terrainHexes();
  this.pointValues = new pointValues();

  this.hexNodes = [];
  for (var i = 0; i<7; i++){
    this.hexNodes[i] = [];
    for (var j=0;j<7;j++){
      
      if ((i==1&&j==2) || (i==1&&j==3) || (i==1&&j==4) || 
          (i==2&&j==1) || (i==2&&j==2) || (i==2&&j==3) || 
          (i==2&&j==4) || (i==3&&j==1) || (i==3&&j==2) || 
          (i==3&&j==3) || (i==3&&j==4) || (i==3&&j==5) || 
          (i==4&&j==1) || (i==4&&j==2) || (i==4&&j==3) || 
          (i==4&&j==4) || (i==5&&j==2) || (i==5&&j==3) || 
          (i==5&&j==4)) {
        currTerrain = this.terrainHexes.terrainArray[index];
        if (currTerrain!="desert"){
          currPointValue = this.pointValues.pointArray[indexPt];
          indexPt++;
        } else {
          currPointValue = "";
        }     
        index++;
      } else if ((i==0&&j==0) || (i==0&&j==6) || (i==0&&j==5) || (i==1&&j==0) || (i==1&&j==6) || (i==2&&j==6) || (i==4&&j==6) || (i==5&&j==0) || (i==5&&j==6) || (i==6&&j==0) || (i==6&&j==5) || (i==6&&j==6)) {
        currTerrain = "none"
        currPointValue = "";
      } else {
        currTerrain = "water";
        currPointValue="";
      }
     this.hexNodes[i][j] = new Hex(currTerrain,currPointValue, false,i,j);
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
}

  function Hex(terrain, pointValue, robber,x,y) {
    this.terrain = terrain;
    this.pointValue = pointValue;
    this.robber = robber;
    this.x = x;
    this.y = y;
  }
  function Vert(param,x,y){
    this.param = param;
    this.x = x;
    this.y = y;
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


var Gameboards = new Meteor.Collection("gameboard", {
  transform: function() {return new Gameboard();}
});

Gameboards.allow({
  remove: function (){
    return true;
  }
});

if (Meteor.isClient) {



  Template.hello.events({
    'click #newBoard' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        //console.log(GamePieces.find({}).fetch()[0]);
        var result = Meteor.call("purge");
        var result2 = Meteor.call("add");
    
    },
    'click #purge' : function() {
      //GamePieces.remove({});
      console.log(Gameboards.find({}).fetch());
      var result = Meteor.call("purge");
      console.log(Gameboards.find({}).fetch());
    },
    'click #addBoard' : function() {
      var result = Meteor.call('add');
    }
  });

  Template.gameboard.Gameboards = function() {
      var currentGame = Gameboards.findOne({});
      console.log("Current Game: " + currentGame);  //[0].hexNodes[0][0].terrain;
      return currentGame;
  };
  Template.gameboard.hexNodes = function() {

    var gameBoardEx = Gameboards.findOne({});
    if (gameBoardEx){
      var hexNodesa = gameBoardEx.hexNodes;
      console.log("HexNodes:");
      console.log(hexNodesa[0][0].terrain);
    return hexNodesa;
    }

  };
  //   Template.gameboard.generate1 = function() {
  //   console.log(Gameboards.find({}).fetch());
  //   return Gameboards.find({}).fetch().length;
  // };

   

}
   
if (Meteor.isServer) {


    Meteor.methods({
      'purge' : function() {
      Gameboards.remove({});
    },
      'add' : function(){
        Gameboards.insert({});
      }
    });

  Meteor.startup(function () {
    // code to run on server at startup

  });

    

}
