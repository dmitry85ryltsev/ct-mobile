playEdge = function(compId){
    var myAnim = AdobeEdge.getComposition(compId);
    var mySymbol = myAnim.getSymbols("stage")[0];
    mySymbol.play("1");
};

stopEdge = function(compId){
    var myAnim = AdobeEdge.getComposition(compId);
    var mySymbol = myAnim.getSymbols("stage")[0];
    mySymbol.stop(0);
    mySymbol.stop();
};

pauseEdge = function(compId){
    var myAnim = AdobeEdge.getComposition(compId);
    var mySymbol = myAnim.getSymbols("stage")[0];
    mySymbol.stop(mySymbol.getPosition());
    mySymbol.stop();
};

continueEdge = function(compId){
    var myAnim = AdobeEdge.getComposition(compId);
    var mySymbol = myAnim.getSymbols("stage")[0];
    mySymbol.play(mySymbol.getPosition());
};

playReverseEdge = function(compId){
    var myAnim = AdobeEdge.getComposition(compId);
    var mySymbol = myAnim.getSymbols("stage")[0];
    mySymbol.playReverse(mySymbol.getDuration());
};

isPlayingEdge = function(compId){
    var myAnim = AdobeEdge.getComposition(compId);
    var mySymbol = myAnim.getSymbols("stage")[0];
    return mySymbol.isPlaying();
};

function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function smallArrow(a){
    switch (a){
        case 0:
            jQuery("#h_circle #arrow").css({
                "top": 73,
                "left": 17,
                "-webkit-transform": "rotate(0deg)"
            });
            break;
        case 1:
            jQuery("#h_circle #arrow").css({
                "top": 57,
                "left": 23,
                "-webkit-transform": "rotate(35deg)"
            });
            break;
        case 2:
            jQuery("#h_circle #arrow").css({
                "top": 46,
                "left": 38,
                "-webkit-transform": "rotate(71deg)"
            });
            break;
        case 3:
            jQuery("#h_circle #arrow").css({
                "top": 46,
                "left": 58,
                "-webkit-transform": "rotate(109deg)"
            });
            break;
        case 4:
            jQuery("#h_circle #arrow").css({
                "top": 58,
                "left": 74,
                "-webkit-transform": "rotate(147deg)"
            });
            break;
        case 5:
            jQuery("#h_circle #arrow").css({
                "top": 73,
                "left": 79,
                "-webkit-transform": "rotate(180deg)"
            });
            break;
    }
}

function smallCircle(a, b){
    if (a == 0) {
        jQuery("#h_circle .color-sectors").hide();
    } else if (a == 5) {
        if (b == "animate") {
            jQuery("#h_circle .green-sectors").css({
                "width": 144,
                "height": 70,
                "opacity": 1
            });
        } else {
            jQuery("#h_circle .green-sectors").css({
                "width": 144,
                "height": 70,
                "opacity": 1
            });
        }
    } else {
        var widthG = jQuery("#h_circle .sector.visible").first().position().left + 10;
        var heigthG = 70 - (jQuery("#h_circle .sector").eq(a - 1).position().top - 20);
        if (a == 1) heigthG = 70;
        if (b == "animate"){
            jQuery("#h_circle .green-sectors").css({
                "width": widthG,
                "height": heigthG,
                "opacity": 1
            });
        } else {
            jQuery("#h_circle .green-sectors").css({
                "width": widthG,
                "height": heigthG,
                "opacity": 1
            });
        }
    }
}

var inact;

jQuery(document).ready(function(){
    if (document.getElementById("Stage")) var edgeId = document.getElementById("Stage").className;

    if (document.getElementById("h_circle")){
        inact = jQuery("#h_circle .sector").not(".visible").length;
        smallArrow(inact);
        smallCircle(inact, "");

    }
});