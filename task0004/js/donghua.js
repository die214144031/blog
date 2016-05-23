	
	var zzc =document.getElementsByClassName('zzc')[0];
	var leftPicture=document.getElementsByClassName('leftPicture')[0];
	var rightPicture=document.getElementsByClassName('rightPicture')[0];
	var wid=document.body.clientWidth;
	var body=document.getElementsByTagName('body')[0];
	leftPicture.style.transition="left 3s linear ";
	rightPicture.style.transition="right 3s linear";
	zzc.style.transition="opacity 4s linear";
	var flag;
	setTimeout(function(){
		leftPicture.style.animation="leftScale 3s linear";
		rightPicture.style.animation="rightScale 3s linear";
		leftPicture.style.left=wid/2-550+'px';
		rightPicture.style.right=wid/2-550+'px';
		leftPicture.addEventListener('transitionend',function(){
			leftPicture.style.animation="leftPicture 4s linear infinite";
			 /*flag=parseFloat(getStyle(leftPicture,'left'));
			console.log(flag);*/
			setTimeout(function(){
				leftPicture.style.left='-550px';
				zzc.style.opacity=0;
			},2000)
			setTimeout(function(){
				zzc.style.display='none';
				/* changeBg(document.body,bgs,3000);*/
				
			},5000)
			
		},false)
		rightPicture.addEventListener('transitionend',function(){
			rightPicture.style.animation="rightPicture 4s linear infinite";
			setTimeout(function(){
				rightPicture.style.right='-550px';
			},2000)
		},false)
		/*rightPicture.style.animaion="rightPicture 2s linear infinite";*/
	},1000);
	/*var out=function(){
		setInterval(function(){
			var speed=0;
			speed=(wid/2)/4;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			leftPicture.style.left=speed+'px';
	},30)
	};*/

function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}
	