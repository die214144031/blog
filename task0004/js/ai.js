
	var chessBoard = [];
	var chess = document.getElementById('chess');
	var context = chess.getContext('2d');
	var giveUp = document.getElementById('giveUp');
	var back = document.getElementById('back');
	var doublePeople=document.getElementById('doublePeople');
	var peopleUi=document.getElementById('peopleUi');
	var music=document.getElementById('music');
	var audio=document.getElementsByTagName('audio')[0];
	var over = false;
	var me=false,people=true;

	music.onclick=function(){
		if(audio.paused){
		audio.play();
		this.setAttribute('class','play');
	}else{
		audio.pause();
		this.setAttribute('class','');
	}

	}
	doublePeople.onclick=function(){
		restar();
		me=true;
		people=true;
	}
	peopleUi.onclick=function(){
		restar();
		me=false;
		people=true;
	}
	giveUp.onclick = function() {
		restar();
	}
	back.onclick = function() {
		context.clearRect(0, 0, 450, 450);
		context.drawImage(logo, 0, 0, 450, 450);
		drawChessBorad();
		for (var k = 0; k < count; k++) {
			if (wins[peopleStep[peopleStep.length - 1][0]][peopleStep[peopleStep.length - 1][1]][k]) {
				if(myWin[k]>0){
			myWin[k]--;
		}
			}
			if (wins[uiStep[uiStep.length - 1][0]][uiStep[uiStep.length - 1][1]][k]) {
				if(computerWin[k]>0){
			computerWin[k]--;
		}
			}
		}
		chessBoard[peopleStep[peopleStep.length - 1][0]][peopleStep[peopleStep.length - 1][1]] = 0;
		chessBoard[uiStep[uiStep.length - 1][0]][uiStep[uiStep.length - 1][1]] = 0;
		peopleStep.pop();
		uiStep.pop();
	
		oneStep();
		over = false;
	}


	/*chessbroad二维数组保存棋子*/
	for (var i = 0; i < 15; i++) {
		chessBoard[i] = [];
		for (var j = 0; j < 15; j++) {
			chessBoard[i][j] = 0;
		}
	}
	/*定义三维数组,统计所有赢法*/
	var count = 0;
	var wins = [];
	for (var i = 0; i < 15; i++) {
		wins[i] = [];
		for (var j = 0; j < 15; j++) {
			wins[i][j] = [];
		}
	}
	/*横线赢法*/
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i][j + k][count] = true;
			}
			count++;
		}
	}
	/*竖线赢法*/
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[j + k][i][count] = true;
			}
			count++;
		}
	}
	/*斜线赢法*/
	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i + k][j + k][count] = true;
			}
			count++;
		}
	}
	/*反斜线赢法*/
	for (var i = 0; i < 11; i++) {
		for (var j = 14; j > 3; j--) {
			for (var k = 0; k < 5; k++) {
				wins[i + k][j - k][count] = true;
			}
			count++;
		}
	}
	/*初始化 自己 朋友 计算机胜负判断*/
	var myWin = [];
	var peopleWin= [];
	var computerWin = [];
	for (var i = 0; i < count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
		peopleWin[i] = 0;
	}
	/*canvas绘制背景图片*/
	var logo = new Image();
	logo.src = "image/wuziqi1.jpg";
	logo.onload = function() {
			context.drawImage(logo, 0, 0, 450, 450);
			drawChessBorad();
			/*context.beginPath();
			context.arc(200,200,100,0,Math.PI*2);
			context.closePath();
			var gradient = context.createRadialGradient(200,200,50,200,200,20);
			gradient.addColorStop(0,"#0A0A0A");
			gradient.addColorStop(1,"#636766");
			context.fillStyle=gradient;
			context.fill();*/
		}
		/*黑白棋子点击*/
	chess.onclick = function(e) {
			if (over) {
				return;
			}
			/*if(!me){
				return;
			}*/
			var x = e.offsetX;
			var y = e.offsetY;
			var i = Math.floor(x / 30);
			var j = Math.floor(y / 30);

			if (chessBoard[i][j] == 0) {
				if(people){
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						myWin[k]++;
						computerWin[k] = 1000;
						peopleWin[k] = 1000;
						if (myWin[k] == 5) {
							alert('你赢了');
							over = true;
						}
					}
				}
			}else{
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						peopleWin[k]++;
						computerWin[k] = 1000;
						myWin[k] = 1000;
						if (peopleWin[k] == 5) {
							alert('你赢了');
							over = true;
						}
					}
				}
			}
				peopleStep.push([i,j]);
				chessBoard[i][j] = 1;
				if(me){
				if(people){
				people=false;
				chessBoard[i][j] = 1;
			}
			else{
				people=true;
				chessBoard[i][j] = 2;
			}
		}
				oneStep();
				if (!over) {
					if(!me){
					computerAi();
				}
				}
			}
		}
		/*绘制棋子*/
	var oneStep = function() {
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 15; j++) {
				var gradient = context.createRadialGradient(15 + i * 30, 15 + j * 30, 13, 15 + i * 30, 15 + j * 30, 0);
				if (chessBoard[i][j] == 1) {
					context.beginPath();
					context.arc(15 + i * 30, 15 + j * 30, 13, 0, Math.PI * 2);
					context.closePath();
					gradient.addColorStop(0, "#0A0A0A");
					gradient.addColorStop(1, '#636766');
					context.fillStyle = gradient;
					context.fill();
				} else if (chessBoard[i][j] == 2) {
					context.beginPath();
					context.arc(15 + i * 30, 15 + j * 30, 13, 0, Math.PI * 2);
					context.closePath();
					gradient.addColorStop(0, "#d1d1d1");
					gradient.addColorStop(1, '#fff');
					context.fillStyle = gradient;
					context.fill();
				}
			}
		}
	}


	/*绘制棋盘*/
	var drawChessBorad = function() {
		context.beginPath();
		context.strokeStyle = "#BFBFBF"; //测试在绘制后设置无效
		for (var i = 0; i < 15; i++) {
			context.moveTo(15 + i * 30, 15);
			context.lineTo(15 + i * 30, 435);
			context.stroke();
			context.moveTo(15, 15 + i * 30);
			context.lineTo(435, 15 + i * 30);
			context.stroke();
		}
	}
	var peopleStep = [],
		uiStep = [];

	var computerAi = function() {
		var myScore = [];
		var computerScore = [];
		var max = 0;
		var u = 0,
			v = 0;
		for (var i = 0; i < 15; i++) {
			myScore[i] = [];
			computerScore[i] = [];
			for (var j = 0; j < 15; j++) {
				myScore[i][j] = 0;
				computerScore[i][j] = 0;
			}
		}
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 15; j++) {
				if (chessBoard[i][j] == 0) {
					for (var k = 0; k < count; k++) {
						if (wins[i][j][k]) {
							if (myWin[k] == 1) {
								myScore[i][j] += 200;
							} else if (myWin[k] == 2) {
								myScore[i][j] += 400;
							} else if (myWin[k] == 3) {
								myScore[i][j] += 1000;
							} else if (myWin[k] == 4) {
								myScore[i][j] += 10000;
							}


							if (computerWin[k] == 1) {
								computerScore[i][j] += 220;
							} else if (computerWin[k] == 2) {
								computerScore[i][j] += 420;
							} else if (computerWin[k] == 3) {
								computerScore[i][j] += 2100;
							} else if (computerWin[k] == 4) {
								computerScore[i][j] += 20000;
							}
						}

					}
					if (myScore[i][j] > max) {
						max = myScore[i][j];
						u = i;
						v = j;
					} else if (myScore[i][j] == max) {
						if (computerScore[i][j] > computerScore[u][v]) {
							u = i;
							v = j;
						}
					}

					if (computerScore[i][j] > max) {
						max = computerScore[i][j];
						u = i;
						v = j;
					} else if (computerScore[i][j] == max) {
						if (myScore[i][j] > myScore[u][v]) {
							u = i;
							v = j;
						}
					}

				}
			}
		}
		chessBoard[u][v] = 2;
		uiStep.push([u,v]);
		oneStep();
		for (var k = 0; k < count; k++) {
			if (wins[u][v][k]) {
				computerWin[k]++;
				myWin[k] = 1000;
				if (computerWin[k] == 5) {
					alert('计算机赢了');
					over = true;
				}
			}
		}
	}

		/*重新开始游戏*/
	var restar=function(){
		context.clearRect(0, 0, 450, 450);
		context.drawImage(logo, 0, 0, 450, 450);
		drawChessBorad();
		for (var i = 0; i < 15; i++) {
			for (var j = 0; j < 15; j++) {
				chessBoard[i][j] = 0;
			}
		}
		for (var i = 0; i < count; i++) {
			myWin[i] = 0;
			peopleWin[i] = 0;
			computerWin[i] = 0;
		}
		over = false;
	}
