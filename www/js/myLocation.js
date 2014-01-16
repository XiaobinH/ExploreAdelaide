var myLocation = {
    loc : null,
    locationChangeWatch : null,
    map : null,
    longitude: null,
    latitude : null,
    initialize : function(admap){
        this.map = admap;
        this.updateMyLocation();
        this.currentLocationWatch(5000);
    },
    updateMyLocation : function (size){
        size = typeof size !== 'undefined' ? size : 15;
        var options = {timeout: 10000};
        navigator.geolocation.getCurrentPosition(this.setCurrentLocation, this.currentLocationError, options);
    },
    setCurrentLocation : function (position){
        myLocation.latitude = position.coords.latitude;
        myLocation.longitude = position.coords.longitude;
        var radius  = 15;
        myLocation.setMyLocation(myLocation.latitude,myLocation.longitude,radius); 
        console.log("get current location : " + myLocation.latitude + "," + myLocation.longitude);
    },

    setMyLocation : function (lat,long,radius){
        if(this.loc!=null)
            this.loc.setLatLng([lat, long]);    
        else{        
            this.loc = L.circle([lat, long], radius , {
                color: 'red',
                fillOpacity: 0.5
                }).addTo(this.map.map);   
            this.loc.bindPopup('<b><label class="youAreHereText">You are here!</label></b>').openPopup();
        }
    },

    currentLocationError : function (error){
        alert("current location error" + error.message);
        console.log("current location error" + error.message);
    },
    
    currentLocationWatch : function (freq){
        this.locationChangeWatch = setInterval(this.updateMyLocation, freq);
    },

    cancelLocationWatch : function () {
        clearInterval(this.locationChangeWatch);
    }    
};