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

  Template.gameboard.events({
    'click .vertex' : function() {
      console.log("vertex position");
      console.log(this.x);
      console.log(this.y);
      console.log("Coords: " + this.posX + " , " + this.posY);
    },
    'click .hexagon-in2' : function() {
      console.log("hexagon position");
      console.log(this.x);
      console.log(this.y);
      console.log("Coords: " + this.posX + " , " + this.posY);
      for (var i = 0; i < 6; i++){
        var num = Gameboards.findOne({}).findVerticesByHexagon(this)[i].num;
        $("#vertex" + num).toggleClass('selected');
      }
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
  Template.gameboard.overlay = function() {
    var gameBoardEx = Gameboards.findOne({});
    if (gameBoardEx){
      var vertexGrida = gameBoardEx.vertices.vertexArray;
      console.log("vertexGrid");
      console.log(vertexGrida[2][2].x);
    return vertexGrida;
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
