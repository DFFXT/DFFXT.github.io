/*
canvas.lineWidth=int;
canvas.rect()
canvas.fillRect()
window.onorientationchange
 */

var position=[0,0,0,0];//---位置信息


//-------------------------------------------功能绑定区
canvas_View.addEventListener('touchstart',function(){//---把开始触摸点定为起点
	if(config.type=='pen'){
		drawTable.getStarPosition(2);	
	}
	else if(config.type=='rect_new'||config.type=='coordinate'){
		drawTable.getStarPosition(0);
		rect_box.style.display='block';
		rect_box.style.border=canvas.lineWidth+'px '+drawTable.colorOpacity(config.color,config.opacity)+' solid';
	}
});
canvas_View.addEventListener('click',function(){//---画点
	if(config.type!='pen')return;
	var x=event.pageX;//--click主要是不与划线时的位置混淆
	var y=event.pageY;
	if(config.dot[2]==0){//--没有记录时添加一个记录
		config.dot[0]=x;
		config.dot[1]=y;
	}
	config.dot[2]+=1;
	drawTable.dot(x,y);//--其实是画圆
	if(config.dot[2]==2){
		config.dot[2]=0;//--重置
		drawTable.matchDot(x,y);//--连线开始
	}
	
});
canvas_View.addEventListener('touchmove',function(){//---更新位置信息
	if(config.type=='pen'){
		position[0]=position[2];
		position[1]=position[3];
		drawTable.getPosition();
		drawTable.pen();
	}
	else if(config.type=='rect_new'||config.type=='coordinate'){
		drawTable.getPosition();
		drawTable.rect_new();
		if(config.type=='coordinate'){
			rect_box.style.borderTop='none';
			rect_box.style.borderRight='none';
		}
	}
	event.preventDefault();//---阻止默认事件
});
canvas_View.addEventListener('touchend',function(){//----写入结束，保存入栈
	if(config.type=='rect_new'||config.type=='coordinate'){
		drawTable.getPosition();
		drawTable.rect_new();
		if(config.type=='coordinate'){
			drawTable.coordinate();
		}
		else
		drawTable.rect();
		rect_box.style.cssText='display:none;left:0;top:0;width0;height:0;';
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
lineW.addEventListener('click',function(){//---划线粗细显示选项
	span_layout();
	range.value=range.nextElementSibling.innerText=canvas.lineWidth;
	range.max=config.lineWidth[1];//--设置最大值
	config.rangeType='lineWidth';
});
line.addEventListener('click',function(){//---默认模式
	config.type='pen';
});
rect.addEventListener('click',function(){//---矩形模式
	config.type='rect_new';
});
clear.addEventListener('click',function(){//---清空
	drawTable.clear();
});
cure.addEventListener('click',function(){//----回复
	drawTable.cure();
});
download.addEventListener('click',function(){//----下载【pc】
	drawTable.download();
});
opacity.addEventListener('click',function(){
	span_layout();
	range.max=100;//--设置最大值
	range.value=(range.nextElementSibling.innerText=config.opacity)*100;//init
	config.rangeType='opacity';
});

coordinate.addEventListener('click',function(){
	ul_coordinate.style.display=ul_coordinate.style.display!='block'?'block':'none';
	
});
	ul_coordinate.getElementsByTagName('li')[0].addEventListener('click',function(){
		mathFunction.style.display='block';
	});
		calculate.addEventListener('click',function(){//--进行计算
			drawTable.coordinate();
			drawTable.mathFunction(equation.value);
			drawTable.createImg();//--可恢复

		});
		close_equation.addEventListener('click',function(){//--关闭窗口
			mathFunction.style.display='none';
		});
	ul_coordinate.getElementsByTagName('li')[1].addEventListener('click',function(){
		config.type='coordinate';
	});

character.addEventListener('click',function(){//--弹出字体写入框
	if(rect_box.style.display!='block'){//--显示
		
		rect_box.innerHTML="<div id='sureButton'></div><input placeholder='text' type='text' style='width:100px'>";
		rect_box.style.cssText='width:120px;display:block;background:rgba(240,240,240,0.7);padding:30px;left:100px;top:100px;';
	}
	else{//--关闭并还原rect_box
		rect_box.innerHTML='';
		rect_box.style.cssText='display:none;left:0;top:0;width:0;height:0;';
		rangeBox.style.display='none';
		return;
	}
	
	var inputText=rect_box.getElementsByTagName('input')[0];
	var sureButton=document.getElementById('sureButton');
	inputText.style.cssText="font-size:"+config.fontSize+"px;width:120px;background:rgba(255,255,255,.3);border:none;";
	inputText.focus();
	inputText.addEventListener('click',function(){
		event.cancelBubble=true;
	})
	//--rect_box里面再加入一层元素
	sureButton.addEventListener('click',function(){//--确定
		event.cancelBubble=true;
		var x=rect_box.offsetLeft+30;
		var y=rect_box.offsetTop+sureButton.clientHeight+30+inputText.clientHeight;
		drawTable.fillText(inputText.value,x,y);
	});
	rect_box.addEventListener('click',function(){//--弹出字体大小选择框
		span_layout();
		range.nextElementSibling.innerText=(range.value=config.fontSize)+'px';
		range.max=config.maxFontSize//--设置最大值
		config.rangeType='font';
	});
	rect_box.addEventListener('touchstart',function(){
		drawTable.getStarPosition(2);
	});
	rect_box.addEventListener('touchmove',function(){event.preventDefault();
		position[0]=position[2];
		position[1]=position[3];
		drawTable.getPosition();
		drawTable.move(rect_box);

	});
	rect_box.addEventListener('touchend',function(){
		drawTable.getStarPosition[2];
	});
});


rangeBox_drag.addEventListener('click',function(){
	rangeBox.style.display='none';
});
rangeBox_drag.addEventListener('touchstart',function(){
	drawTable.getStarPosition(2);
});
rangeBox_drag.addEventListener('touchmove',function(){event.preventDefault();
	position[0]=position[2];
	position[1]=position[3];
	drawTable.getPosition();
	drawTable.move(rangeBox);
});
range.addEventListener('touchmove',function(){
	if(config.rangeType=='opacity'){
		range.nextElementSibling.innerText=range.value/100;
	}else if(config.rangeType=='font'){
		range.nextElementSibling.innerText=rect_box.getElementsByTagName('input')[0].style.fontSize=range.value+'px';
	}
	else{
		range.nextElementSibling.innerText=range.value;
	}
});
range.addEventListener('touchend',function(){
	switch(config.rangeType){
		case 'lineWidth':canvas.lineWidth=range.value;;break;
		case 'opacity':config.opacity=range.value/100;break;
		case 'font':config.fontSize=range.value;break;
	}
});
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

	this.colorOpacity=function(color,opacity){
		var start=color.lastIndexOf(',');
		var end=color.lastIndexOf(')');
		var res=color.substr(0,start+1)+opacity+color.substr(end);
		return res;
	}
	this.pen=function(x1,y1,x2,y2){//----划线
		var X1=x1||position[0],Y1=y1||position[1],X2=x2||position[2],Y2=y2||position[3];
		canvas.beginPath();//--上行为缺省值
		canvas.moveTo(X1,Y1);
		canvas.lineTo(X2,Y2);
		canvas.strokeStyle=drawTable.colorOpacity(config.color,config.opacity);
		canvas.closePath();
		canvas.stroke();
	}
	this.rect_new=function(){//--矩形div模拟

		rect_box.style.left=position[0]+'px';
		rect_box.style.top=position[1]+'px';
		rect_box.style.width=position[2]-position[0]-1+'px';
		rect_box.style.height=position[3]-position[1]-1+'px';
	}
	this.rect=function(){//----写入矩形
		if(position[0]==position[2])return;
		canvas.beginPath();
		canvas.strokeStyle=drawTable.colorOpacity(config.color,config.opacity);
		canvas.rect(position[0]+canvas.lineWidth/2,position[1]+canvas.lineWidth/2,position[2]-position[0]+canvas.lineWidth,position[3]-position[1]+canvas.lineWidth);
		//---div元素的border和画矩形的边框不是同一个机制
		canvas.closePath();
		canvas.stroke();	
	}
	this.dot=function(x,y,type){//--点的生成 用于连线
		canvas.beginPath();
		var type=type||'stroke';
		if(type=='fill'){
			canvas.fillStyle=drawTable.colorOpacity(config.color,config.opacity);
			canvas.arc(x,y,config.radius,0,Math.PI*2,false);
		}
		if(type=='stroke'){
			canvas.strokeStyle=config.color;
			canvas.arc(x,y,config.radius,0,Math.PI*2,false);
			canvas.stroke();
		}
		canvas.closePath();
	}
	this.matchDot=function(x,y){//--连接两个点
		canvas.beginPath();
		canvas.strokeStyle=drawTable.colorOpacity(config.color,config.opacity);
		canvas.moveTo(config.dot[0],config.dot[1]);
		canvas.lineTo(x,y);
		canvas.closePath();
		canvas.stroke();
	}
	this.coordinate=function(){//--建立坐标
		//---在进行画矩形时，只保留邻边就可以自定义建立起简易坐标
		drawTable.pen(position[0],position[3],position[0],position[1]);
		drawTable.pen(position[0],position[3],position[2],position[3]);
		config.basePoint[0]=position[0];//--保存坐标轴基本点
		config.basePoint[1]=position[3];
		config.basePoint[2]=position[0];
		config.basePoint[3]=position[1];
		config.basePoint[4]=position[2];
		config.basePoint[5]=position[3];
	}
	this.mathFunction=function(equation){//---数学函数y=2*x
		var equation=equation||"0.5*x";var y;
		//--标准转换式 y=k*x --> y=-k*(x-config.basePoint[0])+config.basePoint[1] //--将坐标轴的方向进行转换
		//--存在转换缺陷，x*x时图形完全不形象，需要缩短x，y轴
		equation=equation.replace('x','(x-'+config.basePoint[0]+')');//--x值进行替换
		equation='-1*('+equation+')+'+config.basePoint[1];
		for(var x=config.basePoint[0];x<config.basePoint[4];x+=0.01){//--0.01为精度
			eval('y='+equation);//---y=k*x
			drawTable.pen(x,y,++x,eval('y='+equation));//--传入两个坐标
		}
	}
	this.move=function(obj){
		var obj_left=rPx(getComputedStyle(obj)['left'],'left');
		var obj_top=rPx(getComputedStyle(obj)['top'],'top');
		obj.style.left=obj_left+position[2]-position[0]+'px';
		obj.style.top=obj_top+position[3]-position[1]+'px';
	}
	this.fillText=function(text,x,y,type){//---生成文字
		var x=x||10,y=y||10,type=type||'fill';
		canvas.font='normal '+config.fontSize+'px 微软雅黑';
		if(config.fontSize<16){
			 var compatibility=0;
		}else{
			var compatibility=config.fontSize/3;
		}
		if(type='fill'){
			canvas.fillStyle=drawTable.colorOpacity(config.color,config.opacity);
			canvas.fillText(text,x,y-compatibility);
		}else{
			canvas.strokeText(text,x,y);
		}
		drawTable.createImg();
	}

	this.getColor=function(){//---获取点击处的颜色[rgba模式,a/255为可用a]
		var offsetT=color_View.offsetTop;
		var color=color_c.getImageData(position[2],position[3]-config.size[1]-3,1,1).data;
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
			config.dot[2]=0;
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
		if(config.pointer<config.cure_len-1){//--指针后移
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
	canvas.lineWidth=3;
	canvas.font='normal '+config.fontSize+'px 微软雅黑';
}