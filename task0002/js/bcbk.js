var GLOBAL={};
GLOBAL.bcbke=function  () {
	function $(id){
		return document.getElementById(id);
	}
	var con=$('contain');
	var control=null;
	var state=1;
	var begin=$('begin');
	var speed=2;
	var score=0;
	return{
	init:function(){
		alert('您将开始游戏');
		for(var i=0;i<5;i++){
			this.crow();
		}
		this.delegate();
		this.setMove();
		this.addEvent(begin,'click',this.reload);
	},
	cdiv:function(className){
		var div=document.createElement('div');
		div.className=className;
		return div;
	},
	crow:function(){
		var crow=this.cdiv('row');
		 var index=this.creatSn();
		for(var i=0;i<4;i++){
			crow.appendChild(this.cdiv(index[i]));
		}
		con.insertBefore(crow,con.firstChild);
	},
	creatSn:function(){
		var arr=['cell','cell','cell','cell'];
		var index=Math.floor(Math.random()*4);
		arr[index]='cell black';
		return arr;
	},
	move:function(){
		var top=parseInt(con.style.top);
		top+=speed;
		con.style.top=top+'px';
		if(top>=0){
			this.crow();
			con.style.top=-100+'px';
			//con.remove(con.lastChild);
			this.drow();
			if(con.lastChild.pass!=1){
				alert('You Lose');
				state=2;
				clearInterval(control);
			}
		}
	},
	setMove:function(){
		if(state!=2){
		 control=setInterval('GLOBAL.bcbke.move()',30);
		}
	},
	addEvent:function(element,event,listener){
		if(element.addEventListener){
			element.addEventListener(event,listener,false);
		}
		else if(element.attachEvent){
			element.attachEvent('on'+event,listener);
		}
	},
	score:function(){
		score++;
		$('score').innerHTML=score;
		if(score%5==0){
			speed+=1;
		}
		if(score==50){
			alert('汉铫说我及格了');
		}	
	},
	delegate:function(){
		var that=this;
		this.addEvent(con,'mouseover',function(e){
			var e=e||window.e;
			var tar=e.target||e.srcElement;
			if(tar.nodeName.toLowerCase()=='div'){
				if(tar.className.indexOf('black')==-1){
				/*alert('You Lose');
				clearInterval(control);
				state=2;*/
			}
			else{
				if(state!=2){
			tar.className='cell';
			tar.parentNode.pass=1;
			that.score();
		}
		}
			}
		})
	},
	drow:function(){
		if(con.childNodes.length==7){
			con.removeChild(con.lastChild);
		}
	},
	reload:function(){
		window.location.reload();
	},
	jiaSu:function(){
		speed+=2;
	}
}
}();
GLOBAL.bcbke.init();

