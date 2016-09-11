var img_id=0;
var textarea_div=document.getElementById("textarea_div");
var textarea=document.getElementById("textarea");
var drag=document.getElementById("drag");
var item_info=document.getElementById("item_info");
var file_input_button=document.getElementById('file');
var button_list=document.getElementById("meun").getElementsByTagName("li");
var config={
	"edite_statu":"",//---编辑状态
	"this_target":"",//-----选项target
	"top_statu":"",//-----
	"del_select":['',''],//------
	"edite_target":"",//----修改时的目标
	"editebox":function(){
		drag.style.display="block";
		drag.style.left="400px";
		drag.style.top="300px";
		var color="black";
		if(config.edite_statu=='codeEdite'){
			color="#ff00ff";
		}
		else if(config.edite_statu=='textEdite'){
			color="black";
		}
		textarea.style.color=color;
		textarea.value='';
		textarea.focus();
	}
}


for(var i_tmp=0;i_tmp<button_list.length;i_tmp++){
	button_list[i_tmp].setAttribute("onclick","item_function("+i_tmp+")");
}
var item_function=function(pos){//----编辑选项
	if(!("title" in NewData)){
		alert("未定义");
		return 0;
	}
	config.edite_target='';
	if(pos==0){
		
	}
	else if(pos==1){//------图片上传
		document.getElementById('file').click();
	}
	else if(pos==2&&NewData.hasOwnProperty('title')){
		config.edite_statu='textEdite';
		config.editebox();
	}
	else if(pos==3&&NewData.hasOwnProperty('title')){
		config.edite_statu='codeEdite';
		config.editebox();
	}
	else if(pos==4){//-----保存数据
		var updata=new FormData();
		updata.append("json",JSON.stringify(NewData));
		xml.open("POST","json_save.php",false);
		xml.send(updata);
		if(xml.responseText=='1'){
			window.location.href='index.php?'+NewData.file_name;
		}
		else{
			alert(xml.responseText);
		}
	}
}
var ajax_up=function(){//--------图片上传
	if(document.getElementById('file').value=='') return 0;
	img_id++;
	var updata=new FormData();
	updata.append("file",document.getElementById('file').files[0]);
	updata.append("path",NewData.file_name);
	xml.open("POST","file_save.php",false);
	xml.send(updata);
	var img_url= xml.responseText;
	createDOM(text,"img",{"src":"../data/"+NewData.root+img_url});
	for(;NewData.hasOwnProperty('img_'+img_id);){
		img_id++;
	}
	NewData["img_"+img_id]=img_url;	
	document.getElementById('file').outerHTML=document.getElementById('file').outerHTML;
}

var input_name = function(){//------item输入
	NewData={};

	NewData.tag = event.target.parentNode.getElementsByTagName("li")[0].innerText;
     var str_name=prompt("输入名称");
    if(check(str_name)){
        	var file_name=new Date().getTime();
        	text.innerHTML="";
        	NewData.root=file_name+"/";
        	NewData.file_name=file_name;
        	NewData.title=str_name;
        	NewData.date=new Date();
        	type.href="../index_css/describe.css";

    }

}
var check=function(str,type){//-------字符串检查
	var flag=false;
	str=str||'';
	var len=str.length;
	var code=["?","/","\\","<",">","|",":","*","\""];
	for(var i=0;i<len;i++){
		if(str[i]!=' ') flag=true;	
	}
	if(type=='url'){
		for(var i=0;i<code.length;i++){
			if(str.indexOf(code[i])>=0) return false;
		}
	}
	return flag;
}
//-------------------------------------------------------编辑器拖动
textarea_div.addEventListener("mousedown",function(){
	dragable('down');
});
textarea_div.addEventListener("dblclick",function(){//---双击保存
	img_id++;
	textarea_tmp=textarea.value;
	textarea_tmp=textarea_tmp.replace(/&/g,"&amp");//---正则替换
	textarea_tmp=textarea_tmp.replace(/\t/g,"&nbsp&nbsp&nbsp&nbsp");
	textarea_tmp=textarea_tmp.replace(/</g,"&lt");
	textarea_tmp=textarea_tmp.replace(/>/g,"&gt");
	textarea_tmp=textarea_tmp.replace(/\n/g,"<br/>");
	textarea_tmp=textarea_tmp.replace(/\s/g,"&nbsp");
	
	if(config.edite_target!=''){//-----修改保存
		config.edite_target.innerHTML=textarea_tmp;
		NewData[config.edite_target.getAttribute('attr')]=textarea_tmp;
		config.edite_target='';
		drag.style.cssText="display:none";
		return 0;
	}

	if(config.edite_statu=='textEdite'){
		for(;NewData.hasOwnProperty("text_"+img_id);){
			img_id++;
		}
		NewData["text_"+img_id]=textarea_tmp;
		var new_text=createDOM(text,'div',{"class":"subText","attr":"text_"+img_id});
	}
	else if(config.edite_statu=='codeEdite'){
		for(;NewData.hasOwnProperty("code_"+img_id);){
			img_id++;
		}
		NewData["code_"+img_id]=textarea_tmp;
		var new_text=createDOM(text,'code',{"attr":"code_"+img_id});

	}
	new_text.innerHTML=textarea_tmp;
	new_text.setAttribute("onmousedown","block_del('del')");
	new_text.addEventListener('dblclick',function(){
                block_del('rewrite');
            });
	drag.style.cssText="display:none";
});
onmouseup=function(){
	m_T='';
}
onmousemove=function(){
	dragable('move');
};
m_T='';
var dragable=function(type){//--------textarea拖动

	if(type=='down'){
		    mouseX=event.pageX,
			mouseY=event.pageY,
			aimX=drag.offsetLeft,
			aimY=drag.offsetTop;
			m_T='down';
	}
	else if(type=='move'&&m_T=='down'){
		var M_X=event.pageX,
			M_Y=event.pageY;
		drag.style.left=aimX+M_X-mouseX+'px';
		drag.style.top=aimY+M_Y-mouseY+'px';
	}
	else{
		m_T="";
	}
}
//-------------------------------------------------------item_info菜单
for(var li_len=0;li_len<item_info.getElementsByTagName('li').length;li_len++){
	item_info.getElementsByTagName('li')[li_len].setAttribute("onclick","item_info_f("+li_len+")");
}
item_info.addEventListener('mouseover',function(){
	config.this_target.parentNode.style.background="#e33";
});
item_info.addEventListener('mouseout',function(){
	config.this_target.parentNode.style.background="";
});
var item_info_f=function(pos){//-----功能
	if(pos==0){//-----修改文章名
		var name;
		var oldname=config.this_target.innerText;
		if((name=prompt("输入新名称:",oldname))){
			NewData.title=name;
			var formdata=new FormData();
			formdata.append("json",JSON.stringify(NewData));
			formdata.append("oldtitle",oldname);
			xml.open("POST","rename.php",false);
			xml.send(formdata);
			if(xml.responseText==''){
				config.this_target.innerText=name;
			}
			else alert("未知错误"+xml.responseText);
		}

	}
	else if(pos==1){//----删除文件

		var aim=config.this_target.href.substr(config.this_target.href.indexOf('?')+1);
		var aim_title=config.this_target.innerText;
		if(!confirm("是否删除文件 "+aim_title)) return 0;
		xml.open('GET','json_del.php?file_name='+aim+"&title="+aim_title,false);
		xml.send(null);
		if(xml.responseText=='1'){//---删除成功
			window.location.href='index.php';
		}
		else if(xml.responseText=='0'){
			alert('文件不存在');
		}
		else{
			alert('未知错误\n'+xml.responseText);
		}
	}
	else if(pos==2){//---关闭
		item_info.style.display='none';
	}
}
//-----------------------------------------删除block or修改
var block_del=function(val){
	if(event.button==0&&val=='rewrite'){
		config.edite_target=event.target;
		var sub_attr=event.target.getAttribute('attr').substr(0,3);
		if(sub_attr=='cod'){
			config.edite_statu='codeEdite';
		}
		else if(sub_attr=='tex'){
			config.edite_statu='textEdite';
		}
		config.editebox();
		textarea.value=event.target.innerText;
	}
	else if(event.button==2){
		event.target.style.background="red";
		if(confirm("是否删除该内容")){
			event.target.outerHTML="";
			delete NewData[event.target.getAttribute('attr')];
		}
		else{
			event.target.style.background="";
		}
	}
}
