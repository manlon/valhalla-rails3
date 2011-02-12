valhalla.Controllers.Deeds = Backbone.Controller.extend({
  routes: {
    "search*query": "search",
    "*query": "index",
  },
  
  index: function(query) { 
    var deeds = new DeedCollection();
    deeds.fetch({success: function(coll, resp){
      new valhalla.Views.Index({ collection: deeds, payload: resp });
    }});
  },
  search: function(query) {
   $.getJSON('/deeds/search' + query, this.index_handler);
  },
  index_handler: function(data) {
   if(data) {
      new valhalla.Views.Index({ collection: deeds, payload: data });
    } else {
      new Error({ message: "Error loading deeds." });
    }
  }
});
