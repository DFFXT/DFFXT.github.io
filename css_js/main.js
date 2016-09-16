/*
canvas.lineWidth=int;
canvas.rect()
canvas.fillRect()
 */
var canvas_View=document.getElementById('canvas');
var canvas_tmp_View=document.getElementById('canvas_tmp');
var color_View=document.getElementById('color');
var lineW=document.getElementById('lineWidth');
	var ul_font=document.getElementById('ul_font');
var line=document.getElementById('line');
var rect=document.getElementById('rect');
var clear=document.getElementById('clear');
var cure=document.getElementById('cure');
var download=document.getElementById('download');
var position=[0,0,0,0];//---位置信息
var config={
	'size':[400,300],
	'type':'line',//---默认操作
	'lineWidth':1,//----默认画笔粗细
	'color':'rgba(0,0,0,1)',//---默认颜色
	'stage':[],//----保存操作步骤
	'pointer':-1,//---当前指针位置
	'cure_len':10,//---可恢复次数
	'img_tmp':new Image()//---图片缓存【用于恢复和保存矩形，圆覆盖的中心区域】
}

//-------------------------------------------功能绑定区
canvas_View.addEventListener('touchstart',function(){//---把开始触摸点定为起点
	if(config.type=='line'){
		drawTable.getStarPosition(2);	
	}
	else if(config.type='rect'){
		config.img_tmp.src=canvas_View.toDataURL();
		drawTable.getStarPosition(0);
	}
});
canvas_View.addEventListener('touchmove',function(){//---更新位置信息
	
	if(config.type=='line'){
		position[0]=position[2];
		position[1]=position[3];
		drawTable.getPosition();
		drawTable.line();
	}
	else if(config.type=='rect'){
		drawTable.getPosition();
		drawTable.rect();
	}
	event.preventDefault();//---阻止默认事件
	
});
canvas_View.addEventListener('touchend',function(){//----写入结束，保存入栈
	
	if(config.type=='rect'){
		drawTable.getPosition();
		drawTable.rect();
	}
	
	drawTable.createImg();
});
color_View.addEventListener('touchstart',function(){//----指定坐标，获取颜色
	position[2]=event.touches[0].pageX;
	position[3]=event.touches[0].pageY;
	drawTable.getColor();
});
color_View.addEventListener('touchmove',function(){//---获取移动坐标，获取颜色
	drawTable.getPosition();
	drawTable.getColor();
	event.preventDefault();
});
lineW.addEventListener('mouseover',function(){//---划线粗细显示选项
		ul_font.style.display='block';
});
	ul_font.getElementsByTagName('li')[0].addEventListener('click',function(){
		if(canvas.lineWidth>1){
			canvas.lineWidth--;
			ul_font.getElementsByTagName('li')[1].innerText=canvas.lineWidth;
		}
	});
	ul_font.getElementsByTagName('li')[1].addEventListener('click',function(){
		ul_font.style.display='none';
	});
	ul_font.getElementsByTagName('li')[2].addEventListener('click',function(){
		if(canvas.lineWidth<30){
			canvas.lineWidth++;
			ul_font.getElementsByTagName('li')[1].innerText=canvas.lineWidth;
		}
	});
line.addEventListener('click',function(){//---默认模式
	config.type='line';
});
rect.addEventListener('click',function(){//---矩形模式
	config.type='rect';
	config.img_tmp.src=canvas_View.toDataURL();
});
clear.addEventListener('click',function(){//---清空
	drawTable.clear();
});
cure.addEventListener('click',function(){//----回复
	drawTable.cure();
});
download.addEventListener('click',function(){//----下载【pc】
	drawTable.download();
})
//-----------------------------------------------------------------
var operate = function(){//----操作函数集合
	canvas = canvas_View.getContext('2d');//---init
	canvas_tmp = canvas_tmp_View.getContext('2d');//---init
	var color_c = color_View.getContext('2d');
	var linear = color_c.createLinearGradient(0,0,config.size[0],0);
	linear.addColorStop(0, 'rgb(255,0,0)'); //红  
    linear.addColorStop(0.5, 'rgb(0,255,0)');//绿
    linear.addColorStop(1, 'rgb(0,0,255)'); //蓝

	color_c.fillStyle=linear;
	color_c.fillRect(0,0,config.size[0],40);

	this.changeType=function(){
		
	}
	this.line=function(){//----划线
		canvas.beginPath();
		canvas.moveTo(position[0],position[1]);
		canvas.lineTo(position[2],position[3]);

		canvas.strokeStyle=config.color;
		canvas.closePath();

		canvas.stroke();
	}
	this.rect=function(){//----写入矩形
		canvas_tmp.clearRect(0,0,config.size[0],config.size[1]);//---清空缓存画布，因为填充物为透明背景
		canvas_tmp.drawImage(config.img_tmp,0,0);//---清空后加入填充物
		var imgData=canvas_tmp.getImageData(position[0]+1,position[1],position[2]-position[0]-2,position[3]-position[1]-2);
		//----获取矩形中间的图像
		canvas.beginPath();
		canvas.strokeStyle=config.color;
		canvas.rect(position[0],position[1],position[2]-position[0],position[3]-position[1]);
		canvas.closePath();
		canvas.stroke();
		canvas.putImageData(imgData,position[0]+1,position[1]);//---将缓存的矩形中心图像载入正在画的矩形
	}
	this.getColor=function(){//---获取点击处的颜色[rgba模式,a/255为可用a]
		var offsetT=color_View.offsetTop;
		var color=color_c.getImageData(position[2],position[3]-303,1,1).data;
		cure.style.background="rgba("+color[0]+','+color[1]+','+color[2]+','+color[3]/255+")";
		config.color="rgba("+color[0]+','+color[1]+','+color[2]+','+color[3]/255+")";
		
	}
	this.getStarPosition=function(offset){
		position[offset]=event.touches[0].pageX;
		position[offset+1]=event.touches[0].pageY;
	}
	this.getPosition=function(){
		position[2]=event.changedTouches[0].pageX;
		position[3]=event.changedTouches[0].pageY;
	}
	this.getLastPosition=function(){

	}
	this.clear=function(val){//---清除最后操作
		if(val==0){
			canvas.clearRect(0,0,config.size[0],config.size[1]);
		}
		else if(true){//----清除所有操作和记录
			config.stage='null';
			config.stage=[];
			canvas.clearRect(0,0,config.size[0],config.size[1]);
			config.pointer=-1;
			drawTable.createImg();
		}
	}
	this.cure=function(){//---回复上一步
		if(config.pointer>=1){
			config.img_tmp = new Image();
			config.img_tmp.src=config.stage[config.pointer-1];
			config.img_tmp.onload=function(){//---加载完成再清除不会出现闪烁
				drawTable.clear(0);//---清空，不改变记录
				canvas.drawImage(config.img_tmp,0,0);//---加载上一步
			}
			config.pointer--;//--指针减一
		}
		
		
	}
	this.createImg=function(){//---canvas生成base64码
		//---64码保存在数组中，指针指向当前画面
		if(config.pointer>=config.cure_len-1){//---超出长度就清除最前面的操作，再最后追加最新操作
			for(var i=0;i<config.cure_len-1;i++){
				config.stage[i]=config.stage[i+1];
			}
		}
		if(config.pointer<config.cure_len-1){
			config.pointer++;
		}
		config.stage[config.pointer]=canvas_View.toDataURL();
	}
	this.download=function(){//-----下载图片
		var a=document.createElement('a');
		a.href=config.stage[config.pointer].replace('png','octet-stream');
		a.download="save.png";
		a.click();
	}

}

{//---所有初始化操作
	drawTable = new operate();//---初始化功能函数
	drawTable.createImg();//---第一个图片保存
}