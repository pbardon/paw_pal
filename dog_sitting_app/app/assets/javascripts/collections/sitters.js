DogSittingApp.Collections.Sitters = Backbone.Collection.extend({
  url: 'api/sitters'
});

DogSittingApp.Collections.sitters = new DogSittingApp.Collections.Sitters();
