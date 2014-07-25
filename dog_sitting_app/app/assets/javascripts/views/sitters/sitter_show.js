DogSittingApp.Views.SitterShow = Backbone.View.extend({

  initialize: function(options){
  },

  events: {
    'click .removeSitter': 'removeSitter'
  },


  template: JST["sitters/show"],

  render: function() {
    var renderedContent = this.template({
      sitter: this.model
    });

    this.$el.html(renderedContent);

    return this;
  },

  removeSitter: function(event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate("/", { trigger: true })
  }
})
