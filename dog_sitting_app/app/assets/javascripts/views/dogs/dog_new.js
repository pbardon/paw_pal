DogSittingApp.Views.DogNew = Backbone.View.extend({
  template: JST['dogs/new'],

  initialize: function(options) {

  },

  events: {
    'form submit' : 'submit'
  },

  render: function() {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);

    return this;
  }
});
