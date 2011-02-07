var Deed = Backbone.Model.extend({
    url : function() {
      var base = 'deeds';
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    }
});
