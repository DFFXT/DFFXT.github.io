/*动态布局
document.documentElement.clientWidth
window.innerHeight
window.outerHeight
 */

if(document.cookie!=''){
	document.cookie='width='+document.documentElement.clientWidth;
	document.cookie='height='+document.documentElement.clientHeight*0.75;
}
var config={///---各种配置
	'size':[document.documentElement.clientWidth,document.documentElement.clientHeight*0.75],
	'color_heigth':'40px',
	'opacity':1,
	'type':'pen',//---默认画笔操作
	'rangeType':'',//--range使用者
	'lineWidth':[3,40],//----默认画笔粗细/最大画笔粗细
	'fontSize':16,//--默认字体大小
	'maxFontSize':100,//--最大字体
	'radius':2,//---画圆的半径
	'basePoint':[0,0,0,0,0,0],//---坐标轴基本点
	'dot':[-1,-1,0],//--连线时的点的保存【最后一个的参数:点数,偶数就进行连接】
	'color':'rgba(0,0,0,1)',//---默认颜色
	'stage':[],//----保存操作步骤
	'pointer':-1,//---当前指针位置
	'cure_len':10,//---可恢复次数【需要一定的缓存空间】
	'img_tmp':new Image()//---图片缓存【用于恢复】
};
if(document.cookie!=''){
	var cookies=document.cookie.split(';');
	for(var i=0;i<cookies.length;i++){
		eval(cookies[i]);
	}
	config.size[0]=width;
	config.size[1]=height;
}
function span_layout(){//---范围选择框布局
	rangeBox.style.display=rangeBox.style.display!='block'?'block':'none';
	var span = rangeBox.getElementsByTagName('span');
	for(var i=0;i<span.length;i++){
		span[i].style.height=range.clientHeight+'px';
		span[i].style.LineHeight=range.clientHeight+'px';
		if(i%2!=0){
			span[i].style.float='right';
		}
	}
}
function rPx(originData,type){//---清除单位，并返回int
	if(type=='top'){
		var type=document.documentElement.clientHeight;
	}else{
		var type=document.documentElement.clientWidth;
	}
	if(originData.indexOf('%')>0){
		return parseInt(originData.replace('%',''))/100*type;
	}else
	return parseInt(originData.replace('px',''));
}
(function(){
	function pos(obj,item_amount){//--按键弹出框位置
		obj.style.width=obj.parentNode.offsetWidth+'px';
		var styleList=getComputedStyle(obj.parentNode);
		var ul_parent_padding_bottom=styleList['padding-bottom'];
		obj.style.marginLeft='-'+(rPx(styleList['padding-left'])+1)+'px';
		var ul_font_styleList=getComputedStyle(obj.getElementsByTagName('li')[0]);
		obj.style.marginTop='-'+(rPx(ul_font_styleList['height'])*(item_amount+1)+6)+'px';
	}
	function equation_input_layout(obj){
		obj.style.width=config.size[0]*0.8+'px';
	}
	equation_input_layout(mathFunction);
	pos(ul_coordinate,2);
	canvas_View.setAttribute('width',config.size[0]+'px');
	canvas_View.setAttribute('height',config.size[1]+'px');
	canvas_tmp_View.setAttribute('width',config.size[0]+'px');
	canvas_tmp_View.setAttribute('height',config.size[1]+'px');
	color_View.setAttribute('width',config.size[0]+'px');
	color_View.setAttribute('height',config.color_heigth);
		
	


	window.onorientationchange=function(){
		var w=screen.availWidth;	
	}
})();

