var DeedsRenderer = Class.create({
  initialize: function(selector){
    this.template = $p(selector);
    this.directive = {
      'tr.deed': {
        'deed<-deeds':{
          '.performed_at': function(e){return epoch(e.item.performed_at).toLocaleString();},
          '.speaker': 'deed.speaker',
          '.text': 'deed.text',
          '@style': function(e){return "background:" + Highlighter.getColor(e.item.speaker);},
          '@class+': (function(e){return (this.max_id < e.item.id) ? ' new' : ''}).bind(this)
        }
      }
    };
    this.rfn = this.template.compile(this.directive);
  },
  startPoll: function(){
    this.poller = new SafePeriodic(5, function(ok){this.requestAndRender(ok);}.bind(this));
  },
  requestAndRender: function(callback){
    if(!this.client){
      this.client = new ClientFactory(location.href);
    }
    this.client.all(function(data){
      this.render(data);
      callback();
    }.bind(this),{parameters: {last: this.max_id}});
  },
  render: function(data){
    if(!data.length > 0) return
    if(!this.max_id) this.max_id = data[data.length-1].id;
    this.template.render({deeds: data}, this.rfn);
    this.max_id = data[data.length-1].id;
    $$('.new').each(function(e){e.highlight();});
  }
});
