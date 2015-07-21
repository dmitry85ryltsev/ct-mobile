function slidePreview() {
    if (document.getElementById('preview')){
        $("#preview").show();
    } else if ( document.getElementById('Stage') ) {
        var classStage = $("#Stage").attr("class");
        $(classStage).show();
        var myAnim = AdobeEdge.getComposition(classStage);
        var mySymbol = myAnim.getSymbols("stage")[0];
        mySymbol.stop(mySymbol.getDuration());
        mySymbol.stop();
    }
					
}