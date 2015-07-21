// JavaScript Document

$(document).ready(function(){
	
	 	//var insurFlat = JSON.parse(localStorage.getItem('storage_insurFlat')); 		//console.log(localStorage.getItem('storage_insurFlat'))
	 	//	var insurFlat = JSON.parse(localStorage.getItem('storage_insurFlat')) || {elements: {}};
var insurFlat = JSON.parse(localStorage.getItem('storage_insurFlat'));
if (!insurFlat) {
  insurFlat = {
    amount: 0,
    cost: 0,
    elements: {
     furnish: 0,
     carcass: 0,
     possessions: 0,
     responsibility: 0,


   }
}
};
		var amountPrev = 0,
			costPrev = 0;

		var amountNext = insurFlat.amount,
			costNext = insurFlat.cost,
			amountStart = insurFlat.amount,
			costStart = insurFlat.cost;
		
		
		document.getElementById('input-furnish').value = insurFlat.elements.furnish; 					 
		document.getElementById('input-carcass').value = insurFlat.elements.carcass; 					 
		document.getElementById('input-possessions').value = insurFlat.elements.possessions; 					 
		document.getElementById('input-responsibility').value = insurFlat.elements.responsibility; 					 


// ----------------------------------------------------------------------------------------   change  MoneyWindow
/*
function MoneyWindow(valPrev, valNext, idWindow) {

	var _valNext = valNext+'';
	var lengthNext = _valNext.length;  					 
	var positionNew = (valNext-valPrev<0) ? 'new-bottom' : 'new-top';
	
	$('ul'+idWindow+' li span').addClass('current');	
	
	for(var i = 0; i < lengthNext; i++) {
		var cell = $('ul'+idWindow+' li').eq(i);
		var cellVal = _valNext.substr((lengthNext-1-i),1)
		
		$('<span class="new"/>').prependTo(cell).addClass(positionNew).html(cellVal); 
	};

	$('ul'+idWindow+' li span.new').animate({"top": "0px"}, 300, function(){
		$('ul'+idWindow+' li span.current').remove();
		$('ul'+idWindow+' li span.new').removeClass('new').removeClass(positionNew);
	});
	
};

			// ----------------  setup
			if( insurFlat.amount>0 ) {
				MoneyWindow(costPrev, costNext, '#insur_cost');
				MoneyWindow(amountPrev, amountNext, '#insur_amount');
			};
			costPrev = costNext;	
			amountPrev = amountNext;

		*/
// ----------------------------------------------------------------------------------------   ReCalculation
/*
function ReCalculation() {
	var amountStart = 0;
	// elements furnish
	amountNext = amountStart + insurFlat.elements.furnish; 			//console.log(amountNext)
	// elements carcass
	amountNext = amountNext + insurFlat.elements.carcass;
	// elements possessions
	amountNext = amountNext + insurFlat.elements.possessions;
	// elements responsibility
	amountNext = amountNext + insurFlat.elements.responsibility;
	
	costNext = Math.round(amountNext*0.014);
	var costCounter = costNext;
	// options iron_door
	costNext = ( insurFlat.optional.iron_door ) ? Math.round(costNext-(costCounter*0.05)) : costNext;    				
	// options lattice
	costNext = ( insurFlat.optional.lattice ) ? Math.round(costNext-(costCounter*0.05)) : costNext; 				
	// options fire_signal
	costNext = ( insurFlat.optional.fire_signal ) ? Math.round(costNext-(costCounter*0.05)) : costNext;     				
	// options first_floor
	costNext = ( insurFlat.optional.first_floor ) ? Math.round(costNext+(costCounter*0.08)) : costNext;     	//console.log(JSON.stringify(insurFlat))			

	if( costPrev != costNext ) {
		MoneyWindow(costPrev, costNext, '#insur_cost');
		MoneyWindow(amountPrev, amountNext, '#insur_amount');
	};
	amountPrev = amountNext;
	costPrev = costNext;
	
	insurFlat.amount = 	amountNext;
	insurFlat.cost = costNext;
	localStorage.setItem('storage_insurFlat', JSON.stringify(insurFlat));
};


*/
		
// ----------------------------------------------------------------------------------------   Sliders

			var arrStartValue = [insurFlat.elements.furnish, insurFlat.elements.carcass, insurFlat.elements.possessions, insurFlat.elements.responsibility];


		$(".sliderwidget").each(function(i) {
						
			$( this ).slider({
				range: "min",
				value: Math.round(arrStartValue[i]/1000),
				min: 0,
				max: 100,
				step: 1,
				animate: "fast",
				create: function (event, ui){
					var value = $(this).slider("option", "value");
					$(this).next(".slider-value").html(value);
					/*
					$(".flat_element.step-"+(i+1)+" .level").css({'-webkit-mask-size':'100% '+Math.round(arrStartValue[i]/10000)+'%'});
					if( arrStartValue[i]>0 ) {
						$(".flat_element.step-"+(i+1)).addClass('active');
					}else {
						$(".flat_element.step-"+(i+1)).removeClass('active');
					};*/
				},
				slide: function( event, ui ) {
					if( ui.value==1000 ) $(this).next(".slider-value");
					else $(this).next(".slider-value").html(ui.value);
					
					arrStartValue[i] = ui.value*1000; 
					
					if( ui.value>0 ) {
						$(".flat_element.step-"+(i+1)).addClass('active');
					}else {
						$(".flat_element.step-"+(i+1)).removeClass('active');
					};
					$(".flat_element.step-"+(i+1)+" .level").css({'-webkit-mask-size':'100% '+Math.round(arrStartValue[i]/10000)+'%'});
				},
				/*stop: function( event, ui ) {
					insurFlat.elements.furnish = arrStartValue[0];
					insurFlat.elements.carcass = arrStartValue[1];
					insurFlat.elements.possessions = arrStartValue[2]; 
					insurFlat.elements.responsibility = arrStartValue[3];
					
					localStorage.setItem('storage_insurFlat', JSON.stringify(insurFlat));
					
					document.getElementById('input-furnish').value = arrStartValue[0];
					document.getElementById('input-carcass').value = arrStartValue[1];
					document.getElementById('input-possessions').value = arrStartValue[2];
					document.getElementById('input-responsibility').value = arrStartValue[3];
					
					ReCalculation();
				}*/
			});
		
		});

		
	/*
	
// ----------------------------------------------------------------------------------------   Carusel
	
				// ----------------  setup
				var goNext = document.getElementById("arrow_next"),
					goPrev = document.getElementById("arrow_prev");
				var navBtns = getElementsByClassName("nav");  
	
				var stepCounter = 1;
				$("#arrow_prev").css({'opacity':0.2});


function SlideNext(stepRem, stepCounter) {

	$("#arrow_next, #arrow_prev").css({'opacity':1});
	if( stepCounter==4 ) $("#arrow_next").css({'opacity':0.2});
	else 	$("#arrow_next").css({'opacity':1});
	
	$("li.nav").removeClass('current');
	$('ul.navigation li:nth-child('+stepCounter+')').addClass('current');	

	$(".carousel").attr({'data-step':stepCounter+''});
	
	$(".slider_row.row-"+stepCounter).css({'-webkit-transform':'translate3d(900px,0,0)',  'z-index':-100, '-webkit-transition-duration':'0s'});
	$(".slider_row.row-"+stepRem).css({    '-webkit-transform':'translate3d(-900px,0,0)', 'z-index':10,   '-webkit-transition-duration':'0.4s'});
	setTimeout( function() { 
		$(".slider_row.row-"+stepCounter).css({'-webkit-transform':'translate3d(0,0,0)',  'z-index':10,   '-webkit-transition-duration':'0.5s'}); 
	}, 300);

};
			

function SlidePrev(stepRem, stepCounter) {

	$("#arrow_next, #arrow_prev").css({'opacity':1});
	if( stepCounter==1 ) $("#arrow_prev").css({'opacity':0.2});
	else 	$("#arrow_prev").css({'opacity':1});
	
	$("li.nav").removeClass('current');
	$('ul.navigation li:nth-child('+stepCounter+')').addClass('current');	

	$(".carousel").attr({'data-step':stepCounter+''});
	
	$(".slider_row.row-"+stepCounter).css({'-webkit-transform':'translate3d(-900px,0,0)', 'z-index':-100, '-webkit-transition-duration':'0s'});
	$(".slider_row.row-"+stepRem).css({    '-webkit-transform':'translate3d(900px,0,0)',  'z-index':10,   '-webkit-transition-duration':'0.4s'});
	setTimeout( function() { 
		$(".slider_row.row-"+stepCounter).css({'-webkit-transform':'translate3d(0,0,0)',  'z-index':10,   '-webkit-transition-duration':'0.5s'});
	}, 300);

};
			
			
		goNext.addEventListener('touchend', function(event) {  
			var stepRem = stepCounter;
			 
			if( stepRem<4 ) {
				stepCounter++;											//console.log(stepCounter);
				SlideNext(stepRem, stepCounter);
			};
		});
		
		goPrev.addEventListener('touchend', function(event) {  
			var stepRem = stepCounter;
			 
			if( stepRem>1 ) {
				stepCounter--;	
				SlidePrev(stepRem, stepCounter);
			};
		});

	
		for(var i = 0; i < navBtns.length; i++) {
			navBtns[i].addEventListener('touchend', function(event) { 
				
				var indexBtn = navBtns.indexOf(this);
				var stepRem = stepCounter;
				
				stepCounter = indexBtn+1;
				
				if( stepRem<stepCounter ) {
					SlideNext(stepRem, stepCounter);
				}else if( stepRem!=stepCounter ) {
					SlidePrev(stepRem, stepCounter);
				};
			});
		};
*/


});




