// declare collections
// this code should be included in both the client and the server
Gameboard = function() {
  this.name = "Nick";
  this.hexNodes = [];
  for (var i = 0; i<7; i++){
    this.hexNodes[i] = [];
    for (var j=0;j<7;j++){
     this.hexNodes[i][j] = new Hex("water", 0, false,i,j);
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
var GamePieces = new Meteor.Collection("gamepieces");
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
    'click #input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        //console.log(GamePieces.find({}).fetch()[0]);
        console.log(Gameboards.find({}).fetch().length);
    
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

    GamePieces.insert({roads: 14}, {houses: 5}, {hotels: 5});


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

    Gameboards.insert({});

  });

    

}
