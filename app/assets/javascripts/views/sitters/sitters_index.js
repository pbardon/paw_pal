DogSittingApp.Views.SittersIndex = Backbone.CompositeView.extend({

  initialize: function(options) {
    this.listenTo(this.collection, 'sync reset', this.render);

    this.listenTo(this.collection, 'sync', this.addSitterIndex.bind(this));


  },

  template: JST["sitters/index"],

  addSitter: function(){

    var subview = new DogSittingApp.Views.SitterIndex({
      collection: this.collection
    });

    this.addSubview('.sitter_bookings', subview.render());

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

  changeBounds: function(event) {
    console.log("change bounds firing");
    console.log(event);
    var view = this;
    var sw = event.getSouthWest();
    var ne = event.getNorthEast();
    this.minY = sw['k'];
    this.maxY = ne['k'];
    this.maxX = ne['B'];
    this.minX = sw['B'];


    this.collection.reset(this.collection.filter(function(model) {
       return (model.get('latitude') < view.maxY &&
        model.get('longitude') > view.minX &&
         model.get('latitude') > view.minY &&
          model.get('longitude') < view.maxX);
      }));

    console.log(this.collection.models);

  },

  render: function() {
    var renderedContent = this.template({
      sitters: this.collection
    });

    this.$el.html(renderedContent);

    // this.renderMap();

    return this;
  },


  renderMap: function () {
   var view = this;


   var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(37.7810560, -122.4114550)
    };

    this.map = new google.maps.Map(this.$('#map-canvas')[0],
        mapOptions);
    this.placeMarkers();



    function fireIfLastEvent(){
      if (lastEvent.getTime() + 500 <= new Date().getTime())
        {
        view.changeBounds.bind(view);
      }
    }

    function scheduleDelayedCallback(){
      lastEvent = new Date();
      setTimeout(fireIfLastEvent, 500);
    }


    $(window).load(function() {
      google.maps.event.addListener(view.map, "bounds_changed", view.changeBounds.bind(view));
    });

  }

});
