DogSittingApp.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');

  },

  routes: {
    '': 'dogsIndex',
    'dogs/new': 'dogNew',
    'dogs/:id/edit': 'dogEdit',
    'dogs/:id': 'dogShow',
    'sitters/new': 'sitterNew',
    'sitters/': 'sitterIndex',
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

    var showView = new DogSittingApp.Views.DogShow({
      model: dog
    });

    this._swapView(showView);
  },

  dogNew: function() {
    var dog = new DogSittingApp.Models.Dog();
    var newView = new DogSittingApp.Views.DogForm({
      model: dog,
      collection: DogSittingApp.Collections.dogs
    });

    this._swapView(newView);
  },

  dogEdit: function(id) {
    var dog = DogSittingApp.Collections.dogs.getOrFetch(id);

    var editView = new DogSittingApp.Views.DogForm({
      model: dog,
      collection: DogSittingApp.Collections.dogs
    });

    this._swapView(editView);
  },

  newSitter: function() {

  },


  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
  }
});
