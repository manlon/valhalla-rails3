valhalla.Views.Index = Backbone.View.extend({
  initialize: function(options) {
    this.payload = options.payload;
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

      // search form and table
      var out = JST.index({});
      $(this.el).html(out);

      //pagination links
      var pagination = new valhalla.Views.Pagination(this.payload);
      this.$('.pagination').html(pagination.render().el);

      //deed <tbody>
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

valhalla.Views.Pagination = Backbone.View.extend({
  initialize: function(options){
    var me = this;
    _(['total_entries', 'total_pages', 
       'per_page', 'current_page']).each(function(n){
         me[n] = options[n];
    });
    this.inner_window = 4;
    this.outer_window = 1;
    _(this).bindAll('render_page_number', 'page_numbers');
  },
  render: function(){
    if(this.total_pages == 1){
      $(this.el).empty();
      return this;
    }
    $(this.el).html(
      _.map(this.page_numbers(), this.render_page_number).join('')
    );
    return this;
  },

  render_page_number: function(num){
    if(num == 'gap'){
      return '<span class="gap">&hellip;</span>';
    }else if(num == 'previous_page'){
      return this.previous_or_next_link(this.current_page != 1,
               this.current_page - 1,
               'Previous',
               'previous_page');
    }else if(num == 'next_page'){
      return this.previous_or_next_link(this.current_page != this.total_pages,
               this.current_page + 1,
               'Next',
               'next_page');
    }else if(num == this.current_page){
      return '<em>' + num + '</em>';
    }else{
      return '<a href="' + this.page_url(num) + '">' + num + '</a>';
    }
  },
  page_url: function(page){
    return '/deeds?page=' + page;
  },
  previous_or_next_link: function(islink, page, text, classname){
    if(islink){
      return '<a href="' + this.page_url(page) + '" class="' + classname + '">' + text + '</a>';
    }else{
      return '<span class="' + classname + ' disabled">' + text + '</span>';
    }
  },

  page_numbers: function(){
    var iw=this.inner_window, ow=this.outer_window;
    var curp = this.current_page, totp = this.total_pages;
    var win_from = curp - iw;
    var win_to = curp + iw;

    if(win_to > totp){
      win_from -= win_to - totp;
      win_to = totp;
    }
    if(win_from < 1){
      win_to += 1 - win_from;
      win_from = 1;
      if(win_to > totp) win_to = totp;
    }
    var middle = _.range(win_from, win_to+1);
    var left, right;

    if(ow + 3 < middle[0]){
      left = _.range(1, ow+2);
      left.push('gap');
    }else{
      left = _.range(1, middle[0]);
    }
    var lastmid = _(middle).last();
    if(totp - ow - 2 > lastmid){
      right = ['gap'].concat(_.range(totp - ow, totp+1));
    }else{
      right = _.range(lastmid + 1, totp + 1);
    }
    return ['previous_page'].concat(left, middle, right, ['next_page']);
  }
});
