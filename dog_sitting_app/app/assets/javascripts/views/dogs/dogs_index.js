DogSittingApp.Views.DogsIndex = Backbone.CompositeView.extend({
  className: 'dogs',

  template: JST['dogs/show'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      dogs: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }

});
