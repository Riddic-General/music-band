
function highlightPage(){
	
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
	
	var headers=document.getElementsByTagName("header");
	if(headers.length==0)return false;
	
	var nav=headers[0].getElementsByTagName("nav");
	if(nav.length==0)return false;
	var links=nav[0].getElementsByTagName("a");
	
    var linkurl;
    for(var i=0;i<links.length;i++){
    	
    	linkurl=links[i].getAttribute("href");
    	//get the address of the current window,you can use the method of window.location.href
    	if(window.location.href.indexOf(linkurl)!=-1){
    		//we can use it set the class name;
    		links[i].className="here";
    		//we can get a different id for each page! get the text  of href and change it for lowercase
    		var linktext=links[i].lastChild.nodeValue.toLowerCase();
    		document.body.setAttribute("id",linktext);
    		
    	}
    }
    
}

function moveElement(elementID,final_x,final_y,interval){
	
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
		
	}
	if(!elem.style.left){
		elem.style.left="0px"
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x && ypos==final_y){
		return true;
	}
	
	if(xpos < final_x){
		var dist=Math.ceil((final_x-xpos)/10);
		xpos = xpos+dist;
	}
	
	if(xpos > final_x){
		var dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	
	if(ypos < final_y){
		var dist=Math.ceil((final_y-ypos)/10);
		ypos = ypos+dist;
	}
	
	if(ypos > final_y){
		var dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	
	elem.style.top=ypos+"px";
	elem.style.left=xpos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow(){
	
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
    var intro=document.getElementById("intro");
    if(!intro)return false;
    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    
//  var frame =document.createElement("img");
//  frame.setAttribute("src","img/image7.jpg");
//  frame.setAttribute("alt"," ");
//  frame.setAttribute("id","frame");
//  slideshow.appendChild(frame);
    
    var preview=document.createElement("img");
    preview.setAttribute("src","img/image10.jpg");
    preview.setAttribute("alt","a glimpse of what awits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    
    var links=intro.getElementsByTagName("a");
    var destination;
    //alert("ppp"+links[0]);
    for(var i=0;i<links.length;i++){
    	links[i].onmouseover =function(){
    		//here the "this" can't  instead of links[i]
    		destination=this.getAttribute("href");
    		if(destination.indexOf("index.html") != -1){
    			
    			moveElement("preview",0,0,5);
    		}
    		if(destination.indexOf("about.html") != -1){
    			moveElement("preview",-100,0,5);
    		}
    		if(destination.indexOf("photos.html") != -1){
    			moveElement("preview",-200,0,5)
    		}
    		if(destination.indexOf("live.html") != -1){
    			moveElement("preview",-300,0,5);
    		}
    		if(destination.indexOf("contact.html") != -1){
    			moveElement("preview",-400,0,5);
    		}
    	}
    }
}


function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id") != id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}

function prepareInternalnav(){
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
	var articles=document.getElementsByTagName("article");
	if(articles.length==0)return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0)return false;
	var nav=navs[0];
	var links=nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId))continue;
		document.getElementById(sectionId).style.display="none";
		//此处由于变量sectionId的作用域的问题，在下面的function中需要传入sectionId，但是当执行onclick方法的时候sectionId的作用已经不能作用在这个方法了
		//解决方法是创建一个自定义变量links[i].destination
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}

function preparePlaceholder(){
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
	if(!document.createElement)return false;
	if(!document.createTextNode)return false;
	if(!document.getElementById("imagegallery"))return false;
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","/img/image16.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
    
}
function showPic(whichpic){
	
	if(!document.getElementById("placeholder"))return false;
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	//在写此处的时候由于没有写src造成错误
	placeholder.setAttribute("src", source);
    if(whichpic.getAttribute("title")){
    	var text=whichpic.getAttribute("title");
    }else{
    	var text=" ";
    }
    
    var description=document.getElementById("description");
    if(description.firstChild.nodeType==3){
    	description.firstChild.nodeValue= text;
    }
    return false;
}

function prepareGallery(){
	
	if(!document.getElementsByTagName)return false;
	if(!document.getElementById)return false;
	if(!document.getElementById("imagegallery"))return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}


//live
function stripeTables(){
	
	if(!document.getElementsByTagName)return false;
	var tables=document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd = false;
		var rows=tables[i].getElementsByTagName("tr");
		//alert(rows.length);
		for(var j=0;j<rows.length;j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
		}
		
	}
}


function highlightRows(){
	
	if(!document.getElementsByTagName)return false;
	var rows=document.getElementsByTagName("tr");
	//alert(rows.length);
	for(var i=0;i<rows.length;i++){
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		}
	}
}


function insertAfter(newElement,targetElement){
	var parent= targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
		
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}


function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else{
		newClassName=element.value;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}


function addLoadEvent(func){
	var oldonload= window.onload;
	if(typeof window.onload !='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}


addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
//addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);