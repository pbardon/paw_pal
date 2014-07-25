DogSittingApp.Views.SittersIndex = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render);
    // this.addMap();

  },

  template: JST["sitters/index"],

  // addMap: function () {
  //   var mapResults = new DogSittingApp.Views.SittersMap();
  //
  //   this.addSubview('.map-wrapper', mapResults);
  // },

  placeMarkers: function() {
    var map = this.map;

    var image = {
      url: 'https://s3-us-west-1.amazonaws.com/pet-sitter-development/paw_icon2.png',
      size: new google.maps.Size(20, 20),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 20)
    };

    var shape = {
      coords: [1,1,1,20,20,20,20,1],
      type: 'poly'
    };

    this.collection.each(function(sitter) {
      var lat = sitter.get('latitude'),
          lng = sitter.get('longitude');
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        icon: image,
        map: map,
        shape: shape,
        title: sitter.get('sitter_name')
      });

      var sitterLink = "<a href='#/sitters/" + sitter.get('id') + "'>" + marker.title + "</a>";

      var infowindow = new google.maps.InfoWindow({
        content: sitterLink
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    });
  },

  render: function() {
    var renderedContent = this.template({
      sitters: this.collection
    });

    this.$el.html(renderedContent);
    setTimeout(this.renderMap.bind(this), 0);
    return this;
  },

  renderMap: function () {

   var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(37.7810560, -122.4114550)
    };

    this.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);


    this.placeMarkers();

    }

});
