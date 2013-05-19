var widgetAPI = new Common.API.Widget();	//TV REQUIERED
var tvKey = new Common.API.TVKeyValue();	//TV REQUIERED
//sets the buttons array
var array = ['personalBtn','popularBtn','restaurantBtn','promotionsBtn'];
var index=0;

//SAMSUNG SMART TV FUNCTIONS - START

var Main = 
{
}

Main.onLoad = function()
{
	//help ticker - bottom of the screen
	//$('#helpTicker').sfKeyHelp({
	//	'user': 'SamSung SDK',  'red': 'Stop',  
    //    'green':'Start', 'enter': 'Enter','updown' :'UpDown',
    //    'return': 'Back'

	//});
	
	// To enable the key event processing
	document.getElementById("anchor").focus();
	
	// Set Default key handler function
	widgetAPI.sendReadyEvent();
	
	document.getElementById(array[index]).style.background ='rgba(64,207,246,0.5)';
	document.getElementById(array[index]).style.border = "solid";
	document.getElementById(array[index]).style.borderColor = "black";
	document.getElementById(array[index]).style.borderWidth="thin";
	$("#"+array[index]).animate({"margin-top": "-=30px"}, 300);
}

Main.onUnload = function()
{
	
}

Main.MainKeyHandler = function()
{
	var KeyCode = event.keyCode;

	switch(KeyCode)
	{
		case tvKey.KEY_LEFT :
		
			alert("left");
				if(index==3)
				{
				}
				else
				{
					if(index>=0)
					{
						document.getElementById(array[index]).style.background = 'rgba(0,0,0,0.5)';
						document.getElementById(array[index]).style.border = "solid";
						document.getElementById(array[index]).style.borderColor = "black";
						document.getElementById(array[index]).style.borderWidth="thin";
						$("#"+array[index]).animate({"margin-top": "+=30px"}, 300);
						index++;
						document.getElementById(array[index]).style.background = 'rgba(64,207,246,0.7)';
						document.getElementById(array[index]).style.border = "solid";
						document.getElementById(array[index]).style.borderColor = "black";
						document.getElementById(array[index]).style.borderWidth="thin";
						$("#"+array[index]).animate({"margin-top": "-=30px"}, 300);
					}
				}
			break;
		case tvKey.KEY_RIGHT :
		
			alert("right");
				if(index==0)
				{
				}
				else
				{
					if(index<=3)
					{
						document.getElementById(array[index]).style.background = 'rgba(0,0,0,0.5)';
						document.getElementById(array[index]).style.border = "solid";
						document.getElementById(array[index]).style.borderColor = "black";
						document.getElementById(array[index]).style.borderWidth="thin";
						$("#"+array[index]).animate({"margin-top": "+=30px"}, 300);
						index--;
						document.getElementById(array[index]).style.background = 'rgba(64,207,246,0.7)';
						document.getElementById(array[index]).style.border = "solid";
						document.getElementById(array[index]).style.borderColor = "black";
						document.getElementById(array[index]).style.borderWidth="thin";
						$("#"+array[index]).animate({"margin-top": "-=30px"}, 300);
					}
				}
			break;
		case tvKey.KEY_UP :
			alert('up');
			break;
		case tvKey.KEY_DOWN :
			alert('down');
			break;
		case tvKey.KEY_RETURN :
			alert('return');
			break;
		case tvKey.KEY_ENTER:
            alert('enter');
			if(array[index]=="personalBtn")
			{
				alert('personal');
			}
			if(array[index]=="popularBtn")
			{
				alert('popular');
				window.location.href = "popular.html";
			}
			if(array[index]=="restaurantBtn")
			{
				alert('rest');
			}
			if(array[index]=="promotionsBtn")
			{
				alert('promotions');
			}
			break;
		default :
			break;
	}
}

//SAMSUNG SMART TV FUNCTIONS - END