    window.onload = function() {
    	console.log("网页可见区域宽"+document.body.clientWidth);
    	console.log("网页可见区域高"+document.body.clientHeight);
    	console.log("网页可见区域宽（包括边线宽）"+document.body.offsetWidth);
    	console.log("网页可见区域高（包括边线高）"+document.body.offsetHeight);
    	console.log("网页正文全文宽"+document.body.scrollWidth);
    	console.log("网页正文全文高"+document.body.scrollHeight);
    	console.log("网页被卷去高"+document.body.scrollTop);
    	console.log("网页被卷去左"+document.body.scrollLeft);
    	console.log("网页正文部分上"+window.screenTop);
    	console.log("网页正文部分左"+window.screenLeft);
    	console.log("屏幕分辨率高"+window.screen.height);
    	console.log("屏幕分辨率宽"+window.screen.width);
    	console.log("屏幕可用工作区宽"+window.screen.availWidth);
    	console.log("屏幕可见工作区高"+window.screen.availHeight);

    	var music = document.getElementById('music');
    	var audio = document.getElementsByTagName('audio')[0];
    	var page1 = document.getElementById('page1');
    	var page2 = document.getElementById('page2');
    	var page3 = document.getElementById('page3');
    	var p1_lantern=document.getElementsByClassName('p1_lantern')[0];
    	audio.addEventListener("ended", function(e) {
    		this.setAttribute('class', "");
    	}, false);

    	music.addEventListener('touchstart', function(e) {
    		if (audio.paused) {
    			audio.play();
    			this.setAttribute("class", "play");
    		} else {
    			audio.pause();
    			this.setAttribute("class", "");
    		}
    	}, false);

    	p1_lantern.addEventListener('touchstart',function(e){
    		page1.style.display="none";
    		page2.style.display="block";
    		page3.style.display='block';
    		page3.style.top="100%";

    		setTimeout(function(){
    		page2.setAttribute('class','page fadeOut');
    		page3.setAttribute('class','page fadeIn');
    	},5500);
    	},false);

   }