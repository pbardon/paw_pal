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

  render: function() {
    var renderedContent = this.template({
      booking: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }

});
