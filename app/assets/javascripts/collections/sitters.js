DogSittingApp.Collections.Sitters = Backbone.Collection.extend({
  url: 'api/sitters',

  model: DogSittingApp.Models.Sitter,

  comparator: 'price',

  getOrFetch: function(id) {
    var sitter = this.get(id);

    if(!sitter) {
      sitter = new DogSittingApp.Models.Sitter({ id: id });
      sitter.fetch({
        success: function () {
          this.add(sitter);
        }.bind(this)
      });
    } else {
      sitter.fetch();
    }

    return sitter;
  }
});

DogSittingApp.Collections.sitters = new DogSittingApp.Collections.Sitters();
