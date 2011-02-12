valhalla.Controllers.Deeds = Backbone.Controller.extend({
  routes: {
    "search*query": "search",
    "*query": "index",
  },
  
  index: function(query) {
    $.getJSON('/deeds' + query, function(data) {
      if(data) {
        var deeds = _(data).map(function(i) { return new Deed(i); });
        new valhalla.Views.Index({ deeds: deeds });
      } else {
        new Error({ message: "Error loading deeds." });
      }
    });
  },
  search: function(query) {
    $.getJSON('/deeds/search' + query, function(data) {
      if(data) {
        var deeds = _(data).map(function(i) { return new Deed(i); });
        new valhalla.Views.Index({ deeds: deeds });
      } else {
        new Error({ message: "Error loading deeds." });
      }
    });
  }
});
