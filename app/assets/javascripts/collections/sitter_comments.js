DogSittingApp.Collections.SitterComments = Backbone.Collection.extend({

  url: "api/comments",

  model: DogSittingApp.Models.SitterComment,

  getOrFetch: function(id) {
    var comment = this.get(id)

    if(!comment) {
      comment = new DogSittingApp.Models.SitterComment({ id: id });
      comment.fetch({
        success: function() {
          this.add(comment)
        }.bind(this)
      });
    }else {
      comment.fetch();
    }

    return comment;
  }

});