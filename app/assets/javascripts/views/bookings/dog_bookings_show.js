DogSittingApp.Views.DogBookingShow = Backbone.View.extend({
  template: JST['bookings/dog_show'],

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);

    var view = this;
    $.ajax({
      url: "api/sitters/" + view.model.get('sitter_id'),
      type: "GET",
      success: function(data){
        view.sitter = new DogSittingApp.Models.Sitter(data);
        view.listenTo(view.sitter, 'sync', view.render);
        view.sitter.fetch();
      }
    });
  },

  events: {
    'click .thumbnail': 'showLargePhoto',
    'click .bigImage': 'closeImage'
  },

  showLargePhoto: function(event) {
    $ct = $(event.currentTarget)
    $ct.attr('src', this.sitter.get('sitter_photo_large'));
    $ct.removeClass('thumbnail');
    $ct.addClass('bigImage');

  },

  closeImage: function() {
    $image = $(event.currentTarget).find('img')
    $image.attr('src', this.sitter.get('sitter_photo_small'));
    $image.removeClass('bigImage');
    $image.addClass('thumbnail');
  },

  render: function() {
    var renderedContent = this.template({
      booking: this.model,
      sitter: this.sitter
    });

    this.$el.html(renderedContent);

    return this;
  }

});
