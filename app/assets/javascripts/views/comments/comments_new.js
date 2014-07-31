DogSittingApp.Views.NewDogComment = Backbone.View.extend({

  initialize: function(options) {

  },

  events: {
    'submit form' : 'addComment'
  },

  template: JST['comments/new'],

  render: function () {
    var renderedContent = this.template({
      booking: this.model
    });

    this.$el.html(renderedContent);

    return this;
  },

  addComment: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    data['commentable_type'] = "Sitter";
    data['commentable_id'] = this.model.get('dog_id');
    var comment = new DogSittingApp.Models.Comment(data);
    // comment.attributes['comment']['commentable_type'] = "Sitter";
    // comment.attributes['comment']['commentable_id'] = this.model.get('dog_id');
    this.collection.create(comment, {
      success: function() {
        $(event.currentTarget).remove();

      },
      error: function(model, error) {
        $('.alert').remove();
        _(error.responseJSON).each(function(error){
          $(event.currentTarget).prepend('<div class="alert alert-danger">'+ error +'</div>');
        });
      }
    });

  }





});
