var catID; 							//holds the clicked food category ID
var catNameHeb; 					//holds the parameter name after translation
var areaId = '4';   				//holds the clicked area Id
var businessArray = new Array(); 	//holds an array of all businesses Id's
var areaArr = new Array();			//holds an array of all area Id's
var catName;
var doOnce = true;					//flag that do operation once

//side menu variables
var arrayCat = ['pizzaL','sushiL','burgerL','pastaL','fireL','chinaL'];
var arrayCatHeb = ['פיצה','סושי','המבורגר','פסטה','שווארמה','סיני'];
var indexCat=0;

//result from rest variables
var rsltNum=0;
var rsltCol;
var rsltRow;
var row=1;
var col=1;

var lastRowRslt;

//top page variables

var topIndex = 1;							//topIndex is initialize to 1 where [1=right menu section & 0=result section]

var widgetAPI = new Common.API.Widget();	//TV REQUIERED
var tvKey = new Common.API.TVKeyValue();	//TV REQUIERED

//SAMSUNG SMART TV FUNCTIONS - START

var Main = 
{
}

Main.onLoad = function()
{
	//help ticker - bottom of the screen
	//$('#helpTicker').sfKeyHelp({
	//	'user': 'EaTV User',  'red': 'Stop',  
    //    'green':'Start', 'enter': 'Enter','updown' :'UpDown',
    //    'return': 'Back'

	//});
	
	//Loading Image
	//$('#loadingImage').sfLoading();
		
	// To enable the key event processing
	document.getElementById("anchor").focus();
	
	// Set Default key handler function
	widgetAPI.sendReadyEvent();
	
	document.getElementById(arrayCat[indexCat]).style.color="#fb1f6c";
	
	//document.getElementById("debug").innerHTML += ">>MAIN.ONLOAD";
	clickCat('פיצה');
	
}


Main.onUnload = function()
{
	
}


Main.MainKeyHandler = function()
{
	var KeyCode = event.keyCode;

	switch(KeyCode)
	{
		/////////////////////////////////////////////////// KEY_LEFT
		case tvKey.KEY_LEFT :
			alert("left");
			if(topIndex==1)	//in menu section
			{
				alert("row: " + row + " col: " +col);
				topIndex=0;
				
				document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
				document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';
				document.getElementById("rightMenuBG").style.visibility = 'hidden'; 
			}
			else			//in result section
			{
				if(col==1)
				{
					//can not move left if col=1 - left border of div result
				}
				else
				{
					if(col<=3)
					{
						//document.getElementById("box_"+row+"_"+col).style.border = "solid";
						document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
						document.getElementById("textBox_"+row+"_"+col).style.background ="black";						
						col--;
						//document.getElementById("box_"+row+"_"+col).style.border = "solid";
						document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
						document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';						
					}
				}
			}
			break;
		
		/////////////////////////////////////////////////// KEY_RIGHT
		case tvKey.KEY_RIGHT :
			alert("right");
			if(topIndex==1)	//in menu section
			{
				//do nothing - can not move right in menu section
			}
			else			//in result section
			{
				if(col==3)	//	result >> menu
				{
					//document.getElementById("box_"+row+"_"+col).style.border = "solid";
					document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
					topIndex=1;
					document.getElementById("rightMenuBG").style.visibility = 'visible';
				}
				else
				{
					if(col>=1)//circulating inside result
					{
						if(row==rsltRow)
						{
							if(lastRowRslt==1)
							{
								document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
								document.getElementById("textBox_"+row+"_"+col).style.background ="black";
								topIndex=1;
								document.getElementById("rightMenuBG").style.visibility = 'visible';
							}
							if(lastRowRslt==2 && col==2)
							{
								document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
								document.getElementById("textBox_"+row+"_"+col).style.background ="black";
								topIndex=1;
								document.getElementById("rightMenuBG").style.visibility = 'visible';
							}
							if(lastRowRslt==2 && col!=2)
							{
								document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
								document.getElementById("textBox_"+row+"_"+col).style.background ="black";
								col++;
								document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
								document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';	
							}
							if(lastRowRslt==0)
							{
								document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
								document.getElementById("textBox_"+row+"_"+col).style.background ="black";
								col++;
								document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
								document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';
							}
						}
						else
						{
							document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
							document.getElementById("textBox_"+row+"_"+col).style.background ="black";
							col++;
							document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
							document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';
						}
					}					
				}
			}
			break;
		
		/////////////////////////////////////////////////// KEY_UP
		case tvKey.KEY_UP :
			alert("up");
			if(topIndex==1)	//in menu section
			{
				if(indexCat==0)
				{
				}
				else
				{
					if(indexCat<=5)
					{
						alert("indexCat: " + indexCat);
						indexCat--;
						$('#rightMenuBG').animate({
											top: $('li:eq('+indexCat+')').position().top,
											
										  }, 500, function() {
											// Animation complete.
										  });
					}
				}
			}
			else			//in result section
			{
				if(row==1)
				{
					alert("Can not go up, first row detected");
					break;
				}
				else
				{
					if(row<4)
					{
						document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
						document.getElementById("textBox_"+row+"_"+col).style.background ="black";
						row--;
						document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
						document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';
						alert("FIX DIV RSLT TO TOP");
						document.getElementById("innerLeftBox").setAttribute("style", "marginTop: 0px");
						break;
					}
					else
					{
						document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
						document.getElementById("textBox_"+row+"_"+col).style.background ="black";
						row--;
						document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
						document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';
						$("#innerLeftBox").animate({"top": "+=180px"}, "fast");
						alert("rsltRow: " + rsltRow + " Row: " + row + " Col: " +col);
						alert("MOVE");
						break;
					}
				}
			}			
			break;
			
		/////////////////////////////////////////////////// KEY_DOWN
		case tvKey.KEY_DOWN :
			alert("down");
			if(topIndex==1)	//in menu section
			{
				if(indexCat==5)
				{
					break;
				}
				else
				{
					if(indexCat>=0)
					{
						alert("indexCat: " + indexCat);
						indexCat++;
						$('#rightMenuBG').animate({
											top: $('li:eq('+indexCat+')').position().top,
											
										  }, 500, function() {
											// Animation complete.
										  });
						break;
					}
					break;
				}
			}
			else			//in result section
			{
				if(row == rsltRow)		//LAST ROW
				{
					alert("Can not go down, last row detected");
					break;
				}
				else
				{
					if(row==rsltRow - 1 && col==3 && lastRowRslt==2)
					{
						alert("CANNOT GO DOWN - NO RESULT BELOW");
						break;
					}
					if(row==rsltRow - 1 && col==2 && lastRowRslt==1)
					{
						alert("CANNOT GO DOWN - NO RESULT BELOW");
						break;
					}
					if(row==rsltRow - 1 && col==3 && lastRowRslt==1)
					{
						alert("CANNOT GO DOWN - NO RESULT BELOW");
						break;
					}
					if(row==1 || row==2)
					{
						document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
						document.getElementById("textBox_"+row+"_"+col).style.background ="black";
						row++;
						document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
						document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';
						alert("rsltRow: " + rsltRow + " Row: " + row + " Col: " +col);
						alert("DONT MOVE");
						break;
					}
					else
					{
							document.getElementById("box_"+row+"_"+col).style.borderColor = "black";
							document.getElementById("textBox_"+row+"_"+col).style.background ="black";
							row++;
							document.getElementById("box_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,0.7)';
							document.getElementById("textBox_"+row+"_"+col).style.background ='rgba(19,126,203,0.7)';
							$("#innerLeftBox").animate({"top": "-=180px"}, "fast");						
							alert("rsltRow: " + rsltRow + " Row: " + row + " Col: " +col);
							alert("MOVE");
							break;
					}
				}
			}
						
		/////////////////////////////////////////////////// KEY_RETURN
		case tvKey.KEY_RETURN :
		case tvKey.KEY_PANEL_RETURN:
			alert("return");
			widgetAPI.blockNavigation(event);
			window.location.href = "index.html";
			break;
			
		/////////////////////////////////////////////////// KEY_ENTER
		case tvKey.KEY_ENTER:
            alert('enter');
			if(topIndex==1)	//in menu section
			{
				document.getElementById("innerLeftBox").setAttribute("style", "marginTop: 0px");
				for(var i=0;i<arrayCat.length;i++)
				{
					document.getElementById(arrayCat[i]).style.color="#eee9e9";
				}
				document.getElementById(arrayCat[indexCat]).style.color="#fb1f6c";
				
				doOnce=true;
				row=1;
				col=1;
				clickCat(arrayCatHeb[indexCat]);
			}
			else			//in result section
			{
				var bid = document.getElementById('businessId_'+row+'_'+col+'').innerHTML;	//click on restaurant
				window.location.href = "menu.html?buisnessId="+bid+"&catName="+arrayCat[indexCat]+"";
			}
			break;
		default :
			break;
	}
}

//SAMSUNG SMART TV FUNCTIONS - END

function clickCat(catname)
{
		//$('#loadingImage').sfLoading('show');
		
		$('#blackBG').show();
		$('#loading').show();
		
		catName = catname;
		//document.getElementById("debug").innerHTML += ">>going to $.getJSON";
		$.getJSON('http://www.mishlohim.co.il/MishlohimService2.svc/SubCategories/Mishlohim_Mishlohim/1?format=json',
				subCatParser
			);	//document.getElementById("debug").innerHTML += ">>end of CLICKCAT";
}

function subCatParser(subCatData)  
	{
		//document.getElementById("debug").innerHTML += ">>inside SUBCATPARSER";
		$.each(subCatData, function(ind,record)
		{
		 	if(this.SubCategoryName.search(catName) != -1)
		 	{
		 		catID = this.SubCategoryID;
		 	} 
		});
		//document.getElementById("debug").innerHTML += ">>going to $.getJSON";
		$.getJSON("http://www.mishlohim.co.il/MishlohimService2.svc/Areas/Mishlohim_Mishlohim?format=json", 
				areaIdParser
		 	);
	}

function areaObject(ID,NAME)
{
	this.ID=ID;
	this.NAME=NAME;
}

function areaIdParser(areaData) 
{
	//document.getElementById("debug").innerHTML += ">>inside AREAIDPARSER = " + topIndex;
	$.each(areaData, function(ind,record)
	{
	 	areaArr[ind] = new areaObject(this.ID,this.Name); // -areaArr- holds array of catID+catName 	
	});
	$.ajax({
                url: "http://www.mishlohim.co.il/MishlohimService2.svc/Search?format=json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"authentication":"Mishlohim_Mishlohim","searchHelper":{"AreaID":"'+areaId+'","SubCategoryID":"'+catID+'","CategoryID":"1"}}',
                processData: true,
                async: true, 
                success: function(businessData) {
                	businessParser(businessData);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                }
            });	     	          	
}

function businessObject(Id,BusinessName,AddressStreetName,BusinessPhone,LogoFileName,Picture,Notes,Open24Hours,AcceptOnlineOrders,AreaID,MinimumPriceForDelivery,DMinimumPriceForDelivery,deliveryPrice,HasTakeAway,KeyWords,Kosher)
{
	this.Id=Id; 																	//1
	this.BusinessName=BusinessName;													//2		
	this.AddressStreetName=AddressStreetName;										//3
	this.BusinessPhone=BusinessPhone;												//4	
	this.LogoFileName="http://www.mishlohim.co.il/img/logos/"+LogoFileName; 		//5
	this.Picture="http://www.mishlohim.co.il/img/logos/"+Picture; 					//6
	this.Notes=Notes;																//7
	this.Open24Hours=Open24Hours;													//8
	this.AcceptOnlineOrders=AcceptOnlineOrders;										//9
	this.AreaID=AreaID;																//10
	this.MinimumPriceForDelivery=MinimumPriceForDelivery; 							//11
	this.DMinimumPriceForDelivery=DMinimumPriceForDelivery;							//12
	this.deliveryPrice=deliveryPrice;												//13
	this.HasTakeAway=HasTakeAway; 													//14
	this.KeyWords=KeyWords; 														//15
	this.Kosher=Kosher; 															//16						
}


function businessParser(businessData)
{
		
		var j=0;
		
		$.each(businessData, function(ind,record){
			$('.innerBox').remove();
						
			for(j;j<record.length;j++)
			{
				businessArray[j] = new businessObject
				(	this[j].Id,
					this[j].BusinessName,
					this[j].AddressStreetName,
					this[j].BusinessPhone,
					this[j].LogoFileName,
					this[j].Picture,
					this[j].Notes,
					this[j].Open24Hours,
					this[j].AcceptOnlineOrders,
					this[j].AreaID,
					this[j].MinimumPriceForDelivery,
					this[j].DMinimumPriceForDelivery,
					this[j].deliveryPrice,
					this[j].HasTakeAway,
					this[j].KeyWords,
					this[j].Kosher
				);
			
				var isKosher;
				if(businessArray[j].Kosher)
						isKosher = "כשר";
					else
						isKosher = "לא כשר"
				
				$('#innerLeftBox').append 
					(
					   '<div id="box_'+row+'_'+col+'" class="innerBox"><img class="imgRest" src="'+businessArray[j].LogoFileName+'">'
						+'<div id="textBox_'+row+'_'+col+'" class="box">'+businessArray[j].BusinessName+'<br>'+
						businessArray[j].AddressStreetName+'</div><p id="businessId_'+row+'_'+col+'" class="businessId">'+businessArray[j].Id+'</div>' 
					)	
				
				if(doOnce)
				{
					doOnce = false;
					rsltNum = record.length;													//initialize the variable with category result number;
					var mainDivRsltWidth = document.getElementById("leftBox").offsetWidth;		//get main div width
					var rsltDivWidth = $(".innerBox").width();									//get result div width
					var rsltDivMargLeft = $(".innerBox").css('marginLeft');						//get result div margin-left
					var rsltDivMargLeftNum = parseFloat(rsltDivMargLeft);						//convert margin-left to int (remove PX)
					var rsltTotalSpace = rsltDivWidth + rsltDivMargLeftNum;						
					rsltCol = mainDivRsltWidth/rsltTotalSpace;									//calculate cols number
					rsltCol = Math.round(rsltCol);												//round cols number
					rsltRow = rsltNum/rsltCol;													//calculate number of rows
					rsltRow = Math.ceil(rsltRow);												//round up number of rows
					lastRowRslt = rsltNum%rsltCol;												//Calculate last row results
				}
				
				//alert("DIV["+row+"]["+col+"] ");
				
				var newJ = j+1;
				if(newJ%rsltCol==0)
				{
					col=1;
					row++;
				}
				else
				{
					col++;
				}
			}	
		});
		
		// reset row and col after initialization of all the result div's to enable use of the remote control
		row=1;
		col=1;
		
		//hide loading image
		//$('#loadingImage').sfLoading('hide');
		$('#blackBG').hide();
		$('#loading').hide();
	}

	