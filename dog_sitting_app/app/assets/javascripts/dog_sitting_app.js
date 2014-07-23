window.DogSittingApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new DogSittingApp.Routers.Router
    Backbone.history.start();
  }
};
