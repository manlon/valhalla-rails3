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
        var view = new valhalla.Views.Deed({model: deed});
        tbody.append($(view.render().el).html());
      });
    } else {
      $(this.el).html("<h3>No deeds!</h3>");
    }
    $('#app').html(this.el);
    return this;
  },

  search: function() {
    q = $("[name=q]").val();
    window.location = '/deeds#search?q=' + q
  }
});
valhalla.Views.Deed = Backbone.View.extend({
  render: function(){
    $(this.el).html(JST.deed({deed: this.model}));
    return this;
  }
});
