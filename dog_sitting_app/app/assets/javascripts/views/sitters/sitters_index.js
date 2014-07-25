DogSittingApp.Views.SittersIndex = Backbone.View.extend({

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST["sitters/index"],

  render: function() {
    var renderedContent = this.template({
      sitters: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }

});
