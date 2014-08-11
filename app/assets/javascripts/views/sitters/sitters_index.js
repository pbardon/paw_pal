DogSittingApp.Views.SittersIndex = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.placeMarkers);

    this.listenTo(this.collection, 'sync', this.addSitterIndex.bind(this));


    this.listenTo(this.collection, 'sync', this.saveOriginalCollection);


  },

  events: {
    "click #search": 'searchResults',
    "click .moreInfo": 'showInfo'
  },

  className: "frontPageWrapper",

  template: JST["sitters/index"],

  addSitterIndex: function(){

    var subview = new DogSittingApp.Views.SitterIndex({
      collection: this.collection
    });

    this.addSubview('.sitterIndex', subview.render());

  },

  showInfo: function(event) {
    var $ct = $(event.currentTarget);
    var sitterId = $ct.data('id');
    Backbone.history.navigate("#/sitters/" + sitterId, {trigger: true});
  },

  changeBounds: function(event) {
    var view = this;
    var sw = this.map.getBounds().getSouthWest();
    var ne = this.map.getBounds().getNorthEast();
    this.minY = sw['k'];
    this.maxY = ne['k'];
    this.maxX = ne['B'];
    this.minX = sw['B'];


    this.collection.reset(this.originalCollection.filter(function(model) {
       return (model.get('latitude') < view.maxY &&
        model.get('longitude') > view.minX &&
         model.get('latitude') > view.minY &&
          model.get('longitude') < view.maxX);
      }));

  },

  placeMarkers: function() {
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

      var sitterLink = "<div><a href='#/sitters/" + sitter.get('id') + "'>" + marker.title + "</a><br><img width='75px' height='75px' src=" +sitter.get('sitter_photo_small')+"></div>";

      var infowindow = new google.maps.InfoWindow({
        content: sitterLink
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    });
  },



  searchResults: function(event) {
    var view = this;
    event.preventDefault();

    geocoder = new google.maps.Geocoder();



    var query = $('#searchParams').val();

    geocoder.geocode( { 'address': query }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        view.map.setCenter(results[0].geometry.location);
        view.map.setZoom(12);
      } else {
        $('.container').prepend("<div class='alert alert-warning'>There was a problem with your search</div>");
      }
    });
  },

  saveOriginalCollection: function() {
    this.originalCollection = new DogSittingApp.Collections.Sitters(this.collection.models);
  },

  renderMap: function () {
   var view = this;

   var mapOptions = {
      zoom: 10,
      center: new google.maps.LatLng(37.7810560, -122.4114550)
    };

    this.map = new google.maps.Map(this.$('#map-canvas')[0],
        mapOptions);
    this.placeMarkers();

    $(window).load(function() {
      google.maps.event.addListener(view.map, "bounds_changed", view.changeBounds.bind(view));
    });

  },

  render: function() {
    var renderedContent = this.template({
      sitters: this.collection
    });

    this.$el.html(renderedContent);

    this.renderMap();

    this.attachSubviews();

    return this;
  }


});
