var Zujian={};
Zujian.fader= function(){
	return{
		//初始化函数
		init: function(options){//id(必选图片父节点) auto(可选 轮播时间) index(可选开始序号)
			var a=$(options.id);
			var ul = $('ul',a)[0];
			this.li=$('li',ul);
			this.b=options.auto?options.auto:2;
			this.index=options.index?options.index:0;
			this.cur=this.z=0;//当前图片序号和Z-INDEX值
			for(var i=0;i<this.li.length;i++){
				 this.li[i].o=100;
				 this.li[i].style.opacity=this.li[i].o/100;
				 this.li[i].style.filter='alpha(opacity='+this.li[i].o+')';
			}
			this.pos(this.index);
		} ,
		auto: function(){
			var that=this;
			this.c=setTimeout(function(){that.move(1)},this.b*1000);
			//setInterval(this.pos(this.index),this.b*1000);
		},
		move: function(i){//参数1代表下一张  -1代表上一张  控制轮播方向
			var n=this.cur+i;
			var m=i==1?n==this.li.length?0:n:n<0?this.li.length-1:n;
			/*if(this.li[i].o>=100){
				this.li[i].o=0;
				this.li[i].style.opacity=0;
				this.li[i].style.filter='alpha(opacity='+0+')';
			}*/
			/*this.t=setInterval(function(){that.fain(i)},20);*/
			this.pos(m);
		},
		pos: function(i){//轮播实现 修改z-index值
			var that=this;
			clearTimeout(this.c);
			this.z++;
			this.li[i].style.zIndex=this.z;
			this.cur=i;
			this.c=false;
			//this.auto();
			if(this.li[i].o>=100){
				this.li[i].o=0;
				this.li[i].style.opacity=0;
				this.li[i].style.filter='alpha(opacity='+0+')';
			}
			this.d=setInterval(function(){that.fade(i)},100);
		},
		fade: function(i){
			if(this.li[i].o>=100){
				clearInterval(this.d);
				if(!this.c){
				this.auto();
			}
			}
			else{
				this.li[i].o+=10;
				this.li[i].style.opacity=this.li[i].o/100;
				this.li[i].style.filter='alpha(opacity='+this.li[i].o+')';
			}
		}
		/*fain: function(i){
			if(this.li[i].o>=100){
				clearInterval(this.t);
				this.pos(this.m);
			}
			else{
				this.li[i].o+=10;
				this.li[i].style.opacity=this.li[i].o/100;
				this.li[i].style.filter='alpha(opacity='+this.li[i].o+')';
			}
		}*/
	}
}();
Zujian.fader.init({
	id: '#fa'
});