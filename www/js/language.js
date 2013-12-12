/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var language = 'default';
var supportedlang = {
	"Spanish":"es",
        "English":"en"
};

// call this function as soon as the device is ready    
function setAppLanguage(){
    navigator.globalization.getPreferredLanguage(
        function (langobj) {setlanguage(langobj.value);},
        function () {setdefaultlanguage();});        
}


function setlanguage(lang){    
    if(typeof supportedlang[lang] == 'undefined'){        
        console.log('not support '+lang);       
        setdefaultlanguage();
    }
    else{        
        language = supportedlang[lang];
        console.log('set language '+lang);
    }
}

function setdefaultlanguage(){
    language = supportedlang['English'];
    console.log('set default language');
}

function bindLanguageChangeEvent(){    
    $( ".languagemenu" ).change(function () {  
        var selectedLang = $(".languagemenu option:selected" ).val();
        setlanguage(selectedLang);
    });
}