
var Highlighter = Class.create({
  initialize: function() {
    this.cache = {};
  },

  generateColor: function(seed) {
    seed = seed || '';
    var md5 = hex_md5(seed);
    var colors = md5.match(/[\da-f]{2}/ig).slice(0,3).collect(function(i){return parseInt(i,16);});
    colors = colors.collect(function(i){return parseInt((i/4) + 192 ,10);});
    return 'rgb(' + colors.join(',') + ')';
  }, 

  getColor: function(seed) {
    if (this.cache.hasOwnProperty(seed) === true) {
      return this.cache[seed];
    }
    var color = this.generateColor(seed);
    this.cache[seed] = color;
    return color;
  }
});

Highlighter = new Highlighter();

