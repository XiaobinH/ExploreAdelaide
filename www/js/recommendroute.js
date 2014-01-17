var recomEnge = {
    distancemetric : null, 
    POIvaluemetric : null,
    POItimevector : null,
    longestdist : 2400, // longest distance is 2400, aim to regularize the penalty
    speed : 1000/15, // from google map people can walk 1 km in 15 mins, aim to regularize the penalty
    maxpenalty : null,
    coefficient : 0.3, // to adjust to effect of penalty
    tempreture : 10,// needed for the simulated annealing alogirthm
    coolrate: 0.7,  // needed for the simulated annealing alogirthm
    sroute: null,
    mroute: null,
    lroute: null,
    routeshow: null,
    routeindex: null,
    initialize : function(dfilepath,vfilepath,tfilepath){
        dfilepath = typeof dfilepath !== 'undefined' ? dfilepath : "extfiles/distance.json";
        vfilepath = typeof vfilepath !== 'undefined' ? vfilepath : "extfiles/POIvalues.json";
        tfilepath = typeof tfilepath !== 'undefined' ? tfilepath : "extfiles/POItimes.json";
        this.initializeD(dfilepath);
        this.initializeV(vfilepath);
        this.initializeT(tfilepath);
        this.maxpenalty = this.calDistPenalty(this.longestdist/this.speed);
    },
    initializeD : function(filepath){   
        $.getJSON(filepath, function(data) {
            //get data from JSON File
            recomEnge.distancemetric = data;
        });          
    },
    initializeT : function(filepath){   
        $.getJSON(filepath, function(data) {
            //get data from JSON File
            recomEnge.POItimevector = data;
            
        });          
    },
    initializeV : function(filepath){   
        $.getJSON(filepath, function(data) {
            //get data from JSON File
            recomEnge.POIvaluemetric = data;
        });          
    },
    closeRoute : function(){
        this.routeindex = null;
        this.routeshow = null;
        $(".takeatourGuide").attr( "hidden","" );
        admap.map.removeLayer(admap.tileLayer);
        admap.tileLayer.options.attribution=admap.attributionstring;
        admap.tileLayer.addTo(admap.map);        
    },
    routeNext : function(){
        if (this.routeindex < recomEnge[this.routeshow].winner.route.length-1){
            this.routeindex++;
            var classname = recomEnge[this.routeshow].winner.route[this.routeindex];
            admap.map.panTo(poi.pois[classname].marker.getLatLng());
            poi.pois[classname].marker.openPopup();
            if(audio.autoDes)
                audio.playaudio(classname);
        } else{
            alert("End of Trip!");
        }        
    },
    routeBack : function(){
        if (this.routeindex > 0){
            this.routeindex--;
            var classname = recomEnge[this.routeshow].winner.route[this.routeindex];
            admap.map.panTo(poi.pois[classname].marker.getLatLng());
            poi.pois[classname].marker.openPopup();
            if(audio.autoDes)
                audio.playaudio(classname);
        } else{
            alert("Start of Trip!");
        }          
    },    
    displayRoute : function(route){     
        if(recomEnge[route] == null)
            alert("Please Select one POI and press go");
        else{            
            var url = "#mappage";    
            $(location).attr('href',url);
            $(".takeatourGuide").removeAttr( "hidden" );
            admap.map.removeLayer(admap.tileLayer);
            admap.tileLayer.options.attribution='';
            admap.tileLayer.addTo(admap.map);
            this.routeshow = route;
            this.routeindex = 0;
            var classname = recomEnge[route].winner.route[0];           
            setTimeout(function(){
                admap.map.setView(poi.pois[classname].marker.getLatLng(),16);
                poi.pois[classname].marker.openPopup();
                if(audio.autoDes)
                    audio.playaudio(classname);
            },500);
        }   
    },
    writeToPage : function(classname, text){
        $( "." + classname + " h2" ).text(text+ ' tour : ' + Math.round(recomEnge[classname].winner.timelength) + ' mins');
        var route = '';
        for (var i = 0; i < recomEnge[classname].winner.route.length; i++){
            route += poi.pois[recomEnge[classname].winner.route[i]]['name'][lang.language];
            if ( i < recomEnge[classname].winner.route.length-1)
                route += ' --> ';
        }
        $(  "." + classname + " p" ).text(route);
    },
    recommendRoute: function(){
        var selectedPOI = $(".frommenu option:selected" ).val();
        if (selectedPOI == "nearest"){
            navigator.geolocation.getCurrentPosition(this.getCurrentLocation,myLocation.currentLocationError);
        }else{    
            recomEnge.getRoute(selectedPOI);        
            this.writeToPage("sroute","Short");   
            this.writeToPage("mroute","Regular");   
            this.writeToPage("lroute","Long");   
        }
    },
    getRoute : function(poiclass){   
        var currenttime = (new Date()).getHours()*100+(new Date()).getMinutes();
        var candidate = new createRouteCandidate([poiclass], //route list
                                            this.POIvaluemetric[poiclass][this.timeToclass(currenttime)], // route value
                                            this.POItimevector[poiclass], // route length
                                            this.timeSumUp(currenttime,this.POItimevector[poiclass])  ); // route end time
       
        var candidates = [];
        candidates.push(candidate);
       
        var allRouteNoChange = false, evaluate = [], sroute, mroute, lroute;
        evaluate.push( this.sroute = new createRoute(candidate,120));
        evaluate.push( this.mroute = new createRoute(candidate,180));
        evaluate.push( this.lroute = new createRoute(candidate,240)); 
        while(!allRouteNoChange){             
            //create new candicates
            var newcandidates = [];
            for(var index in candidates){       
                newcandidates = newcandidates.concat(this.addonePOI(candidates[index]));
            }
            newcandidates.sort(compareRouteValue);
            //update evaluate with newcandidates
            this.updateEvaluate(newcandidates,evaluate);
            //get only 10 candidcates for the next loop
           candidates = this.updateCandidates(newcandidates,10,3);
            // routes don't need to update if it reachs the time limitation, AKA no change for two times
            for(var i = evaluate.length; i > 0; i--)
                if(evaluate[i-1].timesnochange >= 2)
                    evaluate.splice(i-1,1);
            if(evaluate.length==0)
                allRouteNoChange=true;
        }
        var result = [];
        result.push(sroute);
        result.push(mroute);
        result.push(lroute);
        return result;
    },
    updateCandidates: function(newcandidates,total,bestnum){    
        // bestnum are the best solutions for now
        // the rest are from simulated annealing algorithm
        var candidates = [];
        if(newcandidates.length != 0)
            var highestv = newcandidates[0].value;
        if (newcandidates.length <= total)
            candidates = newcandidates;
        else{
            //the best
            candidates = newcandidates.slice(0,bestnum);
            //the rest
            var restnum = total-bestnum;
            var num = newcandidates.length;
            var i = 0;
            while(restnum!=0){
                var properbility = Math.exp(-(highestv - newcandidates[i].value)/this.tempreture);
                if (Math.random() <= properbility){
                    candidates.push(newcandidates.splice(i,1)[0]);
                    restnum--;
                }
                num++;
                if(num>=newcandidates.length)
                    num=0;
            }
        }
        return candidates;
    },
    updateEvaluate: function(newcandidates,evaluate){    
        // assert newcandidates is in an descending order 
        // evaluate is an array of routes that need updating
        var needupdates = [];
        for(var i in evaluate){
            needupdates.push(i);
        }        
        var cani = 0
        while(needupdates.length != 0 && newcandidates.length != 0){
            for(var i = needupdates.length; i > 0; i--){
                if(evaluate[needupdates[i-1]].winner.value < newcandidates[cani].value 
                        && evaluate[needupdates[i-1]].length >= newcandidates[cani].timelength){
                    evaluate[needupdates[i-1]].winner = newcandidates[cani];
                    needupdates.splice(i-1, 1);
                }
            }
            cani++;
            if(cani >= newcandidates.length){
                break;
            }
        }
        // update route timesnochange property
        // if change, set to 0; else plus 1
        for(var i in evaluate){
            if($.inArray(i, needupdates)==-1)
                evaluate[i].timesnochange=0;//change
            else
                evaluate[i].timesnochange++;// no change
        }
    },
    calDistPenalty : function(x){
        //use penalty function: 
        //y = { x, if x <5              the penalty increases regularly in the first 5 mins
        //      (x-5)*0.3+5, if 5<x<10  the penalty increases slowly in the second 5 mins
        //      (x-10)*2+6.5, if 10<x } the penalty increases rapidly from 10 mins
        var penalty;
        if (x < 5)
            penalty = x;
        else if (x < 10)
            penalty = (x-5)*0.3+5;
        else
            penalty = (x-10)*2+6.5;
        return penalty;
    },
    calDistTime : function(a,b){                
        return this.distancemetric[a][b]/this.speed;
    },
    addonePOI : function(candidate){
        var newcandidates = [];
        var nextpois = [];
        for(var key in this.POItimevector){
            if($.inArray(key, candidate.route)==-1)
                nextpois.push(key);
        }
        for(var poi in nextpois){
            var newcandidate = jQuery.extend(true, {}, candidate);            
            //add penalty and time of walking
            newcandidate.route;
            newcandidate.route.length-1;
            var walkingtime = this.calDistTime(newcandidate.route[newcandidate.route.length-1],nextpois[poi]);
            var penalty = this.penaltyReg( this.calDistPenalty(walkingtime) );
            newcandidate.value -= this.coefficient*penalty;
            newcandidate.timelength += walkingtime;
            newcandidate.time = this.timeSumUp(newcandidate.time,walkingtime);            
            // add value and time of poi
            newcandidate.value += this.POIvaluemetric[nextpois[poi]][this.timeToclass(newcandidate.time)];
            newcandidate.timelength += this.POItimevector[nextpois[poi]];
            newcandidate.time = this.timeSumUp(newcandidate.time,this.POItimevector[nextpois[poi]]);            
            // add poi
            newcandidate.route.push(nextpois[poi]);
            newcandidates.push(newcandidate);
        }
        return newcandidates;
    },
    penaltyReg : function(penalty){         
        // regularize the penalty to range 0 - 10, which is the same to the poi value    
        return penalty*(10/this.maxpenalty); 
    },
    //map the time to the class
    // 2200-559 --> late-evening
    // 600-859 --> early-morning
    // 900-1159 --> morning
    // 1200-1659 --> afternoon
    // 1700-2159 --> evening
    timeToclass : function(time){
        if (time>= 2200 || time < 600)
            return ('late-evening');
        else if (time>= 600 && time < 900)
            return ('early-morning');
        else if (time>= 900 && time < 1200)
            return ('morning');
        else if (time>= 1200 && time < 1700)
            return ('afternoon');
        else if (time>= 1700 && time < 2200)
            return ('evening');
        else
            alert('timeToClass error');
    },
    // add the timelength to the time to get the predicted time. format:hhmm
    timeSumUp : function(time, timelength){
        var hs = parseInt(time/100);
        var mins = time%100;
        var minstotal = mins + timelength;
        var hoursadd = parseInt(minstotal/60);
        var minsadd = minstotal%60;
        return ((hs+hoursadd)*100 + minsadd)%2400;
    },
    getCurrentLocation : function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;    
        var selectedPOI = poi.getnearestPOI(longitude,latitude);
        recomEnge.getRoute(selectedPOI);        
        recomEnge.writeToPage("sroute","Short");   
        recomEnge.writeToPage("mroute","Regular");   
        recomEnge.writeToPage("lroute","Long");  
    }
};

function createRoute(winner,length){
    this.winner = winner;
    this.length = length;
    this.timesnochange = 0;
}

function createRouteCandidate(route,value,timelength,time){
    this.route = route;
    this.value = value;
    this.timelength = timelength;
    this.time = time;     
}

function compareRouteValue(a,b) {
  return -(a.value - b.value);
}

//function loaddistancemetric() {        
//     jQuery.ajax({
//         url:    'distance.txt',
//         success: function(textFile) {
//                createdistancemetric(textFile);
//                },
//         datatype: 'text',
//         async:   false
//    });          
//}
//
//function createdistancemetric(textFile){
//    var allLines = textFile.split(/\r\n|\n/);
//    var indexname = [];
//    indexname = allLines[0].split('\t');
//    var jsonobj = {};
//    for(var lineCount = 1; lineCount < allLines.length ; lineCount++){
//        var temp = allLines[lineCount].split('\t');
//        jsonobj[temp[0]] = {};
//        for(var num = 1; num < temp.length ; num++){
//            jsonobj[temp[0]][indexname[num-1]] = Number(temp[num]);
//        }
//    }
//    console.log(JSON.stringify(jsonobj));
//}
//
//function createtimevector(textFile){
//    var allLines = textFile.split(/\r\n|\n/);
//    var jsonobj = {};
//    for(var lineCount = 0; lineCount < allLines.length ; lineCount++){
//            var temp = allLines[lineCount].split('\t');
//            jsonobj[temp[0]] = Number(temp[1]);
//    }
//    console.log(JSON.stringify(jsonobj));
//}
