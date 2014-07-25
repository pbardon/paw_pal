DogSittingApp.Views.DogShow = Backbone.View.extend({
  template: JST['dogs/show'],

  initialize: function() {
    this.listenTo(this.model, 'add', this.render);
  },

  events: {
    'click .removeDog': 'removeDog'
  },

  render: function() {
    var renderedContent = this.template({
      dog: this.model
    });

    this.$el.html(renderedContent);

    return this;
  },

  removeDog: function(event) {

    event.preventDefault();
    this.model.destroy();

    Backbone.history.navigate("/", { trigger: true })
  }
});
