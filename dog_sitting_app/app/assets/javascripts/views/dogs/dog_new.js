DogSittingApp.Views.DogNew = Backbone.View.extend({
  template: JST['dogs/new'],

  initialize: function(options) {

  },

  events: {
    'submit form' : 'submit'
  },

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var data = $(event.currentTarget).serializeJSON();
    this.model.set(data);
    debugger;
    this.model.create({
      name: this.$('#dogName').val(),
      age: parseInt(this.$('#dogAge').val()),
      description: this.$('dogDescription').val(),
      size: this.$('dogSize').val()
    });

    debugger;
  }
});
