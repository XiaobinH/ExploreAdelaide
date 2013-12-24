var audio = {
    
    audiotextpath : '',
    
    sUtt : null,   
    
    initialize: function(audiotextpath) {
        audiotextpath = typeof audiotextpath !== 'undefined' ? audiotextpath : "extfiles/audio.json";
        this.audiotextpath = audiotextpath;
        this.sUtt = new SpeechSynthesisUtterance();
    },
    
    // the default language is english
    playaudio: function(classname,defaultlanguage){
        var language = lang.language;
        defaultlanguage = typeof defaultlanguage !== 'undefined' ? defaultlanguage : "en";
        $.getJSON(this.audiotextpath, function(data) {
            //get data from JSON File
            if(typeof data[classname][language] == 'undefined')
                audio.playText(data[classname][defaultlanguage],language);
            else
                audio.playText(data[classname][language],language);
        });
    },
    
    // by default, pitch is 1.3 and rate is 0.95
    // normal pitch is 1 and normal rate is 1
    playText: function(text,language, pitch, rate){
        pitch = typeof pitch !== 'undefined' ? pitch : 1.3;
        rate = typeof rate !== 'undefined' ? rate : 0.95;
        this.sUtt.text = text;
        this.sUtt.lang = language;
        this.sUtt.pitch = pitch;
        this.sUtt.rate = rate;
        speechSynthesis.speak(this.sUtt); 
    }    
};