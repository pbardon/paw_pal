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
    var newView = new DogSittingApp.Views.DogNew();

    this._swapView(newView);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;

    this.$rootEl.html(view.render().$el);
  }
});
