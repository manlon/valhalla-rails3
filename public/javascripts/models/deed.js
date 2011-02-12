var Deed = Backbone.Model.extend();

var DeedCollection = Backbone.Collection.extend({
  model: Deed,
  url: '/deeds'
});
