var map = L.map('map');
var myLocation = null;
var locationChangeWatch = null;

function initmap(apikey,uid,latitude,longitude,zoomlevel){
    var uuid = device.uuid;    
    $.post("http://auth.cloudmade.com/token/"+apikey+"?userid="+uid+"&deviceid="+uuid,function(token,status){
            L.tileLayer("http://{s}.tile.cloudmade.com/"+apikey+"/997/256/{z}/{x}/{y}.png?token="+token, {
              maxZoom: 16,
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Imagery © <a href="http://cloudmade.com">CloudMade</a>'
            }).addTo(map);
            map.on('locationfound', onLocationFound);
            map.setView([latitude, longitude], zoomlevel);   
            map.invalidateSize();
        }
    );
}

function initmapWeb(webapikey,latitude,longitude,zoomlevel){
    L.tileLayer('http://{s}.tile.cloudmade.com/'+webapikey+'/997/256/{z}/{x}/{y}.png', {
        maxZoom: 16,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);
    map.setView([latitude, longitude], zoomlevel); 
}

// one bug in json file:
// can't have "'" in the value
// otherwise something will go wrong
function initPOIs(filepath){
    var POImarkers = [];
    $.getJSON(filepath, function(data) {
        //get data from JSON File
        var POIs = data.POIs;        
        for (var index in data.POIs) {
            var poi = {
                name:POIs[index].name,
                latitude:POIs[index].latitude,
                longitude:POIs[index].longitude,
                class:POIs[index].class
            };
            POImarkers.push(poi);
        }
        setPOIs(POImarkers);
    });
}

//the parameter POImarkers should be an array of objects containing the name,latitude, longitude and class of POI.
//then setPOIs will put the POI markers on the map
function setPOIs(POImarkers){
    for (var index in POImarkers){
        var markerinfo = POImarkers[index];
        var marker = L.marker([markerinfo.latitude,markerinfo.longitude]).addTo(map);
        marker.bindPopup('<b>'+markerinfo.name+'</b><img src="img/play.png" alt="play" onclick="audio.playaudio(\''+markerinfo.class+'\')">');
    }   
}

function updateMyLocation(size){
    size = typeof size !== 'undefined' ? size : 15;
    var options = {timeout: 10000};
    navigator.geolocation.getCurrentPosition(setCurrentLocation, currentLocationError, options);
}

function setCurrentLocation(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var radius  = 15;
    setMyLocation(lat,long,radius); 
    console.log("get current location : " + lat + "," + long);
}

function setMyLocation(lat,long,radius){
    if(myLocation!=null)
        myLocation.setLatLng([lat, long]);    
    else{        
        myLocation = L.circle([lat, long], radius , {
            color: 'red',
            fillOpacity: 0.5
            }).addTo(map);   
        myLocation.bindPopup('<b><label class="youAreHereText">You are here!</label></b>').openPopup();
    }
}

function currentLocationError(error){
    alert("current location error" + error.message);
    console.log("current location error" + error.message);
}
function currentLocationWatch(freq){
    locationChangeWatch = setInterval(updateMyLocation, freq);
}

function cancelLocationWatch() {
    clearInterval(locationChangeWatch);
}