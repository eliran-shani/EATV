var menuBusinessDetails;        		//holds business details 
var menuCategoryId = new Array();		//holds an array of category ids and names

var arrayCat = ['pizzaL','sushiL','burgerL','pastaL','fireL','chinaL'];
var arrayCatHeb = ['פיצה','סושי','המבורגר','פסטה','שווארמה','סיני'];

var widgetAPI = new Common.API.Widget();	//TV REQUIERED
var tvKey = new Common.API.TVKeyValue();	//TV REQUIERED

var topIndex = 2;			//the index that define on what section you at - start position = 2 - RIGHT MENU CATEGOREIS SECTION
var busName;				//hold bussines name for breadcrumb
var totalCatNum=0;			//get total category number - right menu
var rightMenuIndex = 0;		//use to navigate the right menu up and down - start position = 0

var doOnce = true;
var col=1;
var row=1;
var rsltNum;
var rsltCol;
var rsltRow;
var lastRowRslt;

//SAMSUNG SMART TV FUNCTIONS - START

var Main = 
{
}

Main.onLoad = function()
{
	//Loading Image
	//$('#loadingImage').sfLoading();
		
	// To enable the key event processing
	document.getElementById("anchor").focus();
	
	// Set Default key handler function
	widgetAPI.sendReadyEvent();
	
	// parse URL param
	var busId = getParam("buisnessId");
	var catName = getParam("catName");
	var catNameHeb;
		
	for (var i=0; i<arrayCat.length; i++) 
	{
			if(arrayCat[i]==catName)
			{
				catNameHeb=arrayCatHeb[i];
			}
	};
	
	alert("BUSSINES ID: " + busId);
	showBusinessID(busId);
	document.getElementById("breadcrumb").innerHTML +=" \\ " +catNameHeb;
}

// return a parameter value from the current URL
function getParam ( sname )
{
  var params = location.search.substr(location.search.indexOf("?")+1);
  var sval = "";
  params = params.split("&");
    // split param and value into individual pieces
    for (var i=0; i<params.length; i++)
       {
         temp = params[i].split("=");
         if ( [temp[0]] == sname ) { sval = temp[1]; }
       }
  return sval;
}

function showBusinessID(busId)			
{
		//$('#loadingImage').sfLoading('show');
				
		$('#blackBG').show();
		$('#loading').show();
	
		$.getJSON('http://www.mishlohim.co.il/MishlohimService2.svc/Businesses/Mishlohim_Mishlohim/'+busId+'?format=json',
				busIdParser
			);	
}

function busIdParser(busData)  
{
	var k=0;
	$.each(busData, function(ind,record)
	{
		menuBusinessDetails = new menuBusinessObject
		(
			this.Id=busData.Id,
			this.BusinessName=busData.BusinessName,
			this.AddressStreetName=busData.AddressStreetName,
			this.BusinessCategory=busData.BusinessCategory,		//array of categories
			this.BusinessDelivery=busData.BusinessDelivery,		//array of areaIds
			this.BusinessOpenHours=busData.BusinessOpenHours,	//array of 7 days
			this.BusinessPhone=busData.BusinessPhone,
			this.BusinessSiteURL=busData.BusinessSiteURL,
			this.Kosher=busData.Kosher,
			this.LogoFileName=busData.LogoFileName,
			this.MinimumPriceForDelivery=busData.MinimumPriceForDelivery,
			this.Open24Hours=busData.Open24Hours,
			this.PercentOrderFee=busData.PercenerFee,
			this.Picture=busData.Picture,
			this.deliveryPrice=busData.deliveryPrice,
			this.eMail=busData.eMail
		);
		
		busName = busData.BusinessName
		
		if(ind == "BusinessCategory")
		{
			for(k;k<record.length;k++)
			{
				menuCategoryId[k] = new menuObject
				(	
					this[k].CategoryID,
					this[k].CategoryName,
					this[k].Products
				);
			}
		}		
	});
	document.getElementById("breadcrumb2").innerHTML +="תפריט " + busName;
	totalCatNum = menuCategoryId.length;
	appendProducts();
}	

function appendProducts()			//creates results in left box for the first load
{
	for(var i=0;i<menuCategoryId.length;i++)
	{
		var catId = menuCategoryId[i].CategoryID;
		$('#menuNavList').append 
		(
		 '<li id="category_'+i+'" class="menuNavListItem" onclick="appendAgain('+catId+')">'	//TODO: MOVE ON CLICK TO REMOTE CONTROL
		 +menuCategoryId[i].CategoryName+'</li>'
		)
	}
	
	document.getElementById("category_0").style.color="#fb1f6c";
	
	for(var j=0;j<BusinessCategory[0].Products.length;j++)
	{
		if(doOnce)
		{
			doOnce = false;
			rsltNum = BusinessCategory[0].Products.length;
		}
		var newJ = j+1;
				
		if(BusinessCategory[0].Products[j].PictureFileName == null || BusinessCategory[0].Products[j].PictureFileName == "")	//IF PIC NOT EXIST USE FIXED ONE
		{
			if(BusinessCategory[0].Products[j].Title == null || BusinessCategory[0].Products[j].Title == ""  || BusinessCategory[0].Products[j].Title.length < 3)
			{	
				BusinessCategory[0].Products[j].Title = "מוצר לא זמין";
			}
			var noPic = "resource/images/menu/nopic.jpg";
			
			$('#menuLeftBox').append 
			(
			 '<div id="menuResultBox_'+row+'_'+col+'" class="menuResultBox"><div class="menuResultBoxImage"><img class="menuImg" src="'+noPic+'"></div>'
			 +'<div id="menuResultBoxText_'+row+'_'+col+'" class="menuResultBoxText">'+BusinessCategory[0].Products[j].Title+'</div></div>' 
			)
			alert("BOX["+row+"]["+col+"]");				
		}
		else	//IF PIC EXISTS - USE REST PIC
		{
			if(BusinessCategory[0].Products[j].Title == null || BusinessCategory[0].Products[j].Title == ""  || BusinessCategory[0].Products[j].Title < 3)
			{	
				BusinessCategory[0].Products[j].Title = "מוצר לא זמין";
			}
			var restPic = "http://www.mishlohim.co.il/img/menu/"+BusinessCategory[0].Products[j].PictureFileName;
			
			$('#menuLeftBox').append 
			(
			 '<div id="menuResultBox_'+row+'_'+col+'" class="menuResultBox"><div class="menuResultBoxImage"><img class="menuImg" src="'+restPic+'"></div>'
			 +'<div id="menuResultBoxText_'+row+'_'+col+'" class="menuResultBoxText">'+BusinessCategory[0].Products[j].Title+'</div></div>' 
			)
			alert("BOX["+row+"]["+col+"]");
		}
		
		var mainDivRsltWidth = document.getElementById("menuLeftBox").offsetWidth;		//get main div width
		//alert("mainDivRsltWidth: " + mainDivRsltWidth);
		var rsltDivWidth = $(".menuResultBox").width();									//get result div width
		//alert("rsltDivWidth: " + rsltDivWidth);
		var rsltDivMargLeft = $(".menuResultBox").css('marginLeft');					//get result div margin-left
		//alert("rsltDivMargLeft: " + rsltDivMargLeft);
		var rsltDivMargLeftNum = parseFloat(rsltDivMargLeft);							//convert margin-left to int (remove PX)
		//alert("rsltDivMargLeftNum: " + rsltDivMargLeftNum);
		var rsltTotalSpace = rsltDivWidth + rsltDivMargLeftNum;	
		//alert("rsltTotalSpace: " + rsltTotalSpace);
		rsltCol = mainDivRsltWidth/rsltTotalSpace;									//calculate cols number
		rsltCol = Math.round(rsltCol);												//round cols number
		rsltRow = rsltNum/rsltCol;													//calculate number of rows
		rsltRow = Math.ceil(rsltRow);												//round up number of rows
		lastRowRslt = rsltNum%rsltCol;												//Calculate last row results
		
		//alert("rsltNum: " + rsltNum + "rsltCol: " + rsltCol + "rsltRow: " + rsltRow + "lastRowRslt: " + lastRowRslt);
	
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
	addRightMenuBGStart(0);
	
	// reset row and col after initialization of all the result div's to enable use of the remote control
	row=1;
	col=1;
	
	//$('#loadingImage').sfLoading('hide');
	
	$('#blackBG').hide();
	$('#loading').hide();
}

function appendAgain(catId)
{
	//$('#loadingImage').sfLoading('show');
	
	$('#blackBG').show();
	$('#loading').show();
	
	$('.menuResultBox').remove(); //clear all results from leftbox
	
	for(var j=0;j<menuCategoryId[catId].Products.length;j++)
	{	
		rsltNum = BusinessCategory[catId].Products.length;
		var newJ = j+1;	
		
		if(menuCategoryId[catId].Products[j].PictureFileName == null || menuCategoryId[catId].Products[j].PictureFileName == "")	//IF PIC NOT EXIST USE FIXED ONE
		{
			if(menuCategoryId[catId].Products[j].Title == null || menuCategoryId[catId].Products[j].Title == "" || menuCategoryId[catId].Products[j].Title.length < 3)
			{	
				menuCategoryId[catId].Products[j].Title = "מוצר לא זמין";
			}
			
			var noPic = "resource/images/menu/nopic.jpg";
			
			$('#menuLeftBox').append 
			(
			 '<div id="menuResultBox_'+row+'_'+col+'" class="menuResultBox"><div class="menuResultBoxImage"><img class="menuImg" src="'+noPic+'"></div>'
			 +'<div id="menuResultBoxText_'+row+'_'+col+'" class="menuResultBoxText">'+menuCategoryId[catId].Products[j].Title+'</div></div>' 
			)
			alert("BOX["+row+"]["+col+"]");
		}
		else	//IF PIC EXISTS - USE REST PIC
		{
			if(menuCategoryId[catId].Products[j].Title == null || menuCategoryId[catId].Products[j].Title == "" || menuCategoryId[catId].Products[j].Title < 3)
			{	
				menuCategoryId[catId].Products[j].Title = "מוצר לא זמין";
			}
			var restPic = "http://www.mishlohim.co.il/img/menu/"+menuCategoryId[catId].Products[j].PictureFileName;
			
			$('#menuLeftBox').append 
			(
			 '<div id="menuResultBox_'+row+'_'+col+'" class="menuResultBox"><div class="menuResultBoxImage"><img class="menuImg" src="'+restPic+'"></div>'
			 +'<div id="menuResultBoxText_'+row+'_'+col+'" class="menuResultBoxText">'+menuCategoryId[catId].Products[j].Title+'</div></div>' 
			)
			alert("BOX["+row+"]["+col+"]");
		}
		
		var mainDivRsltWidth = document.getElementById("menuLeftBox").offsetWidth;		//get main div width
		//alert("mainDivRsltWidth: " + mainDivRsltWidth);
		var rsltDivWidth = $(".menuResultBox").width();									//get result div width
		//alert("rsltDivWidth: " + rsltDivWidth);
		var rsltDivMargLeft = $(".menuResultBox").css('marginLeft');					//get result div margin-left
		//alert("rsltDivMargLeft: " + rsltDivMargLeft);
		var rsltDivMargLeftNum = parseFloat(rsltDivMargLeft);							//convert margin-left to int (remove PX)
		//alert("rsltDivMargLeftNum: " + rsltDivMargLeftNum);
		var rsltTotalSpace = rsltDivWidth + rsltDivMargLeftNum;	
		//alert("rsltTotalSpace: " + rsltTotalSpace);
		rsltCol = mainDivRsltWidth/rsltTotalSpace;									//calculate cols number
		rsltCol = Math.round(rsltCol);												//round cols number
		rsltRow = rsltNum/rsltCol;													//calculate number of rows
		rsltRow = Math.ceil(rsltRow);												//round up number of rows
		lastRowRslt = rsltNum%rsltCol;												//Calculate last row results
		
		//alert("rsltNum: " + rsltNum + "rsltCol: " + rsltCol + "rsltRow: " + rsltRow + "lastRowRslt: " + lastRowRslt);
		
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
	
	// reset row and col after initialization of all the result div's to enable use of the remote control
	row=1;
	col=1;
	
	//$('#loadingImage').sfLoading('hide');
	$('#blackBG').hide();
	$('#loading').hide();
}

function addRightMenuBGStart(index)
{
	var menuItem = $('#category_'+index);
	var itemPosition = menuItem.position();
	var itemWidth = $('#category_'+index).css("width");
	var itemHeight = $('#category_'+index).css("height");
	$('#menuRightMenuBG').css("width",itemWidth);
	$('#menuRightMenuBG').css("height",itemHeight);
	$('#menuRightMenuBG').css("top",itemPosition.top);	
}


function addRightMenuBG(index)
{
	var itemWidth = $('#category_'+index).css("width");
	var itemHeight = $('#category_'+index).css("height");
	$('#menuRightMenuBG').css("width",itemWidth);
	$('#menuRightMenuBG').css("height",itemHeight);
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
			if(topIndex==2)	//	RIGHT MENU CATEGORY SECTION
			{
				alert("row: " + row + " col: " +col);
				document.getElementById("menuRightMenuBG").style.visibility = 'hidden';
				topIndex=1;
				document.getElementById("menuResultBox_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,1)';			
				document.getElementById("menuResultBoxText_"+row+"_"+col).style.background = 'rgba(19,126,203,1)';
			}
			if(topIndex==1)	//	CATEGORY RESULTS SECTION
			{
				
				if (col == 2) 
				{
					col=1;
					document.getElementById("menuResultBox_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,1)';			
					document.getElementById("menuResultBoxText_"+row+"_"+col).style.background = 'rgba(19,126,203,1)';
				}
			}
			if(topIndex==0)	//	MYORDER SECTION
			{
				alert("LEFT BORDER - CAN NOT MOVE LEFT");
			}
			break;
			
		
		/////////////////////////////////////////////////// KEY_RIGHT
		case tvKey.KEY_RIGHT :
			alert("right");
			if(topIndex==2)	//	RIGHT MENU CATEGORY SECTION
			{
				alert("RIGHT BORDER - CAN NOT MOVE RIGHT");
			}
			if(topIndex==1)	//	CATEGORY RESULTS SECTION
			{
				if (col == 2) // category results left boarder
				{
					topIndex=2;
				}
				if (col == 1) 
				{
					col=2;
					document.getElementById("menuResultBox_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,1)';			
					document.getElementById("menuResultBoxText_"+row+"_"+col).style.background = 'rgba(19,126,203,1)';
				}
			}
			if(topIndex==0)	//	MYORDER SECTION
			{
			
			}
			break;
			
		/////////////////////////////////////////////////// KEY_UP
		case tvKey.KEY_UP :
			alert("up");
			if(topIndex==2)	//	RIGHT MENU CATEGORY SECTION
			{
				if(rightMenuIndex>0)
				{
					rightMenuIndex--;
								
					alert("rightMenuIndex: " + rightMenuIndex);
					
					$('#menuRightMenuBG').animate({
										top: $('li:eq('+rightMenuIndex+')').position().top,
										height: $('#category_'+rightMenuIndex).css("height"),
										width: $('#category_'+rightMenuIndex).css("width")
											}, 500, function() {
											// Animation complete.
										  });
										  
					var menuTop = $("#menuNavList").position().top;
					menuTop = menuTop + 0.00213623046875;
					menuTop = menuTop*(-1);
					var liPosTop = $('li:eq('+rightMenuIndex+')').position().top;
					var liHeight = $('li:eq('+rightMenuIndex+')').height();
					
					alert("menuTop: " + menuTop + " liPosTop: " + liPosTop + " liHeight: " + liHeight);
					
					if(menuTop > liPosTop) //menu item is out of div - so move list down
					{
						$("#menuNavList").animate({"top": "+="+(liHeight+15)+"px"}, "fast");
					}
				}
				else
				{
					alert("TOP BORDER - START OF CATEGORY LIST");
				}
			}
			if(topIndex==1)	//	CATEGORY RESULTS SECTION
			{
				if(row=1)
				{
					alert("TOP BORDER - START OF CATEGORY RESULTS");
				}
				if(row>1)
				{
					row--;
					document.getElementById("menuResultBox_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,1)';			
					document.getElementById("menuResultBoxText_"+row+"_"+col).style.background = 'rgba(19,126,203,1)';
				}
				
			}
			if(topIndex==0)	//	MYORDER SECTION
			{
			
			}
			break;
			
		/////////////////////////////////////////////////// KEY_DOWN
		case tvKey.KEY_DOWN :
			alert("down");
			if(topIndex==2)	//	RIGHT MENU CATEGORY SECTION
			{
				if(rightMenuIndex<totalCatNum-1)
				{
					rightMenuIndex++;
					//rightMenuIndex=0;
					
					alert("rightMenuIndex: " + rightMenuIndex);
					$('#menuRightMenuBG').animate({
										top: $('li:eq('+rightMenuIndex+')').position().top,
										height: $('#category_'+rightMenuIndex).css("height"),
										width: $('#category_'+rightMenuIndex).css("width")
											}, 500, function() {
											// Animation complete.
										  });
							
					var divHeight = $("#menuRightBox").height();
					var liPosTop = $('li:eq('+rightMenuIndex+')').position().top;
					var liHeight = $('li:eq('+rightMenuIndex+')').height();
					var liBottom = liPosTop + liHeight + 20;
					alert("divHeight: " + divHeight + " liPosTop: " + liPosTop + " liHeight: " + liHeight + " liBottom: " + liBottom);
					//var nextLiItemHeight = $('li:eq('+(rightMenuIndex+1)+')').height();
					
					if(liBottom > divHeight) //menu item is out of div - so move list down
					{
						$("#menuNavList").animate({"top": "-="+(liHeight+20)+"px"}, "fast");
					}									
				}
				else
				{
					alert("BOTTOM BORDER - END OF CATEGORY LIST");
				}
			}
			if(topIndex==1)	//	CATEGORY RESULTS SECTION
			{
				if(row<rsltRow)
				{
					row++;
					document.getElementById("menuResultBox_"+row+"_"+col).style.borderColor = 'rgba(19,126,203,1)';			
					document.getElementById("menuResultBoxText_"+row+"_"+col).style.background = 'rgba(19,126,203,1)';
				}
				if(row==rsltRow)
				{
					alert("BOTTOM BORDER - END OF CATEGORY RESULTS");
				}
			}
			if(topIndex==0)	//	MYORDER SECTION
			{
			
			}
			break;
			
		/////////////////////////////////////////////////// KEY_RETURN
		case tvKey.KEY_RETURN :
		case tvKey.KEY_PANEL_RETURN:
			alert("return");
			widgetAPI.blockNavigation(event);
			window.location.href = "popular.html";
			break;
			
		/////////////////////////////////////////////////// KEY_ENTER
		case tvKey.KEY_ENTER:
            alert('enter');
			if(topIndex==2)	//	RIGHT MENU CATEGORY SECTION
			{
				for(var i=0;i<menuCategoryId.length;i++)
				{
					document.getElementById("category_"+i).style.color="#eee9e9";
				}
				document.getElementById("category_"+rightMenuIndex).style.color="#fb1f6c";
				row=1;
				col=1;
				appendAgain(rightMenuIndex);
			}
			if(topIndex==1)	//	CATEGORY RESULTS SECTION
			{
			
			}
			if(topIndex==0)	//	MYORDER SECTION
			{
			
			}
			break;
		default :
			break;
	}
}

//SAMSUNG SMART TV FUNCTIONS - END

function menuObject(CategoryID,CategoryName,Products)
{
	this.CategoryID=CategoryID; 								//1
	this.CategoryName=CategoryName;								//2		
	this.Products=Products;										//3					
}

function menuBusinessObject (Id,BusinessName,AddressStreetName,BusinessCategory,BusinessDelivery,BusinessOpenHours,BusinessPhone,BusinessSiteURL,Kosher,LogoFileName,MinimumPriceForDelivery,Open24Hours,PercentOrderFee,Picture,deliveryPrice,eMail)
{
	this.Id=Id;
	this.BusinessName=BusinessName;
	this.AddressStreetName=AddressStreetName;
	this.BusinessCategory=BusinessCategory;		//array of categories
	this.BusinessDelivery=BusinessDelivery;		//array of areaIds
	this.BusinessOpenHours=BusinessOpenHours;	//array of 7 days
	this.BusinessPhone=BusinessPhone;
	this.BusinessSiteURL=BusinessSiteURL;
	this.Kosher=Kosher;
	this.LogoFileName="http://www.mishlohim.co.il/img/logos/"+LogoFileName;
	this.MinimumPriceForDelivery=MinimumPriceForDelivery;
	this.Open24Hours=Open24Hours;
	this.PercentOrderFee=PercentOrderFee;
	this.Picture=Picture;
	this.deliveryPrice=deliveryPrice;
	this.eMail=eMail;
}
	
