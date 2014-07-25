DogSittingApp.Views.SitterShow = Backbone.View.extend({

  initialize: function(options){
    this.listenTo(this.model, 'sync', this.render)
  },

  events: {
    'click .removeSitterAccount': 'removeSitter'
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
    debugger;
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("/");
        window.location.reload();
      }
    });
  }
})
