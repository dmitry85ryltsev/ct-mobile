// JavaScript Document

$(document).ready(function(){

// -------------------------------------------------------------------------------------------------------  info slide  

		$(".Information").draggable({
			containment: ".wrapper_inner",
			axis: "y",
			revert: "invalid"
		});

		$(".Content").draggable({
			containment: ".wrapper_inner",
			axis: "y",
			revert: "invalid"
		});
	
		$(".wrapper_dropp").droppable({
			accept: ".disable",
			drop: function( event, ui ) {
				var paneMove = $(".disable");
				var paneStay = $(".enable");
				
				$(".tag").css({'opacity': 0});
				
				var moveStart = paneMove.css('top'); // alert(paneMove.css('top')); alert(moveStart);
				paneMove.css({'-webkit-transform': 'translate3d(0, -'+moveStart+', 0)','-webkit-transition-duration': '.7s'});
				
				setTimeout(function(){
					paneStay.removeClass("enable").addClass("disable").css({'top': '768px'}); 
					paneMove.addClass("enable").removeClass("disable").css({'-webkit-transform': 'translate3d(0, 0, 0)','-webkit-transition-duration': '0s'});
					$(".tag").css({'opacity': 1});
				},700); 
			}
		});	
	
	
		$(".tag").click(function(){
			var paneMove = $(".disable");
			var paneStay = $(".enable");
			
			$(this).css({'opacity': 0});
			
			var moveStart = paneMove.css('top'); // alert(paneMove.css('top')); alert(moveStart);
			paneMove.css({'-webkit-transform': 'translate3d(0, -'+moveStart+', 0)','-webkit-transition-duration': '.7s'});
			
			setTimeout(function(){
				paneStay.removeClass("enable").addClass("disable").css({'top': '768px'}); 
				paneMove.addClass("enable").removeClass("disable").css({'-webkit-transform': 'translate3d(0, 0, 0)','-webkit-transition-duration': '0s'});
				$(".tag").css({'opacity': 1});
			},700); 
		});
		
	
	

});





