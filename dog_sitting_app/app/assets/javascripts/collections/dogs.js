DogSittingApp.Collections.Dogs = Backbone.Collection.extend({
  model: DogSittingApp.Models.Dog,
  url: 'api/dogs'

  // getOrFetch: function(id) {
  //   var dog = this.get(id);
  //
  //   if(!dog)
  // }
});


DogSittingApp.Collections.dogs = new DogSittingApp.Collections.Dogs();
