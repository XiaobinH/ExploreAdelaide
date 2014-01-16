var lang = {
    initialize: function(language,supportedlang) {
        language = typeof language !== 'undefined' ? language : "es";
        supportedlang = typeof supportedlang !== 'undefined' ? supportedlang : {"español":"es",
                                                                                "English":"en",
                                                                                "Spanish":"es"};
        this.language = language;
        this.supportedlang = supportedlang;
        this.setAppLanguage();
    },

    language: 'en',

    supportedlang : {},
    
    setAppLanguage : function (){
        var temp = this;
        navigator.globalization.getPreferredLanguage(
            function (langobj) {temp.setlanguage(langobj.value);},
            function () {temp.setdefaultlanguage();});        
    },
    
    setlanguage: function (lang){    
        if(typeof this.supportedlang[lang] == 'undefined'){        
            console.log('not support '+lang);       
            this.setdefaultlanguage();
        }
        else{        
            this.language = this.supportedlang[lang];
            console.log('set language '+lang);
        }
    },
    
    setdefaultlanguage: function (){
        this.language = this.supportedlang['English'];
        console.log('set default language');
    },    
};