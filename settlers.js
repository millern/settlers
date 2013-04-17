// declare collections
// this code should be included in both the client and the server
Gameboard = function() {
  this.hexNodes = "Nick";
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
    GameBoards.insert({name: 'board 1'});
    // code to run on server at startup

    Gameboards.insert({});

  });

    

}
