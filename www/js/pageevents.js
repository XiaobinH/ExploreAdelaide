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
/*
function bindPanelOpenEvent(){
    alert(1);
    $( ".pagepanel" ).on( "open", bindBodySwipeLeftEvent );
    alert(2);
}

function bindPanelCloseEvent(){
    alert(3);
    $( ".pagepanel" ).on( "close", unbindBodySwipeLeftEvent );
    alert(4);
}

function bindBodySwipeLeftEvent(){
    alert('bindBodySwipeLeftEvent');
    $( ".pages" ).on( "swipeleft", function(event){
        alert('body');
        $(".pagepanel").panel( "close" );
    } );    
}

function unbindBodySwipeLeftEvent(){
    alert('unbindBodySwipeLeftEvent');
    $( ".pages" ).off( "swipeleft", function(event){
        alert('unbody');
    } );    
}*/