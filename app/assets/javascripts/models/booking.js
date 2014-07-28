DogSittingApp.Models.Booking = Backbone.Model.extend({
  urlRoot: 'api/bookings',

  dog: function() {
    this._dog = this._dog ||
      new DogSittingApp.Collections.Bookings([], { booking: this });
    return this._dog;
  },

  sitter: function() {
    this._sitter = this._sitter ||
      new DogSittingApp.Collections.Bookings([], { booking: this });
    return this._sitter;

  },

  parse: function (jsonPayload) {
    if (jsonPayload.dog) {
      this.dog().set(jsonPayload.dog, { parse: true });
      delete jsonPayload.dog;
    } else if (jsonPayload.sitter){
      this.sitter().set(jsonPayload.sitter, { parse: true });
      delete jsonPayload.sitter;
    }
    return jsonPayload;
  }
});
