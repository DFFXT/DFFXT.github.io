/*动态布局
document.documentElement.clientWidth
window.innerHeight
window.outerHeight
 */

var config={
	'size':[document.documentElement.clientWidth,document.documentElement.clientHeight*0.8],
	'color_heigth':'40px',
	'opacity':1,
	'type':'line',//---默认操作
	'lineWidth':1,//----默认画笔粗细
	'color':'rgba(0,0,0,1)',//---默认颜色
	'stage':[],//----保存操作步骤
	'pointer':-1,//---当前指针位置
	'cure_len':10,//---可恢复次数
	'img_tmp':new Image()//---图片缓存【用于恢复和保存矩形，圆覆盖的中心区域】
};
(function(){

	function rPx(originData){//---清除单位，并返回int
		return parseInt(originData.replace('px',''));
	}
	canvas_View.setAttribute('width',config.size[0]+'px');
	canvas_View.setAttribute('height',config.size[1]+'px');
	canvas_tmp_View.setAttribute('width',config.size[0]+'px');
	canvas_tmp_View.setAttribute('height',config.size[1]+'px');
	color_View.setAttribute('width',config.size[0]+'px');
	color_View.setAttribute('height',config.color_heigth);

	ul_font.style.width=ul_font.parentNode.offsetWidth+'px';//---设置字体选择的位置
	ul_opacity.style.width=ul_opacity.parentNode.offsetWidth+'px';//---设置字体选择的位置
	var styleList=getComputedStyle(ul_font.parentNode);

	var ul_parent_padding_bottom=styleList['padding-bottom'];
	ul_font.style.marginLeft='-'+(rPx(styleList['padding-left'])+1)+'px';
	ul_opacity.style.marginLeft='-'+(rPx(styleList['padding-left'])+1)+'px';
	var ul_font_styleList=getComputedStyle(ul_font.getElementsByTagName('li')[0]);
	ul_font.style.marginTop='-'+(rPx(ul_font_styleList['height'])*4+6)+'px';
	ul_opacity.style.marginTop='-'+(rPx(ul_font_styleList['height'])*4+6)+'px';
	
	var td=table.getElementsByTagName('td');
	/*for(var i=0;i<td.length;i++){//---点击变色
		td[i].addEventListener('click',function(){
			for(var j=0;j<td.length;j++){
				td[j].style.background="#fff";
			}
			event.target.style.background="gray";
		});
	}*/
	window.onorientationchange=function(){
		var w=screen.availWidth;
		
	}
})();

