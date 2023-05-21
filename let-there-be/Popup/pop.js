
///*
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value*100 + "%"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  let val = this.value;
  let params = {
                active: true,
                currentWindow: true
            }
  chrome.tabs.query(params, gotTabs);

  function gotTabs(tabs){

    let msg = {
        value : val
    }

    chrome.tabs.sendMessage(tabId = tabs[0].id, message = msg);
  }
}
//*/


///////////////////////////////////////////////////////////////////////////////////
/*
let slider1

let brightness = 1
let isChanging = false

document.addEventListener('DOMContentLoaded', function() 
{
	slider1 = qs('#slider')
	brightness = slider1.value
	slider1.addEventListener('change', () => 
	{
		if (!isChanging)
		{
			isChanging = true
			brightness = slider1.value
			change()
			isChanging = false			
		}
	})
	waitLoading = setInterval (() => get(), 100)	
}, false);
function get()
{
	chrome.tabs.query
	(
		{active: true, currentWindow: true}, 
		function(tabs) 
		{
			chrome.tabs.sendMessage
			(
				tabs[0].id,
				{func: "get"}, 
				function(response) 
				{
					if (chrome.runtime.lastError)
						return false
					else
					{
						clearInterval(waitLoading)
						if (response.brightness != "")
						{
							brightness = response.brightness
							slider1.value = brightness
						}
						return true
					}
				}
			);
		}
	);
}
function change()
{
	chrome.tabs.query
		(
			{active: true, currentWindow: true}, 
			function(tabs) 
			{
				chrome.tabs.sendMessage
				(
					tabs[0].id, {func:"change", brightness: brightness}
				);
			}
		);
}
function qs(sel)
{
	return document.querySelector(sel)
}

//*/