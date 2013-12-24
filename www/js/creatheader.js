

function createMenuContents(){
    var menucontents = new Array();
    menucontents[0] = { "name": "mappage", "href":"#mappage", "class":"menumap", text: '<label class="map">Map</label>'};
    menucontents[1] = { "name": "takeatour", "href":"#takeatour", "class":"menutakeatour", text: '<label class="tourheader">Take a tour</label>'};
    menucontents[2] = { "name": "whattodo", "href":"#whattodo", "class":"menuwhattodo", text: '<label class="eventheader">What to do</label>'};
    menucontents[3] = { "name": "wheretogo", "href":"#wheretogo", "class":"menuwheretogo", text: '<label class="poiheader">Where to go</label>'};
    menucontents[4] = { "name": "setting", "href":"#setting", "class":"menusetting", text: '<label class="settingheader">Setting</label>'};
    return menucontents;
}
function createheader(page,pagename){
    
    var header =  page.children(".pageheader");
    header.attr("data-theme","b");
    
    var iconcontrol = header.children(".iconcontrol");
    iconcontrol.attr("data-icon","bars");
    iconcontrol.attr("data-iconpos","notext");
    iconcontrol.addClass("ui-btn-left ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-f");
    iconcontrol.attr("data-corners","true");
    iconcontrol.attr("data-shadow","true");
    iconcontrol.attr("data-iconshadow","true");
    iconcontrol.attr("data-wrapperels","span");
    iconcontrol.attr("data-theme","f");
    iconcontrol.attr("title","Menu");
    iconcontrol.append('<span class="ui-btn-inner"><span class="ui-btn-text">Menu</span><span class="ui-icon ui-icon-bars ui-icon-shadow">&nbsp;</span></span>');
    
    var pagepanel = page.children(".pagepanel");
    pagepanel.attr("data-position","left");
    pagepanel.attr("data-position-fixed","false");
    pagepanel.attr("data-display","reveal");
    pagepanel.attr("data-theme","a");
    pagepanel.addClass("ui-panel ui-panel-position-left ui-panel-display-reveal ui-body-a ui-panel-animate ui-panel-open");
    
    var panelcontentul = pagepanel.children(".ui-panel-inner").children(".panelcontent");
    panelcontentul.attr("data-theme","a");
    panelcontentul.attr("data-divider-theme","a");
    panelcontentul.addClass("nav-search ui-listview");   
    
    var menucontents = createMenuContents();
    for (content in menucontents){
        panelcontentul.append('<li class = "' + menucontents[content]['class']  + '"></li>');
        var li = panelcontentul.children("." + menucontents[content]['class']);
        li.attr("data-corners","false");
        li.attr("data-shadow","false");
        li.attr("data-iconshadow","true"); 
        li.attr("data-iconpos","right");
        li.attr("data-theme","a");
        li.addClass("ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-a");
        li.attr("data-corners","false");
        
        li.append('<div class="ui-btn-inner ui-li"></div>');        
        var div = li.children(".ui-li");         
        
        div.append('<a class="a' + menucontents[content]['class'] + '">' + menucontents[content]['text'] + '</a>');  
            
        var a = div.children(".a" + menucontents[content]['class']);
        a.attr("data-transition","slide");   
        a.attr("href",menucontents[content]['href']);
        a.addClass("ui-link-inherit"); 
        div.append('<span class="s' + menucontents[content]['class'] + '">&nbsp;</span>');
        var span = div.children(".s" + menucontents[content]['class']);
        span.addClass("ui-icon ui-icon-shadow ui-icon-arrow-r");
    }
    $(".amenu"+pagename,panelcontentul).attr("data-rel","close");
}