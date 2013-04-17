GameBoards = new Meteor.Collection('gameboards');
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return 'Welcome to Settlers.';
  };
  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log(GameBoards.findOne({name: 'board 1'}));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    GameBoards.insert({name: 'board 1'});
    // code to run on server at startup
    
  });
}
