var adEvent = {
    
    initialize: function(eventfindername, eventfindernamepsd){
        this.username = eventfindername;
        this.password = eventfindernamepsd;
    },    
    username: null,
    password: null,
    
    createEvents: function (ul){
        $.ajax({
            url: 'http://api.eventfinder.com.au/v2/events.json?rows=10&location_slug=adelaide-cbd&fields=event:(name,description,location_summary,address,datetime_summary,sessions,images,url),session:(datetime_start)',
            type: 'GET',
            dataType: 'json',
            username: adEvent.username,
            password: adEvent.password,
            success: function(data) { 
                $(".eventnotification").attr( "hidden","" );
                var eventContents = adEvent.extractEvents(data); 
                adEvent.displayEvents(eventContents,ul) 
            },
            error: function(data) { alert(JSON.stringify(data)); }
        });     
    },

    //one event example { "name": "CMU", "descri":"CMU is a good school", "loc":"Victoria Square", "imgsrc": "img/apple.png", "link": "#", "id" : "poiCMU"};
    // delete some contents if the speed is too slow
    extractEvents: function (data){
         var result = eval(data); 
         var rawEvents = result.events;
         var eventContents = new Array();
         for( var i in rawEvents){
             var name = rawEvents[i].name;
             var descri = rawEvents[i].description;
             var loc = rawEvents[i].location_summary;
             var imgDetails = rawEvents[i].images.images[0];
             var imgsrc = imgDetails.transforms.transforms[1].url;
             var link = rawEvents[i].url;
             var id = 'adEvent';
             var time = rawEvents[i].datetime_summary;
             eventContents.push({
                 name:name,
                 descri:descri,
                 loc:loc,
                 imgsrc:imgsrc,
                 link:link,
                 id:id,
                 time:time,             
             });
         }     
         return eventContents;
    },
    displayEvents: function (eventContents,ul){        
         for (var content in eventContents){
              ul.append('<li style="padding: 10px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" class=" poi'+ content +' no-padding ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a"></li>');
              var li = ul.children(".poi" + content);
              li.append('<div class="ui-btn-inner ui-li"></div>');
              var divui = li.children(".ui-li");
              divui.append('<div class="ui-btn-text"></div>');
              var textui = divui.children(".ui-btn-text");
              textui.append('<a class="link' + eventContents[content]['id'] + ' ui-link-inherit"  href="#" onclick="window.open(\'' + eventContents[content]['link'] + '\', \'_system\', \'location=yes\')"></a>');
              //alert('<a class="link' + eventContents[content]['id'] + ' ui-link-inherit" onclick="window.open(\'' + eventContents[content]['link'] + '\', \'_system\', \'location=yes\')"></a>');
              var a = textui.children(".link"+eventContents[content]['id']);
              //a.append('<p class="loc'+ POIContents[content]['id'] +' ui-li-aside ui-li-desc">'+POIContents[content]['loc']+'</p>');
              a.append('<img src="'+eventContents[content]['imgsrc']+'" class="ui-li-thumb">');
              a.append('<h2 class="name'+ eventContents[content]['id'] +' ui-li-heading">'+eventContents[content]['name']+'</h2>');
              a.append('<p class="descri'+ eventContents[content]['id'] +' ui-li-desc">'+eventContents[content]['descri']+'</p>');
              a.append('<p class="time'+ eventContents[content]['id'] +' ui-li-desc">'+eventContents[content]['time']+'</p>');
              divui.append('<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>');    
        }
    }    
};




