/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createPOIContents(){
    var POIContents = new Array();
    POIContents[0] = { "name": "CMU", "descri":"CMU is a good school", "loc":"Victoria Square", "imgsrc": "img/apple.png", "link": "#", "id" : "poiCMU"};
    POIContents[1] = { "name": "Central Market", "descri":"Big Sale", "loc":"Central Market", "imgsrc": "img/apple.png", "link": "#", "id" : "poiCen"};
    POIContents[2] = { "name": "Finder Univeristy", "descri":"Not bad", "loc":"Victoria Square", "imgsrc": "img/apple.png", "link": "#", "id" : "poiFin"};
    POIContents[3] = { "name": "UCL", "descri":"kind of small", "loc":"Victoria Square", "imgsrc": "img/apple.png", "link": "#", "id" : "poiUCL"};
    POIContents[4] = { "name": "CMU", "descri":"CMU is a good school", "loc":"Victoria Square", "imgsrc": "img/apple.png", "link": "#", "id" : "poiCMU"};
    POIContents[5] = { "name": "Central Market", "descri":"Big Sale", "loc":"Central Market", "imgsrc": "img/apple.png", "link": "#", "id" : "poiCen"};
    POIContents[6] = { "name": "Finder Univeristy", "descri":"Not bad", "loc":"Victoria Square", "imgsrc": "img/apple.png", "link": "#", "id" : "poiFin"};
    POIContents[7] = { "name": "UCL", "descri":"kind of small", "loc":"Victoria Square", "imgsrc": "img/apple.png", "link": "#", "id" : "poiUCL"};
    
    return POIContents;
}


function createPOIs(ul){
     var POIContents = createPOIContents();
     for (content in POIContents){
          ul.append('<li style="padding: 10px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class=" poi'+ content +' no-padding ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a"></li>');
          var li = ul.children(".poi" + content);
          li.append('<div class="ui-btn-inner ui-li"></div>');
          var divui = li.children(".ui-li");
          divui.append('<div class="ui-btn-text"></div>');
          var textui = divui.children(".ui-btn-text");
          textui.append('<a class="link' + POIContents[content]['id'] + ' ui-link-inherit" href="'+ POIContents[content]['link'] +'"></a>');
          var a = textui.children(".link"+POIContents[content]['id']);
          //a.append('<p class="loc'+ POIContents[content]['id'] +' ui-li-aside ui-li-desc">'+POIContents[content]['loc']+'</p>');
          a.append('<img src="'+POIContents[content]['imgsrc']+'" class="ui-li-thumb">');
          a.append('<h2 class="name'+ POIContents[content]['id'] +' ui-li-heading">'+POIContents[content]['name']+'</h2>');
          a.append('<p class="descri'+ POIContents[content]['id'] +' ui-li-desc">'+POIContents[content]['descri']+'</p>');
          divui.append('<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>');           
          divui.addClass('tap'); // for testing the tap event
    }
}