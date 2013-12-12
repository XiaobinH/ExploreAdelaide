/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var audiotextpath = "extfiles/audio.json";
var sUtt;
// the default language is english
function playaudio(classname,defaultlanguage){
    defaultlanguage = typeof defaultlanguage !== 'undefined' ? defaultlanguage : "en";
    $.getJSON(audiotextpath, function(data) {
        //get data from JSON File
        if(typeof data[classname][language] == 'undefined')
            playText(data[classname][defaultlanguage],language);
        else
            playText(data[classname][language],language);
    });
}

// by default, pitch is 1.3 and rate is 0.95
// normal pitch is 1 and normal rate is 1
function playText(text,language, pitch, rate){
    pitch = typeof pitch !== 'undefined' ? pitch : 1.3;
    rate = typeof rate !== 'undefined' ? rate : 0.95;
    sUtt.text = text;
    sUtt.lang = language;
    sUtt.pitch = pitch;
    sUtt.rate = rate;
    speechSynthesis.speak(sUtt); 
}