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
});

function onLocationFound(e) {
    alert(e.message);
}

function onLocationError(e) {
    alert(e.message);
}