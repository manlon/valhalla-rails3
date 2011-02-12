var Deed = Backbone.Model.extend();

var DeedCollection = Backbone.Collection.extend({
  model: Deed,
  //cheat
  url: location.href,
  parse: function(resp){ this.payload = resp; return resp['deeds'];}
});
