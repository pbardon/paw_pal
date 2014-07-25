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
    this.collection.each(function(sitter) {
      var lat = sitter.get('latitude'),
          lng = sitter.get('longitude');
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        title: sitter.get('sitter_name')
      });
      marker.setMap(map)

      var sitterLink = "<a href='#sitters/" + sitter.get('id') + "'>" + marker.title + "</a>";

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
