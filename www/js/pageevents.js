$(document).on('pageinit', '#whattodo', function(){  
    adEvent.createEvents($('#eventsul'));
});

$(document).on('pageinit', '#wheretogo', function(){  
    poi.displayPOIsaslist($('.POIul'));
});

$(document).on('pageinit', '#takeatour', function(){  
    poi.addPOIstotakeatour($('.frommenu'));
    //poi.addPOIstotakeatour($('.tomenu'));    
    recomEnge.initialize('extfiles/distance.json','extfiles/POIvalues.json','extfiles/POItimes.json');
});

$(document).ready(function() {
    setTakeatourGuidePos();
    bindLanguageChangeEvent();
    panelCloseEventDetect();        
    admap.initmapWeb('c9a19f8807a64735aff2c22833d6817a',-34.92862, 138.59996, 14);
    poi.initialize(admap,"extfiles/POIs.json");  
});

function setTakeatourGuidePos(){
    var windHeight = document.documentElement.clientHeight;
    var footerHeight = $(".takeatourGuidelayout").height();
    $(".takeatourGuide").css({top: windHeight-2*footerHeight-15});
    $(".takeatourGuide").attr( "hidden","" );
}
function bindLanguageChangeEvent(){    
    $( ".languagemenu" ).change(function () {  
        var selectedLang = $(".languagemenu option:selected" ).val();
        lang.setlanguage(selectedLang);
        textdisplay.changeLabels();
    });
}

function panelCloseEventDetect(){    
    $( ".pagepanel" ).on( "swipeleft", function(event){
        $( event.target ).panel( "close" );
    } );
    $( ".pagepanel" ).on( "tap", function(event){
        $( event.target ).panel( "close" );
    } );
}