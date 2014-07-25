DogSittingApp.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');

  },

  routes: {
    '': 'dogsIndex',
    'dogs/new': 'dogNew',
    'dogs/:id/edit': 'dogEdit',
    'dogs/:id': 'dogShow',
    'sitters/new': 'newSitter',
    'sitters': 'sittersIndex',
    'sitters/:id': 'sitterShow',
    'sitters/:id/edit': 'sitterEdit'

  },

  dogsIndex: function () {
    DogSittingApp.Collections.dogs.fetch();

    var dogsView = new DogSittingApp.Views.DogsIndex({
      collection: DogSittingApp.Collections.dogs
    });

    this._swapView(dogsView);
  },

  dogShow: function(id) {
    var dog = DogSittingApp.Collections.dogs.getOrFetch(id);

    var showDogView = new DogSittingApp.Views.DogShow({
      model: dog
    });

    this._swapView(showDogView);
  },

  dogNew: function() {
    var dog = new DogSittingApp.Models.Dog();
    var newDogView = new DogSittingApp.Views.DogForm({
      model: dog,
      collection: DogSittingApp.Collections.dogs
    });

    this._swapView(newDogView);
  },

  dogEdit: function(id) {
    var dog = DogSittingApp.Collections.dogs.getOrFetch(id);

    var editDogView = new DogSittingApp.Views.DogForm({
      model: dog,
      collection: DogSittingApp.Collections.dogs
    });

    this._swapView(editDogView);
  },

  sitterNew: function() {

    var sitter = new DogSittingApp.Models.Sitter();
    var newSitterView = new DogSittingApp.Views.SitterForm({
      model: sitter,
      collection: DogSittingApp.Collections.sitters
    });

    this._swapView(newSitterView);

  },

  sitterShow: function(id) {
    var sitter = DogSittingApp.Collections.sitters.getOrFetch(id);
    var showSitterView = new DogSittingApp.Views.SitterShow({
      model: sitter
    });


    this._swapView(showSitterView);
  },

  sittersIndex: function() {
    DogSittingApp.Collections.sitters.fetch();
    var sittersView = new DogSittingApp.Views.SittersIndex({
      collection: DogSittingApp.Collections.sitters
    });

    this._swapView(sittersView);
  },


  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
  }
});
