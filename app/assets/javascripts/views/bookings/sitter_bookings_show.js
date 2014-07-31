DogSittingApp.Views.SitterBookingShow = Backbone.CompositeView.extend({
  template: JST['bookings/sitter_booking_show'],
  // function() {
    // if(this.model.get('completed')) {
    //   // return completed template
    // } else {
    //   return JST['bookings/sitter_booking_show']
    // }


  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "change:confirmed", this.render);

    this.dog = DogSittingApp.Collections.dogs.getOrFetch(this.model.get('dog_id'));

    this.listenTo(this.dog, 'sync', this.render)

  },

  events: {
    'click .confirmBooking': "confirmBooking",
    'click .denyBooking': "denyBooking",
    'click .thumbnail': 'showLargePhoto',
    'click .bigImage': 'closeImage',
    'click #commentOnBooking': 'addCommentForm'
  },

  addCommentForm: function(event) {
    event.preventDefault();
    var commentForm = new DogSittingApp.Views.NewComment({
      model: this.model,
      collection: DogSittingApp.Collections.dogcomments
    });

    $(event.currentTarget).replaceWith('<div class="newCommentForm"></div>');

    this.addSubview('.newCommentForm', commentForm);
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
        var data_id = $('.confirmDiv').data('id');
        $('.confirmDiv').remove();
        $('.denyDiv').remove();
        debugger;
        $(".sitterBooking[data-id='" + data_id +"']").append('<h2> Booking Confirmed </h2>');
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
        $(".sitterBooking[data-id='" + data_id +"']").append('<h2> Booking Denied </h2>');
      }
    });
  },


  render: function() {
    var renderedContent = this.template({
      booking: this.model,
      dog: this.dog
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }

});
