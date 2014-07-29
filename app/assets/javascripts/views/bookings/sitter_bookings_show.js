DogSittingApp.Views.SitterBookingShow = Backbone.View.extend({
  template: JST['bookings/sitter_show'],

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "change:confirmed", this.render);

    //
    // this.dog = new DogSittingApp.Models.Dog({id: this.model.get('dog_id')});
    // this.listenTo(this.model.dog(), 'sync', this.render);
    // this.dog.fetch();

    var view = this;
    $.ajax({
      url: "api/dogs/" + view.model.get('dog_id'),
      type: "GET",
      success: function(data){
        view.dog = new DogSittingApp.Models.Dog(data);
        view.listenTo(view.dog, 'sync', view.render);
        view.dog.fetch();
      }
    });
  },

  events: {
    'click .confirmBooking': "confirmBooking",
    'click .denyBooking': "denyBooking",
    'click .thumbnail': 'showLargePhoto',
    'click .bigImage': 'closeImage'
  },

  showLargePhoto: function(event) {
    $ct = $(event.currentTarget)
    $ct.attr('src', this.dog.get('dog_photo_large'));
    $ct.removeClass('thumbnail');
    $ct.addClass('bigImage');

  },

  closeImage: function() {
    $image = $(event.currentTarget).find('img')
    $image.attr('src', this.dog.get('dog_photo_small'));
    $image.removeClass('bigImage');
    $image.addClass('thumbnail');
  },

  confirmBooking: function() {
    var view = this;
    $.ajax({
      url: 'api/bookings/' + this.model.id,
      type: "PUT",
      data: {
        booking: { confirmed: 'true' }
      }, success: function(data) {
        $('.confirmDiv').remove();
        $('.denyDiv').remove();
        $('.sitterBooking').append('<h2> Booking Confirmed </h2>');
      }, errors: function(jq, status, message) {
        $('.sitterBooking').prepend("<div class='alert alert-warning'>"+ message + "</div>")
      }

    });
  },

  denyBooking: function() {
    var view = this;
    $.ajax({
      url: 'api/bookings/' + this.model.id,
      type: "PUT",
      data: {
        booking: { confirmed: 'true' , completed: 'true'}
      }, success: function(data) {
        $('.confirmDiv').remove();
        $('.denyDiv').remove();
        $('.sitterBooking').append('<h2> Booking Denied </h2>');
      }
    });
  },


  render: function() {

    var renderedContent = this.template({
      booking: this.model,
      dog: this.dog
    });

    this.$el.html(renderedContent);

    return this;
  }

});
