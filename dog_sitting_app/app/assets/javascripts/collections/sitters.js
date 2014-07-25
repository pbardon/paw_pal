DogSittingApp.Collections.Sitters = Backbone.Collection.extend({
  url: 'api/sitters',

  getOrFetch: function(id) {
    var sitter = this.get(id);

    if(!sitter) {
      sitter = new DogSittingApp.Models.Dog({ id: id });
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