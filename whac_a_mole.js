window.onload = function(){
	second = 0;
	flag = 0;
	score = 0;
	times = 0;//点击start的次数
	alertTime = 0;//记录alert的次数
	inid = 0;//setInterval的返回值
	sc = document.getElementById('totalnumber');
	document.getElementById('start').onclick = function(){//start事件
		alertTime = 0;
		if(flag == 1){
			document.getElementById('gameover').innerHTML = "Game Over";
			alertTime += 1;
			var num = document.getElementById('number');
			flag = 0;
			clear();
			alert("Game Over\nYour Score: "+sc.innerHTML);
			second = 0;
			score = 0;
		}
		else if (flag == 0){
			times += 1;
			pick();
			document.getElementById('gameover').innerHTML = "Playing";
			second = 30;
			sc.innerHTML = 0;
			document.getElementById('number').innerHTML = second;
		    flag = 1;
		    if(times!=1){
		    	clearInterval(inid);//如果setInterval不是第一次调用的话，clear
		    }
		    inid = setInterval(decrease,1000); 
		}
		
	}

	document.onselectstart = function(){
		return false;
	}

	function decrease(){//-1s
		second -= 1;
		if(second<0)//0s之后点击
			return;
		if(second==0){
			flag = 0;
			if(alertTime==0){
				clear();
				alert("Game Over\nYour Score: "+sc.innerHTML);
			}
			alertTime+=1;
			score = 0;
			document.getElementById('gameover').innerHTML = "Game Over";
		}
		document.getElementById('number').innerHTML = second;
		
	}


	arr = document.getElementById('_table').getElementsByTagName("li");
	

	for(var i = 0;i < arr.length;i++){
		arr[i].addEventListener("click",fun.bind(arr[i],arr[i]),false);
	}


	function pick(){//随机挑选
		n = parseInt(60*Math.random());//60个里面随机挑选li
		arr[n].className = "list1";//样式改为蓝色
	}

	function clear(){//所有格子变成原样
		arr[n].className = "list";
	}

	function fun(event){
		if(flag==1){//start之后
			if(event.className=="list1"){//点对
			event.className = "list";
			score += 1;
			sc.innerHTML = score;
			pick();
		    }
		else if(event.className=="list"){//点错
			score -= 1;
			sc.innerHTML = score;
	    	}
		}
	}
}