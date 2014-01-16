var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //initmap("d123a9c35892443a9f9b7f35b2922043",1); // from createMap.js
        lang.initialize();
        audio.initialize('extfiles/audio.json');
        adEvent.initialize('exploreadelaide','srr5x5ghcgtt');
        textdisplay.initialize(dictionary,lang);
        admap.initmapWeb('c9a19f8807a64735aff2c22833d6817a',-34.92862, 138.59996, 14);
        poi.initialize(admap,"extfiles/POIs.json");
        myLocation.initialize(admap);
        app.receivedEvent('deviceready');        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    },
};