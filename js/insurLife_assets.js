// JavaScript Document

$(document).ready(function(){
	 
		var insurLife = JSON.parse(localStorage.getItem('storage_insurLife'));  
if (!insurLife) {
  insurLife = {
    amount: 0,
    cost: 0,
    
     assets: 0,
     income: 0,
     cash: 0,
     longterm: 0,
     otherA: 0,
   expenses :0,
  
   	loans: 0,
   	dependents: 0,
   	otherE: 0,
   
}
}
	
		var amountPrev = 0,
			costPrev = 0;
		var amountNext = insurLife.amount,
			costNext = insurLife.cost,
			amountStart = insurLife.amount,
			costStart = insurLife.cost;
			
			if( insurLife.house=='own' ) costStart = costStart-1000;  
				 		
		var rowPayment = $("#monthly_payment").parent('.slider_row');
		
		document.getElementById('input-annual').value = insurLife.assets.income; 					 
		document.getElementById('input-cash').value = insurLife.assets.cash; 					 
		document.getElementById('input-savings').value = insurLife.assets.longterm; 		  
		document.getElementById('input-assets').value = insurLife.assets.otherA; 

		document.getElementById('input-overall').value = insurLife.expenses.loans; 
		document.getElementById('input-dependents').value = insurLife.expenses.dependents; 
		document.getElementById('input-expenses').value = insurLife.expenses.otherE;
		//document.getElementById('input-needs').value = insurLife.expenses.needs
		
		//document.getElementById('input-homeown').value = insurLife.houseVal; 


// ----------------------------------------------------------------------------------------   change  MoneyWindow

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
			MoneyWindow(amountPrev, amountNext, '#insur_amount');	
			MoneyWindow(costPrev, costNext, '#insur_cost');
			amountPrev = amountNext;
			costPrev = costNext;	


// ----------------------------------------------------------------------------------------   Select State Location

			// ----------------  setup
			if( insurLife.state=='' ) $("#selected_state").html('Регион');	
			else $("#selected_state").html(insurLife.state);


		$(".select").click(function(){				 
			$(".select_options").toggleClass('active');
		});

		$("ul.options li").click(function(){				 
			insurLife.state = $(this).html();		//console.log(insurFlat.state)
			
			$("#selected_state").html(insurLife.state);
			localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
			document.getElementById('input-state').value = insurLife.state;
			
			$(".select_options").removeClass('active');
		});

		
		
		
// ----------------------------------------------------------------------------------------   Diagram

function Diagram() {
	var sizeAssets = 0,
		sizeExpenses = 0;
	var Summary = 0,
		degr = 0;
	
	sizeAssets = (insurLife.assets.income + insurLife.assets.cash + insurLife.assets.longterm + insurLife.assets.otherA) * 1000;        		 //alert(Assets);
	sizeExpenses = (insurLife.expenses.payment + insurLife.expenses.loans + insurLife.expenses.dependents + insurLife.expenses.otherE + insurLife.expenses.needs) * 1000;	 //alert(Expenses);
	Summary = sizeExpenses*100/(sizeAssets + sizeExpenses);
	degr = Summary*1.8;

	if( sizeAssets>0 ) {
		$(".diagram_wrapper").addClass('asset_size');					
	}else {
		$(".diagram_wrapper").removeClass('asset_size');
	};

	if( sizeExpenses>0 ) { 																//alert(degr);
		$(".exp-top").css({'-webkit-transform': 'rotate3d(0, 0, 1, '+degr+'deg)'});	
		$(".exp-bott").css({'-webkit-transform': 'rotate3d(0, 0, 1, -'+degr+'deg)'});					 
	}else {
		$(".exp-top").css({'-webkit-transform': 'rotate3d(0, 0, 1, 0deg)'});
		$(".exp-bott").css({'-webkit-transform': 'rotate3d(0, 0, 1, 0deg)'});
	};


};

			// ----------------  setup
			Diagram();


		
// ----------------------------------------------------------------------------------------   ReCalculation

function ReCalculation() {
	var Amount = 0,
		Cost = 0;
	var Assets = 0,
		Expenses = 0;
	var Delta = 0;
	
	if( insurLife.house=='own' ) {
		Cost = costStart+1000;
		Amount = amountStart + 75000*Math.floor(insurLife.houseVal/100);
		if( Amount>9000000 ) Amount = 9000000;
	}
	else {
		Cost = costStart;
		Amount = amountStart;
	}; 
	 					
	Assets = (insurLife.assets.income + insurLife.assets.cash + insurLife.assets.longterm + insurLife.assets.otherA) * 1000;        		 //alert(Assets);
	Expenses = (insurLife.expenses.payment + insurLife.expenses.loans + insurLife.expenses.dependents + insurLife.expenses.otherE + insurLife.expenses.needs) * 1000;	 //alert(Expenses);

	amountNext = Amount;
	costNext = Cost;
	
	if( Assets>0 && Expenses>0 ) {
		Delta = insurLife.houseVal*1000 + Assets - Expenses; 					// alert(Delta);
		
		if( Delta<0 ) {
			amountNext = Amount;
			costNext = Cost + Math.floor(Cost*0.25);
		}else if( Delta<5000 ) {
			amountNext = Amount + Math.floor(Amount*0.03);
			costNext = Cost + Math.floor(Cost*0.15);
		}else {
			amountNext = Amount + Math.floor(Amount*0.05);
			costNext = Cost + Math.floor(Cost*0.1);
		};
	};
	
	Diagram();

	if( amountPrev != amountNext ) MoneyWindow(amountPrev, amountNext, '#insur_amount');	
	if( costPrev != costNext ) MoneyWindow(costPrev, costNext, '#insur_cost');
	amountPrev = amountNext;
	costPrev = costNext;
	
	insurLife.amount = 	amountNext;
	insurLife.cost = costNext;
	localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
};



		
// ----------------------------------------------------------------------------------------   Sliders


		// ----------------------------------------------------  slider house   
		
		$( "#house" ).slider({
			range: "min",
			value: insurLife.houseVal,
			min: 0,
			max: 5000,
			step: 50,
			animate: "fast",
			create: function (event, ui){
				var value = $(this).slider("option", "value");
				if( value<1000 ) $("#house_val").html('<span class="rub"></span>'+value+'<i>тыс.</i>');
				else {
					var uiVal = value+'';
					$("#house_val").html('<span class="rub"></span>'+uiVal.substr(0, 1)+'<i>млн.</i>'+uiVal.substr(1)+'<i>тыс.</i>');
				};
			},
			slide: function( event, ui ) {
				if( ui.value<1000 ) $("#house_val").html('<span class="rub"></span>'+ui.value+'<i>тыс.</i>');
				else {
					var uiVal = ui.value+'';
					$("#house_val").html('<span class="rub"></span>'+uiVal.substr(0, 1)+'<i>млн.</i>'+uiVal.substr(1)+'<i>тыс.</i>');
				};
			},
			stop: function( event, ui ) {
				insurLife.houseVal = ui.value;
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-homeown').value = insurLife.houseVal; 
				ReCalculation();
			}
		});
		
		// ---------------------------------  setup
		if( insurLife.house=='own' ) {     
			$(".btn-house.own").addClass('active');
		}else if( insurLife.house=='rent' ) {
			$(".btn-house.rent").addClass('active');
			$("#house").slider({ disabled: true });
		}else {
			$("#house").slider({ disabled: true });
		};
		
		
		$(".btn-house.own").click(function(){
			if( !$(this).hasClass('active') ){
			  	$(this).addClass('active');
			  	$(".btn-house.rent").removeClass('active');
			  	$("#house").slider({ disabled: false });

				rowPayment.css({'display': 'none'});
				Diagram();
				insurLife.expenses.payment = 0;

				insurLife.house = 'own';
				insurLife.houseVal = 0;
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-homeown').value = insurLife.houseVal; 
			  	ReCalculation();
			};
			  
			  
		});
		
		
		$(".btn-house.rent").click(function(){
			$(this).addClass('active');
			
			$(".btn-house.own").removeClass('active');
			$("#house").slider( "option", "value", 0 );
			$("#house").slider({ disabled: true });
			
			rowPayment.css({'display': 'block'});
			
			insurLife.house = 'rent'; 
			insurLife.houseVal = 0;
			$("#house_val").html('<span class="rub"></span>0<i>тыс.</i>');
			
			localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
			document.getElementById('input-homeown').value = insurLife.houseVal; 
			ReCalculation();	
		});
		
		
		
		
        // ----------------------------------------------------  slider annual_income   
					
		$( "#annual_income" ).slider({
			range: "min",
			value: insurLife.assets.income,
			min: 0,
			max: 2000000,
			step: 15,
			animate: "fast",
			create: function (event, ui){
				var value = $(this).slider("option", "value");
				$(this).data('value', value);
				$("#annual_income_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				/*if( ui.value<50000 )*/ $("#annual_income_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
				//else $("#annual_income_val").html('<span class="rub"></span>50000<i></i>');
			},
			start: function( event, ui ) {
				$('.annual_income').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.annual_income').removeClass('active');
				insurLife.assets.income = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-annual').value = insurLife.assets.income; 					//alert(document.getElementById('input-cash').value);
				ReCalculation();
			}
		});
		
		
		
		
        // ----------------------------------------------------  slider cash_savings  
					
		$( "#cash_savings" ).slider({
			range: "min",
			value: insurLife.assets.cash,
			min: 0,
			max: 2000000,
			step: 10,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#cash_savings_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#cash_savings_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
			},
			start: function( event, ui ) {
				$('.cash_savings').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.cash_savings').removeClass('active');
				insurLife.assets.cash = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-cash').value = insurLife.assets.cash; 
				ReCalculation();
			}
		});
		
		
		
		
        // ----------------------------------------------------  slider longterm_savings 
					
		$( "#longterm_savings" ).slider({
			range: "min",
			value: insurLife.assets.longterm,
			min: 0,
			max: 2000000,
			step: 10,
			animate: "fast",
			create: function (event, ui){
				var value = $(this).slider("option", "value");
				$(this).data('value', value);
				$("#longterm_savings_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#longterm_savings_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
			},
			start: function( event, ui ) {
				$('.longterm_savings').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.longterm_savings').removeClass('active');
				insurLife.assets.longterm = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-savings').value = insurLife.assets.longterm; 
				ReCalculation();
			}
		});
		
		
		
        // ----------------------------------------------------  slider other_assets 
					
		$( "#other_assets" ).slider({
			range: "min",
			value: insurLife.assets.otherA,
			min: 0,
			max: 1000000,
			step: 10,
			animate: "fast",
			create: function (event, ui){
				var value = $(this).slider("option", "value");
				$(this).data('value', value);
				$("#other_assets_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#other_assets_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateOneSliders();
				graph1_delayed();
				result();
			},
			start: function( event, ui ) {
				$('.other_assets').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.other_assets').removeClass('active');
				insurLife.assets.otherA = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-assets').value = insurLife.assets.otherA; 
				ReCalculation();
			}
		});

	function updateOneSliders () {
//debugger;
			//var sum = $('#other_assets').data('value')+$('#longterm_savings').data('value')+$('#cash_savings').data('value')+$('#annual_income').data('value');
		var x1 = $('#other_assets').data('value') || 0,
	        x2 = $('#longterm_savings').data('value') || 0,
	        x3 = $('#cash_savings').data('value') || 0,
	        x4 = $('#annual_income').data('value') || 0;

		var sum = x1 + x2 + x3 + x4;
			//var sum = Number($("#other_assets_val").html()) + Number($("#longterm_savings_val").html()) + Number($("#cash_savings_val").html()) + Number($("#annual_income_val").html());
			
			$("#resultone_div").html(('<p class="doll">$</p>'+sum).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			
		}
	
        // ----------------------------------------------------  slider monthly_payment 
					
		$( "#monthly_payment" ).slider({
			range: "min",
			value: insurLife.expenses.payment,
			min: 0,
			max: 2000000,
			step: 10,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#monthly_payment_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#monthly_payment_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			start: function( event, ui ) {
				$('.monthly_payment').addClass('active');
				updateTwoSliders();
				graph2();
				result();
			},
			stop: function( event, ui ) {
				$('.monthly_payment').removeClass('active');
				insurLife.expenses.payment = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-monthly').value = insurLife.expenses.payment;
				ReCalculation();
			}
		});
		
		if( insurLife.house=='own' ) {
			rowPayment.css({'display': 'none'});
			insurLife.expenses.payment = 0;
			localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
			document.getElementById('input-monthly').value = insurLife.expenses.payment; 
		};
	
	
	
        // ----------------------------------------------------  slider loans
					
		$( "#loans" ).slider({
			range: "min",
			value: insurLife.expenses.loans,
			min: 0,
			max: 500000,
			step: 10,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#loans_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#loans_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			start: function( event, ui ) {
				$('.loans').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.loans').removeClass('active');
				insurLife.expenses.loans = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-overall').value = insurLife.expenses.loans; 
				ReCalculation();
			}
		});
		  


        // ----------------------------------------------------  slider dependents 
					
		$( "#dependents" ).slider({
			range: "min",
			value: insurLife.expenses.dependents,
			min: 0,
			max: 1000000,
			step: 10,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#dependents_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#dependents_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			start: function( event, ui ) {
				$('.dependents').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.dependents').removeClass('active');
				insurLife.expenses.dependents = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-dependents').value = insurLife.expenses.dependents; 
				ReCalculation();
			}
		});



        // ----------------------------------------------------  slider other_expenses 
					
		$( "#other_expenses" ).slider({
			range: "min",
			value: insurLife.expenses.otherE,
			min: 0,
			max: 50000,
			step: 5,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#other_expenses_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#other_expenses_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			start: function( event, ui ) {
				$('.other_expenses').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.other_expenses').removeClass('active');
				insurLife.expenses.otherE = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-expenses').value = insurLife.expenses.otherE; 
				ReCalculation();
			}
		});

		// ----------------------------------------------------  slider needs
					
		$( "#needs" ).slider({
			range: "min",
			value: insurLife.expenses.needs,
			min: 0,
			max: 500000,
			step: 5,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#needs_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#needs_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateTwoSliders();
				graph2();
				result();
			},
			start: function( event, ui ) {
				$('.needs').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.needs').removeClass('active');
				insurLife.expenses.needs = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				//document.getElementById('input-needs').value = insurLife.expenses.needs; 
				ReCalculation();
			}
		});

		function updateTwoSliders () {

			//var sum = $('#needs').data('value')+$('#other_expenses').data('value')+$('#dependents').data('value')+$('#loans').data('value')+$('#monthly_payment').data('value');
			
			var x1 = $('#needs').data('value') || 0,
	            x2 = $('#other_expenses').data('value') || 0,
	            x3 = $('#dependents').data('value') || 0,
	            x4 = $('#loans').data('value') || 0,
	            x5 = $('#monthly_payment').data('value') || 0;

	      	var sum = x1 + x2 + x3 + x4 + x5;



			//var sum = Number($("#needs_val").html()) + Number($("#other_expenses_val").html()) + Number($("#dependents_val").html()) + Number($("#loans_val").html()) + Number($("#monthly_payment_val").html());
			$("#resulttwo_div").html(('<p class="doll">$</p>'+sum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}

		// -------------------------------income-box  desired
		
		$( "#desired" ).slider({
			range: "min",
			value: insurLife.expenses.desired,
			min: 0,
			max: 300000,
			step: 10,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#desired_val").html((value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateMainSliders();
				result();

			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#desired_val").html((ui.value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				updateMainSliders();
				result();
			},
			start: function( event, ui ) {
				$('.desired').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.desired').removeClass('active');
				insurLife.expenses.desired = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-desired').value = insurLife.expenses.desired; 
				ReCalculation();
			}

		});


		/**********           replace            ************/

		$( "#replace" ).slider({
			range: "min",
			value: insurLife.expenses.replace,
			min: 0,
			max: 50,
			step: 1,
			animate: "fast",
			create: function (event, ui){
				$(this).data('value', value);
				var value = $(this).slider("option", "value");
				$("#replace_val").html(value);
				updateMainSliders();
				result();

			},
			slide: function( event, ui ) {
				$(this).data('value', ui.value);
				$("#replace_val").html(ui.value);
				updateMainSliders();
				result();
			},
			start: function( event, ui ) {
				$('.replace').addClass('active');	
			},
			stop: function( event, ui ) {
				$('.replace').removeClass('active');
				insurLife.expenses.replace = ui.value; 											 
				localStorage.setItem('storage_insurLife', JSON.stringify(insurLife));
				document.getElementById('input-replace').value = insurLife.expenses.replace; 
				ReCalculation();
			}
			
		});

		function updateMainSliders () {

			//var sum = $("#desired").data('value') * $("#replace").data('value');
			
			var x1 = $('#desired').data('value') || 0,
	            x2 = $('#replace').data('value') || 0;
	          
	      	var sum = x1 * x2;



			//var sum = Number($("#desired_val").html()) * Number($("#replace_val").html());
			$("#result_div").html(('<p class="doll">$</p>'+sum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}

/*******************************/
		/*function graph1_delayed() {
			if (!timer) {
				timer = setTimeout (graph1, 0);
			}
		};*/
		function graph1_delayed () {
			//var line1 = (Number($("#annual_income_val").html()) + Number($("#cash_savings_val").html()) + Number($("#longterm_savings_val").html()) + Number($("#other_assets_val").html())) / (2000000 + 2000000 + 2000000 + 1000000);
			//var sum = Number($("#annual_income_val").html()) + Number($("#cash_savings_val").html()) + Number($("#longterm_savings_val").html()) + Number($("#other_assets_val").html());

			//var line1 = ($("#annual_income").data('value') + $("#cash_savings").data('value') + $("#longterm_savings").data('value') + $("#other_assets").data('value')) / (2000000 + 2000000 + 2000000 + 1000000);
			//var sum = $("#annual_income").data('value') + $("#cash_savings").data('value') + $("#longterm_savings").data('value') + $("#other_assets").data('value');

			var x1 = $('#annual_income').data('value') || 0,
	            x2 = $('#cash_savings').data('value') || 0,
	            x3 = $('#longterm_savings').data('value') || 0,
	            x4 = $('#other_assets').data('value') || 0;
	      	var line1 = (x1 + x2 + x3 + x4) / (2000000 + 2000000 + 2000000 + 1000000);

	      	var y1 = $('#annual_income').data('value') || 0,
	            y2 = $('#cash_savings').data('value') || 0,
	            y3 = $('#longterm_savings').data('value') || 0,
	            y4 = $('#other_assets').data('value') || 0;
            var sum = (y1 + y2 + y3 + y4);

			var height = 230 * line1;
			$(".gr-green").css({'height': height + 'px'});
			$(".gr-green span").html(('<p>$ </p>' + sum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		};

		function graph2 () {
			//var line2 = (Number($("#monthly_payment_val").html()) + Number($("#loans_val").html()) + Number($("#dependents_val").html()) + Number($("#other_expenses_val").html()) + Number($("#needs_val").html())) / (2000000 + 500000 + 1000000 + 50000 + 500000);
			//var sum = Number($("#monthly_payment_val").html()) + Number($("#loans_val").html()) + Number($("#dependents_val").html()) + Number($("#other_expenses_val").html()) + Number($("#needs_val").html());
			
			//var line2 = ($("#monthly_payment").data('value') + $("#loans").data('value') + $("#dependents").data('value') + $("#other_expenses").data('value') + $("#needs").data('value')) / (2000000 + 500000 + 1000000 + 50000 + 500000);
			//var sum = $("#monthly_payment").data('value') + $("#loans").data('value') + $("#dependents").data('value') + $("#other_expenses").data('value') + $("#needs").data('value');


			var x1 = $('#monthly_payment').data('value') || 0,
	            x2 = $('#loans').data('value') || 0,
	            x3 = $('#dependents').data('value') || 0,
	            x4 = $('#other_expenses').data('value') || 0,
	            x5 = $('#needs').data('value') || 0;
	      	var line2 = (x1 + x2 + x3 + x4 +x5) / (2000000 + 500000 + 1000000 + 50000 + 500000);

	      	var y1 = $('#monthly_payment').data('value') || 0,
	            y2 = $('#loans').data('value') || 0,
	            y3 = $('#dependents').data('value') || 0,
	            y4 = $('#other_expenses').data('value') || 0,
	            y5 = $('#needs').data('value') || 0;
            var sum = (y1 + y2 + y3 + y4 +y5);


			var height_new = 130 * line2;
			$(".gr-orange").css({'height': height_new + 'px'});
			$(".gr-orange span").html(('<p>$ </p>' + sum).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		};

		function result () {
			//var incom = Number($("#desired_val").html()) * Number($("#replace_val").html());
			//var liab = Number($("#other_assets_val").html()) + Number($("#longterm_savings_val").html()) + Number($("#cash_savings_val").html()) + Number($("#annual_income_val").html());
			//var asset = Number($("#needs_val").html()) + Number($("#other_expenses_val").html()) + Number($("#dependents_val").html()) + Number($("#loans_val").html()) + Number($("#monthly_payment_val").html());
			
			//var incom = $("#desired").data('value') * $("#replace").data('value');
			//var liab = $("#annual_income").data('value') + $("#cash_savings").data('value') + $("#longterm_savings").data('value') + $("#other_assets").data('value');
			//var asset = $("#monthly_payment").data('value') + $("#loans").data('value') + $("#dependents").data('value') + $("#other_expenses").data('value') + $("#needs").data('value');

			var x1 = $("#desired").data('value') || 0,
				x2 = $("#replace").data('value') || 0;
			var incom = x1 - x2;

			var y1 = $("#annual_income").data('value') || 0,
				y2 = $("#cash_savings").data('value') || 0,
				y3 = $("#longterm_savings").data('value') || 0,
				y4 = $("#other_assets").data('value') || 0;
			var liab = y1 + y2 + y3 + y4;

			var z1 = $("#monthly_payment").data('value') || 0,
				z2 = $("#loans").data('value') || 0,
				z3 = $("#dependents").data('value') || 0,
				z4 = $("#other_expenses").data('value') || 0,
				z5 = $("#needs").data('value') || 0;
			var asset = z1 + z2 + z3 + z4 + z5;


			var diffr = liab - asset;
			//var diffr = (Number($("#other_assets_val").html()) + Number($("#longterm_savings_val").html()) + Number($("#cash_savings_val").html()) + Number($("#annual_income_val").html())) - (Number($("#needs_val").html()) + Number($("#other_expenses_val").html()) + Number($("#dependents_val").html()) + Number($("#loans_val").html()) + Number($("#monthly_payment_val").html()));
			var itog = diffr + incom;
			/*if (liab < asset) {
				$('#res').html('<i>$</i>' + incom);
			} else {
				$('#res').html('<i>$</i>' + itog);
			}*/
			
			//var resul
				if (asset > liab) {
				  resul = incom;
				} else {
				  resul = itog;
				};

				var resul1 = resul - (resul / 3);
				resul1 = resul1.toFixed(0);

				var resul3 = resul + (resul / 3);
				resul3 = resul3.toFixed(0);

				var resul1_2 = resul1 * 0.00004;
				resul1_2 = resul1_2.toFixed(0);

				var resul1_3 = resul1 * 0.00005075;
				resul1_3 = resul1_3.toFixed(0);

				var resul1_4 = resul1 * 0.00006475;
				resul1_4 = resul1_4.toFixed(0);

				var resul2_2 = resul * 0.000037875;
				resul2_2 = resul2_2.toFixed(0);

				var resul2_3 = resul * 0.000046375;
				resul2_3 = resul2_3.toFixed(0);

				var resul2_4 = resul * 0.000060375;
				resul2_4 = resul2_4.toFixed(0);

				var resul3_2 = resul3 * 0.000035438;
				resul3_2 = resul3_2.toFixed(0);

				var resul3_3 = resul3 * 0.000044188;
				resul3_3 = resul3_3.toFixed(0);

				var resul3_4 = resul3 * 0.000058188;
				resul3_4 = resul3_4.toFixed(0);

				localStorage.setItem("res1", resul1);
				localStorage.setItem("res3", resul3);
				localStorage.setItem("res", resul); // 2.html
				localStorage.setItem("res1_2", resul1_2);
				localStorage.setItem("res1_3", resul1_3);
				localStorage.setItem("res1_4", resul1_4);
				localStorage.setItem("res2_2", resul2_2);
				localStorage.setItem("res2_3", resul2_3);
				localStorage.setItem("res2_4", resul2_4);
				localStorage.setItem("res3_2", resul3_2);
				localStorage.setItem("res3_3", resul3_3);
				localStorage.setItem("res3_4", resul3_4);
		};
		//var timer = null;


});
