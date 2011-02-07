valhalla.Views.Index = Backbone.View.extend({
  initialize: function() {
    this.deeds = this.options.deeds;
    this.render();
  },
  
  render: function() {
    if(this.deeds.length > 0) {
      var out = JST.index({deeds: this.deeds});
    } else {
      out = "<h3>No deeds!</h3>";
    }
    $(this.el).html(out);
    $('#app').html(this.el);
  }
});
