valhalla.Controllers.Deeds = Backbone.Controller.extend({
  routes: {
    "search*query": "search",
    "*query": "index",
  },
  
  index: function(query) { 
    $.getJSON('/deeds' + query, this.index_handler);
  },
  search: function(query) {
   $.getJSON('/deeds/search' + query, this.index_handler);
  },
  index_handler: function(data) {
    if(data) {
      var deeds = _(data.deeds).map(function(i) { return new Deed(i); });
      new valhalla.Views.Index({ deeds: deeds, total: data.total });
    } else {
      new Error({ message: "Error loading deeds." });
    }
  }
});
