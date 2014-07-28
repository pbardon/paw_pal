DogSittingApp.Views.DogBookingShow = Backbone.View.extend({
  template: JST['bookings/dog_show'],

  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var renderedContent = this.template({
      booking: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }

});
