
var dictionary = {
        "maplink":{"en":"Map", "es":"mapa"},
	"mapheader":{"en":"Explore Adelaide", "es":"Explora Adelaide"},
        "tourheader":{"en":"Take a tour", "es":"Haga un recorrido"},
        "eventheader":{"en":"what to do", "es":"Qué hacer"},
        "poiheader":{"en":"where to go", "es":"dónde ir"},
        "settingheader":{"en":"Setting", "es":"ajuste"},
        "languageText":{"en":"Language", "es":"idioma"},
        "eventNotificationsSetting":{"en":"Event Notification", "es":"notificación de eventos"},
        "autoDescriptionSetting":{"en":"Auto Description", "es":"Auto Descripción"},
        "totext":{"es":"a", "en":"to"},
        "fromtext":{"es":"desde", "en":"from"}        
};

var textdisplay = {
    
    dictionary: null,
    lang: null,
    
    initialize: function(dictionary, lang){
        if (typeof dictionary == 'undefined' || typeof lang == 'undefined'){
            alert("cannot launch multi language");
            console.log('cannot launch multi language'); 
        }
        this.dictionary = dictionary;
        this.lang = lang;
    },
    
    changeLabels: function (){
        $("label").each(function(){
            var classname = $(this).attr("class");
            if(typeof textdisplay.dictionary[classname] != 'undefined'){
                var langtemp = textdisplay.lang.language;
                    if(textdisplay.dictionary[classname][langtemp])
                         $(this).text(textdisplay.dictionary[classname][langtemp]);
             }
        });
    }
};