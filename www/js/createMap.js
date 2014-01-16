var admap = {
    map : L.map('map'),
    initmap : function (apikey,uid,latitude,longitude,zoomlevel){
        var uuid = device.uuid;    
        $.post("http://auth.cloudmade.com/token/"+apikey+"?userid="+uid+"&deviceid="+uuid,function(token,status){   
                admap.tileLayer = L.tileLayer("http://{s}.tile.cloudmade.com/"+apikey+"/997/256/{z}/{x}/{y}.png?token="+token, {
                  maxZoom: 16,
                  attribution: admap.attributionstring
                });
                admap.tileLayer.addTo(admap.map);
                admap.map.on('locationfound', onLocationFound);
                admap.map.setView([latitude, longitude], zoomlevel);   
                admap.map.invalidateSize();
            }
        );
    },
    initmapWeb: function (webapikey,latitude,longitude,zoomlevel){
        admap.tileLayer = L.tileLayer('http://{s}.tile.cloudmade.com/'+webapikey+'/997/256/{z}/{x}/{y}.png', {
            maxZoom: 16,
            attribution: this.attributionstring
        });
        admap.tileLayer.addTo(admap.map);
        admap.map.setView([latitude, longitude], zoomlevel); 
    },
    tileLayer: null,
    attributionstring: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> Imagery © <a href="http://cloudmade.com">CloudMade</a>'
};     