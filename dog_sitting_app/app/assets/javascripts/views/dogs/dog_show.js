DogSittingApp.Views.DogShow = Backbone.View.extend({
  template: JST['dogs/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var renderedContent = this.template({
      dog: this.model
    });

    this.$el.html(renderedContent);
    
    return this;
  }
});
