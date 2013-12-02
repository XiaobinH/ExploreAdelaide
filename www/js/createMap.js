var map = L.map('map');

function initmap(apikey,uid){
    var uuid = device.uuid;    
    $.post("http://auth.cloudmade.com/token/"+apikey+"?userid="+uid+"&deviceid="+uuid,function(token,status){

            L.tileLayer("http://{s}.tile.cloudmade.com/"+apikey+"/997/256/{z}/{x}/{y}.png?token="+token, {
              maxZoom: 16,
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Imagery © <a href="http://cloudmade.com">CloudMade</a>'
            }).addTo(map);
            map.on('locationfound', onLocationFound);
            map.setView([-34.92862, 138.59996], 16);   
            map.invalidateSize();
        }
    );
}

function initmapWeb(webapikey){
    L.tileLayer('http://{s}.tile.cloudmade.com/'+webapikey+'/997/256/{z}/{x}/{y}.png', {
        maxZoom: 16,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);
    map.setView([-34.92862, 138.59996], 16);    
}
