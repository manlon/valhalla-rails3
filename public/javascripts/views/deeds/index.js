valhalla.Views.Index = Backbone.View.extend({
  initialize: function() {
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
    if(this.collection.length > 0) {
      var out = JST.index({});
      $(this.el).html(out);
      var tbody = this.$('tbody');
      this.collection.each(function(deed){
        tbody.append(JST.deed({deed: deed}));
      });
    } else {
      $(this.el).html("<h3>No deeds!</h3>");
    }
    $('#app').html(this.el);
  },

  search: function() {
    q = $("[name=q]").val();
    window.location = '/deeds#search?q=' + q
  }
});
valhalla.Views.Deed = Backbone.View.extend({
});
