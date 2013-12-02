/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$( ".todocontent" )
  .mouseenter(function() {
    $( this ).css({color:"red"});
  });
$( ".todocontent" ).mouseleave(function() {
    $( this ).css({color:"black"});
  });

$( ".hover" ).hover(function() {
  $( this ).fadeOut( 100 );
  $( this ).fadeIn( 500 );
});

$( ".dblclick" ).dblclick(function() {
    alert("Events are under construction!");
});

$( ".tap" ).tap(function() {
  alert("POI is under construction!");
});

$( ".taphold" ).bind( "taphold", tapholdHandler );
 
function tapholdHandler( event ){
    alert("Map is under construction!");
}

$( window ).on( "orientationchange", function( event ) {
//    var uuid = device.uuid;    
//    alert(uuid);
//    $.post("http://auth.cloudmade.com/token/d123a9c35892443a9f9b7f35b2922043?userid=1&deviceid="+uuid,function(token,status){
//            alert("Data: " + token + "\nStatus: " + status);
//            var http = 'http://{s}.tile.cloudmade.com/d123a9c35892443a9f9b7f35b2922043/997/256/{z}/{x}/{y}.png?token='+token;
//                        alert(http);
//                        L.tileLayer(http, {
//                          maxZoom: 16,
//                          attribution: 'Example made by <a href="http://www.gajotres.net">Gajotres</a>'
//                        }).addTo(map);
//                       map.on('locationfound', onLocationFound);
//                       map.setView([-34.92862, 138.59996], 16);   
////                       alert(3);
////                       var ht2 = "http://b.tile.cloudmade.com/d123a9c35892443a9f9b7f35b2922043/1/256/15/17599/10746.png?token="+token;
////                       alert(ht2);
////                       window.open(ht2);  
//                    alert($('#map').height());
//                    alert($('#map').width());
//                    map.invalidateSize();
//        }
//    );
});

function onLocationFound(e) {
    alert(e.message);
}

function onLocationError(e) {
    alert(e.message);
}