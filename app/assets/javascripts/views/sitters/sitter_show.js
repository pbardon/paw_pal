DogSittingApp.Views.SitterShow = Backbone.CompositeView.extend({

  initialize: function(options){
    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model.bookings(), 'add', this.addBooking);
    this.model.bookings().each(this.addBooking.bind(this));

    this.listenTo(this.model.comments(), 'add', this.addComment);
    this.model.comments().each(this.addComment.bind(this));

    this.listenTo(this.model.comments(), 'add', this.render);

  },

  className: "sitterShow",

  events: {
    'click .removeSitterAccount': 'removeSitter',
    'click .bookNow': 'redirectToBooking',
    'click .editSitterInfo': 'redirectToEdit',
    'click #commentOnSitter': 'addCommentForm',
    'click #addCommentButton': 'addNewComment'

  },

  template: function(options) {

    if (this.model.get('current_user_id') && (this.model.get('user_id') === this.model.get('current_user_id')) ) {
      return JST["sitters/show_profile"](options);
    } else {
      return JST["sitters/show"](options);
    }
  },

  addBooking: function (booking) {
    var subview = new DogSittingApp.Views.SitterBookingShow({
      collection: this.model.bookings(),
      model: booking
    });

    this.addSubview('.sitter_bookings', subview.render());
  },

  addCommentForm: function(event) {
    event.preventDefault();
    var commentForm = new DogSittingApp.Views.NewComment({
      model: this.model,
      collection: DogSittingApp.Collections.sittercomments
    });

    $(event.currentTarget).replaceWith('<div class="newCommentFormWrapper"></div>');

    this.addSubview('.newCommentFormWrapper', commentForm);
  },

  addNewComment: function(event) {
    var view = this;
    event.preventDefault();
    var data = $('#newCommentForm').serializeJSON();
    data['commentable_type'] = "Sitter";
    data['commentable_id'] = this.model.get('id');
    var comment = new DogSittingApp.Models.Comment(data);
    DogSittingApp.Collections.sittercomments.create(comment, {
      success: function() {
        view.model.comments().add(comment);
        $(event.currentTarget).replaceWith('<button id="commentOnSitter" class="btn btn-info">Add Comment</button>');

      },
      error: function(model, error) {
        $('.alert').remove();
        _(error.responseJSON).each(function(error){
          $('#newCommentForm').prepend('<div class="alert alert-danger">'+ error +'</div>');
        });
      }
    });

  },

  addComment: function (comment) {
    var subview = new DogSittingApp.Views.CommentShow({
      collection: this.model.comments(),
      model: comment
    });

    this.addSubview('.sitterComments', subview);
  },

  removeSitter: function(event) {
    event.preventDefault();
    $(event.currentTarget).replaceWith('<div style="float: right;"> <img src="https://s3-us-west-1.amazonaws.com/pet-sitter-development/loading.gif"></div>');
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("/", {trigger: true});
        window.location.reload();
      }
    });
  },

  redirectToBooking: function(event) {
    event.preventDefault();
    Backbone.history.navigate("/bookings/"+ this.model.id + "/new", {trigger: true});
  },

  redirectToEdit: function(event) {
    var data = $(event.currentTarget).data('id');
    Backbone.history.navigate('#/sitters/' + data + '/edit', {trigger: true});
  },

  render: function() {
    var renderedContent = this.template({
      sitter: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

})
