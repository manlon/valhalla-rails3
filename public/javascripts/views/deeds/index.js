valhalla.Views.Index = Backbone.View.extend({
  initialize: function() {
    this.deeds = this.options.deeds;
    this.render();
    $("form").submit(function() {return false;});
    $("#q").focus();
    highlight();
    linkify();
  },

  events: {
    "click #search": "search"
  },
  
  render: function() {
    if(this.deeds.length > 0) {
      var out = JST.index({deeds: this.deeds});
    } else {
      out = "<h3>No deeds!</h3>";
    }
    $(this.el).html(out);
    $('#app').html(this.el);
  },

  search: function() {
    q = $("[name=q]").val();
    window.location = '/deeds#search?q=' + q
  }
});
