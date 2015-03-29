// ==UserScript==
// @name         OSM Fast Tactic Setter
// @namespace    OSM.Tactic.Setter
// @version      0.4
// @downloadURL  https://github.com/Sycareus/OSM-FastTactic/blob/master/main.user.js
// @updateURL    https://github.com/Sycareus/OSM-FastTactic/blob/master/main.user.js
// @description  Etablir rapidement quelques tactiques prédéfinies sur OSM
// @author       Sycarus
// @include      http://*.onlinesoccermanager.com/Team/Tactic
// @grant        GM_addStyle
// ==/UserScript==

// trouvable sur http://pastebin.com/p1k3p3UF  (v0.1)

/* Variables contenant les tactiques :
 * Note :
 * 0, 1, 2, 3 : style : mod, norm, agr, tor
 * 0, 1, 2, 3, 4 : mode : lb, p10, ailes, ca, tdl
 * 0, 1, 2 : lignes : def, mil, att
 * marking : true si indi, false si zone
 * hj : true si oui, false si non
*/

var t442 = {
    style: 2,
    compo: 2,
    att: 2,
    mil: 1,
    def: 0,
    marking: false,
    hj: false,
    mental: 65,
    tempo: 70,
    pressing: 35
};

var t451 = {
    style: 2,
    compo: 4,
    att: 0,
    mil: 0,
    def: 0,
    marking: false,
    hj: false,
    mental: 45,
    tempo: 70,
    pressing: 30
};

var t433 = {
    style: 2,
    compo: 2,
    att: 2,
    mil: 2,
    def: 0,
    marking: true,
    hj: false,
    mental: 80,
    tempo: 85,
    pressing: 70
};

var t4231 = {
    style: 1,
    compo: 1,
    att: 2,
    mil: 1,
    def: 0,
    marking: false,
    hj: false,
    mental: 60,
    tempo: 70,
    pressing: 60
};

var tperdre = {
    style: 0,
    compo: 0,
    att: 2,
    mil: 2,
    def: 2,
    marking: true,
    hj: true,
    mental: 0,
    tempo: 0,
    pressing: 0
};

var tgagner = {
    style: 1,
    compo: 2,
    att: 2,
    mil: 1,
    def: 0,
    marking: false,
    hj: false,
    mental: 70,
    tempo: 75,
    pressing: 72
};


// creation des variables contenant de bouton de tactiques :

var titre = document.createElement("p");
titre.innerHTML = "Tactiques";
titre.className = "customGreenButton";

var b1 = document.createElement("input");
b1.type = "button";
b1.value = "4-4-2";
b1.onclick = function(){us_sendTactic(t442);};
b1.className = "customGreenButton";
b1.setAttribute("style", "width:136px;text-align:center;font-size:17px;margin-top:7px;");

var b2 = document.createElement("input");
b2.type = "button";
b2.value = "4-5-1";
b2.onclick = function(){us_sendTactic(t451);};
b2.className = "customGreenButton";
b2.setAttribute("style", "width:136px;text-align:center;font-size:17px;margin-top:10px;");

var b3 = document.createElement("input");
b3.type = "button";
b3.value = "4-3-3";
b3.onclick = function(){us_sendTactic(t433);};
b3.className = "customGreenButton";
b3.setAttribute("style", "width:136px;text-align:center;font-size:17px;margin-top:10px;");

var b4 = document.createElement("input");
b4.type = "button";
b4.value = "4-2-3-1";
b4.onclick = function(){us_sendTactic(t4231);};
b4.className = "customGreenButton";
b4.setAttribute("style", "width:136px;text-align:center;font-size:17px;margin-top:10px;");

var perdre = document.createElement("input");
perdre.type = "button";
perdre.value = "Perdre - Battle";
perdre.onclick = function(){us_sendTactic(tperdre);};
perdre.className = "customGreenButton";
perdre.setAttribute("style", "width:136px;font-size:17px;margin-top:15px;");

var gagner = document.createElement("input");
gagner.type = "button";
gagner.value = "Gagner - Battle";
gagner.onclick = function(){us_sendTactic(tgagner);};
gagner.className = "customGreenButton";
gagner.setAttribute("style", "width:137px;font-size:17px;margin-top:10px;");

var recup = document.createElement("input");
recup.type = "button";
recup.value = "RecupTact";
recup.onclick = us_getTactic;
recup.className = "customGreenButton";
recup.setAttribute("style", "width:136px;text-align:center;font-size:17px;margin-bottom:5px;margin-top:15px;");


// creation des divs conteneurs de la tactique

var transp = document.createElement("div");
transp.className = "frameContent transparentContent";

var CI = document.createElement("div");
CI.className = "frameContentImages";

var TL = document.createElement("div");
TL.className = "frameContentTopLeft blue";

var TM = document.createElement("div");
TM.className = "frameContentTopMiddleSidebar blue";

var TR = document.createElement("div");
TR.className = "frameContentTopRight blue";

var contentHolder = document.createElement("div");
contentHolder.className = "frameContentHolder noPadding";

var contentContainer = document.createElement("div");
contentContainer.className = "frameContentContainer";

var titleSB = document.createElement("div");
titleSB.className = "divAssistantSidebar";

var contentSB = document.createElement("div");
contentSB.className = "divAssistantSidebarContent";

var bottom = document.createElement("div");
bottom.className = "divAssistantSidebarBottom";


// on ajoute les elements du DOM les uns dans les autres

transp.appendChild(CI);
transp.appendChild(contentHolder);

TM.innerHTML = '<span class="frameContentTopTitle">Tactiques</span>';
CI.appendChild(TR);
CI.appendChild(TM);
CI.appendChild(TL);
contentHolder.appendChild(contentContainer);
contentContainer.appendChild(contentSB);
contentContainer.appendChild(bottom);


// on ajoute nos boutons aux conteneurs

contentSB.appendChild(b1);
contentSB.appendChild(b2);
contentSB.appendChild(b3);
contentSB.appendChild(b4);
contentSB.appendChild(perdre);
contentSB.appendChild(gagner);
contentSB.appendChild(recup);

// et on ajoute tout ça à la page web
document.getElementById('divSidebarRight').appendChild(transp);


//creation des divs du curseur
var transp2 = document.createElement("div");
transp2.className = "frameContent transparentContent";

var CI2 = document.createElement("div");
CI2.className = "frameContentImages";

var TL2 = document.createElement("div");
TL2.className = "frameContentTopLeft blue";

var TM2 = document.createElement("div");
TM2.className = "frameContentTopMiddleSidebar blue";

var TR2 = document.createElement("div");
TR2.className = "frameContentTopRight blue";

var contentHolder2 = document.createElement("div");
contentHolder2.className = "frameContentHolder noPadding";

var contentContainer2 = document.createElement("div");
contentContainer2.className = "frameContentContainer";

var titleSB2 = document.createElement("div");
titleSB2.className = "divAssistantSidebar";

var contentSB2 = document.createElement("div");
contentSB2.className = "divAssistantSidebarContent";

var bottom2 = document.createElement("div");
bottom2.className = "divAssistantSidebarBottom";


// on ajoute les elements du DOM les uns dans les autres

transp2.appendChild(CI2);
transp2.appendChild(contentHolder2);

TM2.innerHTML = '<span class="frameContentTopTitle">Curseurs</span>';
CI2.appendChild(TR2);
CI2.appendChild(TM2);
CI2.appendChild(TL2);
contentHolder2.appendChild(contentContainer2);
contentContainer2.appendChild(contentSB2);
contentContainer2.appendChild(bottom2);

//ajout des feuilles de style dans la page

/*var css_form = document.createElement("style");
css_form.
css_form.innerHTML = "*/
GM_addStyle('\
   .us_curs_box\
   {\
    	padding: 5px;\
	    background: #eeeeee;\
	    border: 2px solid #30BA35;\
	    border-radius: 10px;\
	    -moz-border-radius: 15px;\
	    -webkit-border-radius: 15px;\
    }\
    ');

// on cree nos champs de nombres pour les curseurs

var cursMental = document.createElement("input");
cursMental.type = "number";
cursMental.className = "us_curs_box";
cursMental.label = "Mentalité";
cursMental.max = "100";
cursMental.min = "0";
cursMental.value = document.getElementById('Mentality').value;
document.getElementById('Mentality').onchange = function(){cursMental.value = this.value;};
cursMental.onchange = function (){document.getElementById('Mentality').value = this.value;};
cursMental.setAttribute("style", "width:126px;text-align:center;font-size:17px;margin-top:10px;");

var cursTempo = document.createElement("input");
cursTempo.type = "number";
cursTempo.className = "us_curs_box";
cursTempo.label = "Rythme";
cursTempo.max = "100";
cursTempo.min = "0";
cursTempo.value = document.getElementById('Tempo').value;
document.getElementById('Tempo').onchange = function(){cursTempo.value = this.value;};
cursTempo.onchange = function(){document.getElementById('Tempo').value = this.value;};
cursTempo.setAttribute("style", "width:126px;text-align:center;font-size:17px;margin-top:10px;");

var cursPress = document.createElement("input");
cursPress.type = "number";
cursPress.className = "us_curs_box";
cursPress.label = "Pressing";
cursPress.max = "100";
cursPress.min = "0";
cursPress.value = document.getElementById('Pressing').value;
cursPress.onchange = function(){document.getElementById('Pressing').value = this.value;};
cursPress.setAttribute("style", "width:126px;text-align:center;font-size:17px;margin-top:10px;");

// on ajoute nos champs de nombres aux conteneurs

contentSB2.appendChild(cursMental);
contentSB2.appendChild(cursTempo);
contentSB2.appendChild(cursPress);

// et on ajoute tout ça à la page web
document.getElementById('divSidebarRight').appendChild(transp2);


// fonction : "envoyer tactique"
// @param : tactique predefinie
// @return : none

function us_sendTactic(t)
{
    document.getElementById('hiddenTacticsForm_Style').value = t.style;
    document.getElementById('hiddenTacticsForm_OverallMatchTactics').value = t.compo;
    
    document.getElementById('edtAttack').value = t.att;
    document.getElementById('edtMidfield').value = t.mil;
    document.getElementById('edtDefence').value = t.def;
    
    document.getElementById('hiddenTacticsForm_Marking').value = t.marking;
    document.getElementById('hiddenTacticsForm_OffsideTrap').value = t.hj;
    
    document.getElementById('Mentality').value = t.mental;
    document.getElementById('Tempo').value = t.tempo;
    document.getElementById('Pressing').value = t.pressing;
    
    document.getElementById('btnConfirm2').name = "SUBMIT";
    document.forms[0].submit();
    alert("Tactique modifiée, chargement en cours...");
}

// fonction : "recuperer tactique de la page web"
// @param : none
// @return : none

function us_getTactic()
{
    var style = parseInt(document.getElementById('hiddenTacticsForm_Style').value);
    var compo = parseInt(document.getElementById('hiddenTacticsForm_OverallMatchTactics').value);
    
    var att = parseInt(document.getElementById('edtAttack').value);
    var mid = parseInt(document.getElementById('edtMidfield').value);
    var def = parseInt(document.getElementById('edtDefence').value);
    
    var mark = document.getElementById('hiddenTacticsForm_Marking').value;
    var hj = document.getElementById('hiddenTacticsForm_OffsideTrap').value;
    
    var mental = document.getElementById('Mentality').value;
    var tempo = document.getElementById('Tempo').value;
    var pressing = document.getElementById('Pressing').value;
    
    var res = 'TACTIQUE :\n\n';
    var tmp = '';
    
    if(style == 0) {
        tmp = 'Style : Mod';
    }
    if(style == 1) {
        tmp = 'Style : Norm';
    }
    if(style == 2) {
        tmp = 'Style : Agr';
    }
    if(style == 3) {
        tmp = 'Style : Tor';
    }
    res = res + tmp + '\n';
    if(compo == 0) {
        tmp = 'Mode : LB';
    }
    if(compo == 1) {
        tmp = 'Mode : P10';
    }
    if(compo == 2) {
        tmp = 'Mode : ailes';
    }
    if(compo == 3) {
        tmp = 'Mode : CA';
    }
    if(compo == 4) {
        tmp = 'Mode : TDL';
    }
    res = res + tmp + '\n';
    if(att == 2) {
        tmp = 'Att : att';
    }
    if(att == 1) {
        tmp = 'Att : mil';
    }
    if(att == 0) {
        tmp = 'Att : def';
    }
    res = res + tmp + '\n';
    if(mid == 2) {
        tmp = 'Mil : att';
    }
    if(mid == 1) {
        tmp = 'Mil : mil';
    }
    if(mid == 0) {
        tmp = 'Mil : def';
    }
    res = res + tmp + '\n';
    if(def == 2) {
        tmp = 'Def : mil';
    }
    if(def == 1) {
        tmp = 'Def : lat';
    }
    if(def == 0) {
        tmp = 'Def : Def';
    }
    res = res + tmp + '\n';
    if(mark == 'true') {
        tmp = 'Zone : non';
    } else {
        tmp = 'Zone : oui';
    }
    res = res + tmp + '\n';
    if(hj == 'true') {
        tmp = 'HJ : oui';
    } else {
        tmp = 'HJ : non';
    }
    res = res + tmp + '\n';
    res = res + 'Mental : '+ mental + '\n';
    res = res + 'Rythme : '+ tempo + '\n';
    res = res + 'Pressing : '+ pressing + '\n\n';
    
    alert(res);
}
