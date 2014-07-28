DogSittingApp.Models.Sitter = Backbone.Model.extend({
  urlRoot: 'api/sitters',

  bookings: function() {
    this._bookings = this._bookings ||
      new DogSittingApp.Collections.SitterBookings([], { sitter: this });
    return this._bookings;
  },

  parse: function (jsonPayload) {
    if (jsonPayload.bookings) {
      this.bookings().set(jsonPayload.bookings, { parse: true });
      delete jsonPayload.bookings;
    }

    return jsonPayload;
  }

});
