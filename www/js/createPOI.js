var poi = {
  map : null,
  pois : null,
  initialize : function(admap,filepath){
      this.map = admap;      
      this.initPOIs(filepath);
  },
  
    // one bug in json file:
    // can't have "'" in the value
    // otherwise something will go wrong
    initPOIs : function (filepath){
        var POImarkers = new Object();
        $.getJSON(filepath, function(data) {
            //get data from JSON File
            var POIs = data.POIs;        
            for (var index in data.POIs) {
                var onepoi = {
                    name:POIs[index].name,
                    latitude:POIs[index].latitude,
                    longitude:POIs[index].longitude,
                    class:POIs[index].class
                };
                POImarkers[POIs[index].class] = onepoi;
            }
            poi.pois = POImarkers;
            poi.setPOIs(POImarkers);
        });
    },

    //the parameter POImarkers should be an array of objects containing the name,latitude, longitude and class of POI.
    //then setPOIs will put the POI markers on the map
    setPOIs : function (POImarkers){
        for (var index in POImarkers){
            var markerinfo = POImarkers[index];
            console.log(markerinfo);
            var marker = L.marker([markerinfo.latitude,markerinfo.longitude]).addTo(this.map.map);
            this.pois[markerinfo['class']]['marker'] = marker;
            marker.bindPopup('<b>'+markerinfo.name[lang.language]+'</b><label><img src="img/play.png" alt="play" onclick="audio.playaudio(\''+markerinfo.class+'\')">');
        }   
    },

    createPOIContents : function (){
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
    },
    
    displayPOIsaslist : function (ul){
         var POIContents = this.createPOIContents();
         for (var content in POIContents){
              ul.append('<li style="padding: 10px;" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="c" class=" poi'+ content +' no-padding ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-a"></li>');
              var li = ul.children(".poi" + content);
              li.append('<div class="ui-btn-inner ui-li"></div>');
              var divui = li.children(".ui-li");
              divui.append('<div class="ui-btn-text"></div>');
              var textui = divui.children(".ui-btn-text");
              textui.append('<a class="link' + POIContents[content]['id'] + ' ui-link-inherit" href="'+ POIContents[content]['link'] +'"></a>');
              var a = textui.children(".link"+POIContents[content]['id']);
              a.append('<img src="'+POIContents[content]['imgsrc']+'" class="ui-li-thumb">');
              a.append('<h2 class="name'+ POIContents[content]['id'] +' ui-li-heading">'+POIContents[content]['name']+'</h2>');
              a.append('<p class="descri'+ POIContents[content]['id'] +' ui-li-desc">'+POIContents[content]['descri']+'</p>');
              divui.append('<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span>');   
        }
    },  
    
    addPOIstotakeatour : function (sel){
         for (var content in poi.pois){             
              sel.append('<option value="'+ poi.pois[content]['class'] +'">'+poi.pois[content]['name'][lang.language]+'</option>');
        }
        sel.trigger("change");
    },      
    getnearestPOI : function(long,lat){
        var answer = null;
        var dis = 6000000;
        for ( var i in this.pois){
            var temp = Math.pow(lat - this.pois[i].latitude,2) + Math.pow(long - this.pois[i].longitude,2);
             if (dis > temp){
                 dis = temp;
                 answer = i;
             }
        }
        return answer;
    }
};