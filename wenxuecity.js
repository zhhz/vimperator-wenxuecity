var wenxuecity = {};

wenxuecity.url = "www.wenxuecity.com";

//{fourm: [[forum_home_url, forum_post_base_url]]}
wenxuecity.forums = {
  news:   [wenxuecity.url + "/news/morenews", wenxuecity.url],
  gossip: [wenxuecity.url + "/news/gossipmore", wenxuecity.url],
  ent:    [wenxuecity.url + "/news/entmore", wenxuecity.url],
  // joke:   ["bbs.wenxuecity.com/joke/?reply=0", "bbs.wenxuecity.com/joke/"]
  bbs:   ["bbs.wenxuecity.com/", "bbs.wenxuecity.com/"]
};

wenxuecity.load = function(forums, date){

  loadHomePages();

  // I will leave the home pages open
  function loadHomePages(){
    // add a new tab and make it active(current)
    gBrowser.selectedTab = gBrowser.addTab(wenxuecity.url);

    forums = forums.toString().split(' ')
    for(var i = 0; i < forums.length; i++){
      if(forums[i] == 'news' || forums[i] == 'gossip' || forums[i] == 'ent'){
        newsHomePage(wenxuecity.forums[forums[i]][0], wenxuecity.forums[forums[i]][1]);
      }else{
        forumHomePage(wenxuecity.forums['bbs'][0] + forums[i] + "/?reply=0", wenxuecity.forums['bbs'][1] + forums[i] + "/");
      }
    }
  }

  // TODO: pagination
  function newsHomePage(newsUrl, baseUrl){
    gBrowser.getBrowserForTab(gBrowser.addTab(newsUrl)).addEventListener("load",
        function processPostList(event){
          // alert(event.originalTarget);
          var es = event.originalTarget.getElementsByTagName("a");
          // var reg = new RegExp("2011\/12\/02\/");
          var reg = new RegExp(date);
          for(var j = 0; j < es.length; j++){
            var h = es[j].getAttribute('href');
            if(h.match(reg)){
              gBrowser.getBrowserForTab(gBrowser.addTab(baseUrl + h)).addEventListener("load", processPost, true);
              // TODO debug only, remove me
              // break;
            }
          }
        }, true);
  }


  // TODO: pagination
  function forumHomePage(forumHomeUrl, baseUrl){
    gBrowser.getBrowserForTab(gBrowser.addTab(forumHomeUrl)).addEventListener("load",
        function processPostList(event){
          var es = event.originalTarget.getElementsByTagName("small");
          var s = date.split('/');
          s = s[1] + "/" + s[2] + "/" + s[0];
          // var reg = new RegExp(/12\/7\/11/);
          var reg = new RegExp(s);
          for(var j = 0; j < es.length; j++){
            var h = es[j].innerHTML; // parentNode.childNodes[0].innerHTML;
            if(h.match(reg)){
var url = baseUrl + es[j].parentNode.getElementsByTagName("a")[0].getAttribute('href').split('/')[1];
              gBrowser.getBrowserForTab(gBrowser.addTab(url)).addEventListener("load", processPost, true);
              // TODO debug only, remove me
              // break;
            }
          }
        }, true);
  }

  // clean up the page remove the ads, header, footer...
  function processPost(event){
    var doc = event.originalTarget;

    // followings are from news
    removeElement(doc.getElementById('topnav'));
    removeElement(doc.getElementById('headwrapper'));
    removeElement(doc.getElementById('navwrapper'));
    removeElement(doc.getElementById('headerNavigation'));
    removeElement(doc.getElementById('bookmark'));
    removeElement(doc.getElementById('subwrapper'));
    removeElement(doc.getElementById('sidewidget'));
    removeElement(castToArray(doc.getElementsByClassName('sponsored')));

    // followings are from forums 
    removeElement(doc.getElementById('topboard'));
    removeElement(doc.getElementById('header'));
    removeElement(doc.getElementById('menubar'));
    removeElement(doc.getElementById('headerNavigation'));
    removeElement(doc.getElementById('postreply'));
    removeElement(castToArray(doc.getElementsByClassName('headerNavigation')));

    // in commen
    removeElement(doc.getElementById('footer'));
  }

  function removeElement(el){
    if(el == null)
      return false;

    if(el instanceof Array){
      for(var i = 0; i < el.length; i++) 
        el[i].parentNode.removeChild(el[i]);
    }else
      el.parentNode.removeChild(el); 
  }

  function castToArray(elements){
    return Array.filter(elements, function(e){return e});
  }

}


commands.addUserCommand(
  ["wen[xuecity]"],
  "Surfing wenxuecity.com",
  function(args){
    if (!args['-forum'] || args["-forum"].length == 0) {
        // looking for global vars in your .vimperatorrc
        var forum = typeof liberator.globalVariables.wenxuecity_forum == "undefined" ? "news gossip ent" : liberator.globalVariables.wenxuecity_forum;
    } else {
        forum = args["-forum"];
    }

    var date = new Date();
    // adjust the timezone diff
    var tzDiff = date.getTimezoneOffset() / 60;
    date.setHours(date.getHours() - tzDiff);

    if (!args["-date"] || args["-date"].length == 0) {
      date = date.toISOString().split('T')[0].replace(/-/g, '/');
    }else{
      if (args["-date"].toString().toLowerCase() == 'yesterday'){
        date.setDate(date.getDate() - 1);
        date = date.toISOString().split('T')[0].replace(/-/g, '/');
      }else
        date = date.toISOString().split('T')[0].replace(/-/g, '/');
    }
    liberator.echo(date);
    wenxuecity.load(forum, date);
  },
  {
    options: [
      [["-date", "-d"], commands.OPTION_LIST, null, [["today", "today"], ["yesterday", "yesterday"]], false],
      [["-forum", "-f"], commands.OPTION_LIST, null, [
                                                      ["joke", "难得一笑"], 
                                                      ["tv", "影视人生"], 
                                                      ["cooking", "私房小菜"], 
                                                      ["znjy", "子女教育"], 
                                                      ["music", "音乐快递"],
                                                      ["origin", "海外原创"],
                                                      ["photography", "摄影沙龙"],
                                                      ["news", "焦点新闻"],
                                                      ["ent", "娱乐新闻"],
                                                      ["gossip", "生活新闻"],
                                                      ["ZOMG", "You spend too much time on wenxuecity...(let me know what you want :-)"]
                                                     ], true]
    ]
  }
);
