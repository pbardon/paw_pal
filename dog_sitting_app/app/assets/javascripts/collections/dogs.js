DogSittingApp.Collections.Dogs = Backbone.Collection.extend({
  model: DogSittingApp.Models.Dog,
  url: 'api/dogs',

  getOrFetch: function(id) {
    var dog = this.get(id);

    if(!dog) {
      dog = new DogSittingApp.Models.Dog({ id: id });
      dog.fetch({
        success: function () {
          this.add(dog);
        }.bind(this)
      });
    } else {
      dog.fetch();
    }

    return dog;
  }
});


DogSittingApp.Collections.dogs = new DogSittingApp.Collections.Dogs();
