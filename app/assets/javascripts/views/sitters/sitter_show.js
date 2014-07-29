DogSittingApp.Views.SitterShow = Backbone.CompositeView.extend({

  initialize: function(options){
    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model.bookings(), 'add', this.addBooking);

    this.model.bookings().each(this.addBooking.bind(this));

    this.addMap();
  },

  className: "sitterShow",

  events: {
    'click .removeSitterAccount': 'removeSitter',
    'click .bookNow': 'redirectToBooking'
  },

  addBooking: function (booking) {
    booking.fetch();
    var subview = new DogSittingApp.Views.SitterBookingShow({
      model: booking
    });

    this.addSubview('.sitter_bookings', subview.render());
  },


  template: JST["sitters/show"],

  render: function() {
    var renderedContent = this.template({
      sitter: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  removeSitter: function(event) {
    event.preventDefault();
    $(event.currentTarget).replaceWith('<div style="float: right;"> <img src="https://s3-us-west-1.amazonaws.com/pet-sitter-development/loading.gif"></div>');
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("/");
        window.location.reload();
      }
    });
  },

  redirectToBooking: function(event) {
    event.preventDefault();
    Backbone.history.navigate("/bookings/"+ this.model.id + "/new", {trigger: true});
  },

  placeMark: function() {
    var map = this.map;

    var image = {
      url: 'https://s3-us-west-1.amazonaws.com/pet-sitter-development/paw_icon3.png',
      size: new google.maps.Size(20, 20),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 20)
    };

    var shape = {
      coords: [1,1,1,20,20,20,20,1],
      type: 'poly'
    };

    var lat = this.model.get('latitude'),
        lng = this.model.get('longitude');
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      icon: image,
      map: map,
      shape: shape,
      title: this.model.get('sitter_name')
    });

  },

  addMap: function() {
    var mapview = new DogSittingApp.Views.MapShow({
      model: this.model
    });

    this.addSubview('.mapWrapper', mapview);
  },


  renderMap: function () {
    // var mapOptions = {
    //   zoom: 10,
    //   center: new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'))
    // };
    //
    // this.map = new google.maps.Map(this.$('#map-canvas')[0],
    //     mapOptions);
    //
    // this.placeMark();
  }
})
