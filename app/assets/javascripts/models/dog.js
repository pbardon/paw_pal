DogSittingApp.Models.Dog = Backbone.Model.extend({
  urlRoot: 'api/dogs',

  bookings: function() {
    this._bookings = this._bookings ||
      new DogSittingApp.Collections.DogBookings([], { dog: this });
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
