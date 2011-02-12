valhalla.Controllers.Deeds = Backbone.Controller.extend({
  routes: {
    "search*query": "search",
    "*query": "index",
  },

  initialize: function(options){
    this.data = options.data;
  },
  
  index: function(query) { 
    var deeds = new DeedCollection();
    if(this.data){
      deeds.refresh(deeds.parse(this.data));
      new valhalla.Views.Index({ collection: deeds, payload: this.data });
      this.data = null;
    }else{
      deeds.fetch({success: function(coll, resp){
        new valhalla.Views.Index({ collection: deeds, payload: resp });
      }});
    }
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
