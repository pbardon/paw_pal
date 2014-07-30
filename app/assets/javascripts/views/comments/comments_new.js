DogSittingApp.Views.SitterCommentNew = Backbone.View.extend({

  initialize: function(options) {

  },
  
  template: JST['comments/new'],

  render: function () {
    var renderedContent = this.template({
      comment: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }





});
