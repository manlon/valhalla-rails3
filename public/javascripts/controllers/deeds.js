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
      var deeds = new DeedCollection(data.deeds);
      new valhalla.Views.Index({ collection: deeds, total: data.total });
    } else {
      new Error({ message: "Error loading deeds." });
    }
  }
});
