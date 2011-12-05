var wenxuecity = {};

wenxuecity.url = "www.wenxuecity.com";

//{fourm: [[forum_home_url, forum_post_base_url]]}
wenxuecity.forums = {
  news:   [wenxuecity.url + "/news", wenxuecity.url + "/news/"],
  gossip: [wenxuecity.url + "/news/gossip", wenxuecity.url], 
  ent:    [wenxuecity.url + "/news/ent", wenxuecity.url],
  joke:   ['joke']
};

wenxuecity.load = function(forums, date){

  loadHomePages();

  // I will leave the home pages open
  function loadHomePages(){
    // add a new tab and make it active(current)
    gBrowser.selectedTab = gBrowser.addTab(wenxuecity.url);

    forums = forums.split('|')
    for(var i = 0; i < forums.length; i++){
      forumHomePage(wenxuecity.forums[forums[i]][0], wenxuecity.forums[forums[i]][1]);
    }
  }

  function forumHomePage(forumHomeUrl, baseUrl){
    gBrowser.getBrowserForTab(gBrowser.addTab(forumHomeUrl + '/1')).addEventListener("load", 
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

  // clean up the page remove the ads, header, footer...
  function processPost(event){
    // var doc = postBrowser.contentDocument;
    var doc = event.originalTarget;
    removeElement(doc.getElementById('topnav'));
    removeElement(doc.getElementById('headwrapper'));
    removeElement(doc.getElementById('navwrapper'));
    removeElement(doc.getElementById('headerNavigation'));
    removeElement(doc.getElementById('bookmark'));
    removeElement(doc.getElementById('subwrapper'));
    removeElement(doc.getElementById('sidewidget'));
    removeElement(doc.getElementsByClassName('sponsored')[0]);
    removeElement(doc.getElementById('footer'));
  }

  function removeElement(el){
    if(el == null)
      return false;

    el.parentNode.removeChild(el); 
  }

}


commands.addUserCommand(
  ["wen[xuecity]"],
  "Surfing wenxuecity.com",
  function(args){
    if (!args['-forum'] || args["-forum"].length == 0) {
        // looking for global vars in your .vimperatorrc
        var forum = typeof liberator.globalVariables.wenxuecity_forum == "undefined" ? "news|gossip|ent" : liberator.globalVariables.wenxuecity_forum;
    } else {
        forum = args["-forum"];
    }

    var date = new Date();
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
      [["-forum", "-f"], commands.OPTION_LIST, null, null, true]
    ]
  }
);
