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
    DogSittingApp.Collections.dogs
  }
});
