DogSittingApp.Views.SitterForm = Backbone.View.extend({
  template: JST['sitters/form'],

  events: {
    'submit form':'submit',
    'change #addPic': 'handle_files'
  },

  render: function() {
    var renderedContent = this.template({
      sitter: this.model
    });

    this.$el.html(renderedContent)

    return this;
  },

  handle_files: function(event) {
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      that.model.set('sitter_photo', this.result)
    };
    reader.readAsDataURL(file);
  },

  submit: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    this.model.set(data);

    if (this.model.isNew()) {
      this.collection.create(this.model, {
        success: function() {
          wait:true;
          Backbone.history.navigate('/');
          window.location.reload();
        }
      });
    }else {
      this.model.save({
        success: function() {
          Backbone.history.navigate("/", { trigger: true });
        }
      });
    }
  }
});
