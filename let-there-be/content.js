class TextObfuscator {
	constructor() {
		this.originalTextMap = new Map();
	}
	obfuscate(probability) {
		const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
		let node;

		while (node = textNodes.nextNode()) {
			if (!this.originalTextMap.has(node)) {
				this.originalTextMap.set(node, node.nodeValue);
			}
			const originalText = this.originalTextMap.get(node);
			if (originalText.trim() !== '') {

				let obfuscatedText = '';
				for (let i = 0; i < originalText.length; i++) {
					let char = originalText.charAt(i);
					if (/\w/.test(char) && Math.random() < probability) {
						//obfuscatedText += String.fromCharCode(Math.floor(Math.random() * 93) + 33);
						obfuscatedText += "■";
					} else {
						obfuscatedText += char;
					}
				}

				node.nodeValue = obfuscatedText;
			}
		}
	}
	restore() {
		for (const [node, originalText] of this.originalTextMap) {
			node.nodeValue = originalText;
		}
		this.originalTextMap.clear();
	}
}
const textObfuscator = new TextObfuscator();


//跳轉空白
///*
//const init= 
function init() {

	const injectElement = document.createElement('div');
	injectElement.className = 'Black-Overlay';
	injectElement.setAttribute('id', 'Black-Overlay');
	//document.body.appendChild(injectElement);

	//-------------------cursor start-------------------
	(function () {

		var parent = document.createElement('div');
		parent.id = "parent";

		var cover = document.createElement('div');
		cover.id = "cover";

		var cursor2 = document.createElement('div');
		cursor2.id = "cursor";
		cursor2.className = 'fade'

		//var cursor = document.createElement('div')
		//cursor.id = 'cursor'
		//cursor.className = 'fade'

		parent.appendChild(injectElement);
		parent.appendChild(cursor2);
		document.body.appendChild(parent);

		let timeout

		function handleMouseDown(event) {
			cursor.classList.add('mousedown')
		}

		function handleMouseUp(event) {
			cursor.classList.remove('mousedown')
		}

		function handleMouseEnter(event) {
			if (isInteractive(event.target)) cursor.classList.add('interactive')
		}

		function handleMouseLeave(event) {
			if (isInteractive(event.target)) cursor.classList.remove('interactive')
		}

		function handleMouseMove(event) {
			clearTimeout(timeout)
			cursor.classList.remove('fade')
			const top = event.pageY - (cursor.clientHeight / 2)
			const left = event.pageX - (cursor.clientWidth / 2)
			cursor.style.top = top + 'px'
			cursor.style.left = left + 'px'
			timeout = setTimeout(function () { cursor.classList.add('fade') }, 1500)
		}

		function isInteractive(el) {
			return !!(el.closest('a') || el.closest('button'))
		}

		// initialize
		window.addEventListener('mousemove', handleMouseMove)
		document.documentElement.addEventListener('mousedown', handleMouseDown, { capture: true })
		document.documentElement.addEventListener('mouseup', handleMouseUp, { capture: true })
		document.documentElement.addEventListener('mouseenter', handleMouseEnter, { capture: true })
		document.documentElement.addEventListener('mouseleave', handleMouseLeave, { capture: true })
		//document.body.appendChild(cursor)
	})()
	//-------------------cursor start-------------------
}
init();

function on() {
	document.getElementById("Black-Overlay").style.display = "block";
	document.getElementById("Black-Overlay").style.opacity = 1;
}
on();


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message) {
	const result = Math.random().toString(36).substring(2, 3);


	textObfuscator.obfuscate(message.value);

	console.log(result);
	// if (message.value <= 0.5) {
	// 	replaceText("R", "!");
	// 	replaceText("I", "@");
	// 	replaceText("#", "d");
	// } else if (message.value >= 0.5 && message.value <= 0.8) {
	// 	replaceText("D", "#");
	// }
	//document.body.style.backgroundColor = "rgba(0, 0, 0, "+(1 - message.value)+")"; //To change opacity with slider value. Using (1 - value) for UX of lesser value being darker shade.
	//document.body.style.backgroundColor = "RED"; //To change opacity with slider value. Using (1 - value) for UX of lesser value being darker shade.
	document.getElementById("Black-Overlay").style.opacity = (1 - message.value); //To change opacity with slider value. Using (1 - value) for UX of lesser value being darker shade.
}

//*/

function replaceText(findWord, replaceWord) {
	var textnodes = getTextNodes();
	var findRE = new RegExp(findWord, "gi")

	for (var i = 0; i < textnodes.length; i++) {
		var text = textnodes[i].nodeValue;
		textnodes[i].nodeValue = text.replace(findRE, replaceWord);
	}

}
function getTextNodes() {
	// get all html elements
	var elements = document.querySelectorAll("body, body *");
	var results = [];

	//loop through the elements children nodes
	for (var i = 0; i < elements.length; i++) {
		var child = elements[i].childNodes[0];

		// grab everything that's a textNode (nodeType is "3")
		if (elements[i].hasChildNodes() && child.nodeType == 3) {
			results.push(child);
		}
	}
	return results;
}

//////////////////////////////////////////////////////////////

//
/*變灰
let domain
let index
let siteBrigths
let brightness = 1
let namataStyle
let head

function changeBrightness()
{
	namataStyle = document.querySelector("#namataStyle")
	if (namataStyle)
		namataStyle.remove()
	if (brightness<1)
	{
		namataStyle = document.createElement('style')
		namataStyle.id = "namataStyle"
		namataStyle.innerHTML += `html:before {
			content: " ";
			width: 100vw;
			height: 100vh;
			z-index: 2147483647;
			pointer-events: none;
			position: fixed;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, ${1-brightness});
		  }`
		let waitLoading = setInterval (() => 
		{
			head = document.querySelector('head')
			if (head)
			{
				head.prepend(namataStyle)
				clearInterval(waitLoading)
			}
		}, 0)
	}
}
initLoad()
function initLoad()
{
	domain = document.domain
	siteBrights = fromLS()
	index = siteBrights.findIndex(sb => sb.domain == domain)
	if (index>=0)
	{
		brightness = siteBrights[index].brightness
		siteBrights[index].brightness 
		changeBrightness()
	}
}
chrome.runtime.onMessage.addListener
(
	function(req, sender, sendResponse)
	{
		if (req.func == "change")
		{
			brightness = +req.brightness
			if (brightness<1)
				setSiteBright()
			else removeSiteBright()
		}
		else if (req.func == "get")
				sendResponse({brightness:brightness})
	}
)

class siteBright
{
	constructor(domain, brightness)
	{
		this.domain = domain
		this.brightness = brightness
	}
}
function fromLS ()
{
	let string = localStorage["sitebrights"]
	return string ? JSON.parse(string) : []
}
function toLS ()
{
	localStorage["sitebrights"]=JSON.stringify(siteBrights)
}
function setSiteBright ()
{
	siteBrights = fromLS()
	let index = siteBrights.findIndex(sb => sb.domain == domain)
	if (index>=0)
		siteBrights[index].brightness = brightness
	else 
		siteBrights.push(new siteBright(domain, brightness))	
	changeBrightness()
	toLS()
}
function removeSiteBright ()
{
	siteBrights = fromLS()
	siteBrights = siteBrights.filter(siteBright => siteBright.domain!=domain)
	changeBrightness()
	toLS()
}
//*/
