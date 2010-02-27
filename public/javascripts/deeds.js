var DeedsRenderer = Class.create({
  initialize: function(selector){
    this.template = $p(selector);
    this.directive = {
      'tr.deed': {
        'deed<-deeds':{
          '.performed_at': function(e){return epoch(e.item.performed_at).toLocaleString();},
          '.speaker': 'deed.speaker',
          '.text': function(e){return this.displayText(e.item.text);}.bind(this),
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
  },
  displayText: function(text){
    if(!text) return '';
    var urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
    var match;
    var parts = [];
    var i = 0;
    // for each match, push onto parts the text before the 
    // match and the match itself. Even indices will have plain
    // text and odd indices will contain links
    while(match = urlRegex.exec(text)){
      parts.push(text.slice(i, match.index));
      parts.push(match[0]);
      i = urlRegex.lastIndex;
    }
    // push the remaining text (will be an even index)
    parts.push(text.slice(i));
    
    var s = "";
    for(i=0; i<parts.length;i++){
      if(i%2==0){
        //even - plain
        s += parts[i].escapeHTML();
      }else{
        //odd - link
        s += '<a href="' + parts[i] + '">' + parts[i] + "</a>"
      }
    }
    return s;
  }
});
