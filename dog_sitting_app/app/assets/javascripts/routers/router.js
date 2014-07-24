DogSittingApp.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#main');

  },

  routes: {
    '': 'dogsIndex',
    'api/dogs/new': 'dogNew',
    'api/dogs/:id': 'dogShow',
    'api/dogs/:id/edit': 'dogEdit'
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

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
  }
});
