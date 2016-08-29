var item=document.getElementById("item");
var text=document.getElementById("text");
var page_css=document.getElementById("type");
var title=document.getElementById("title");
var page=window.location.href;
//------------ajax
if(window.XMLHttpRequest){
    var xml=new XMLHttpRequest();
}
else var xml=new ActiveXobject("Micorsoft.XMLHttp");
var ajax=function(url,variable){
    xml.open("get",url,false);
    xml.send(null);
    var data=xml.responseText;
    if(data.indexOf('{')<0){
        data="{}";
    }
    if(variable!=null){
        return "var "+variable+"="+data;
    }
    return "var data="+data;
}
//------------
var createDOM=function(parent,DOM,attr){//-----生成dom
    var DOM=DOM||'',attr=attr||'',parent=parent||document.body;
    if(DOM!='')
        var dom=document.createElement(DOM);
    if(attr!=''){
        for(var keyName in attr){
            dom.setAttribute(keyName,attr[keyName]);
        }
    }
    parent.appendChild(dom);
    return dom;    
}
var toggle=function(){//----点击隐藏与显示
    var hid=event.target.offsetHeight;
    var parent = event.target.parentNode;
    //alert(parent);
    if (parent.style.height==''||parent.style.height>hid) {

        parent.style.height=hid+'px';
    }
    else{
        parent.style.height='';
    }
}



var getClass=function(){//----获取列表
    
    eval(ajax("data/Mainfestival.json"));
    for(var keyName in data){
        var ul=createDOM(item,"ul",'');
        var li=createDOM(ul,'li','');

        li.addEventListener("click",toggle);
        li.innerText=keyName;
        for(var i=0;i<data[keyName].length;i++){
            for(var subKeyName in data[keyName][i]){
                var li=createDOM(ul,"li",'');
                var a =createDOM(li,'a',{"href":"index.html?"+data[keyName][i][subKeyName]});
                a.innerText=subKeyName;
            }
               
        }
    }
}

var getText=function(){//----默认页面
        var div,img,info,subText,sub_div;
        var img_flag,subText_flag;
        function New_item(){
            div=createDOM(text,'div',{"class":"box"});
            img=createDOM(div,'img',{"alt":"图片不存在或加载失败"});
            sub_div=createDOM(div,'div',{"class":"describe"});
            tag=createDOM(sub_div,'div',{"class":"tag"});
            info=createDOM(sub_div,'div',{"class":"info"});
            subText=createDOM(sub_div,'div',{"class":"subText"});
            img_flag=0;subText_flag=0;
        }
        function find_last_data(path){
            eval(ajax("data/"+path+'.json',"subdata"));
            if(!("tag" in subdata)) return 0;
            New_item();
            tag.innerText=subdata['tag'];
            info.innerText="日期"+subdata['date'];

            for(var subdata_keyName in subdata){
                if(subdata_keyName.substr(0,3)=='img'&&img_flag==0){
                    img.src='data/'+path+'/'+subdata[subdata_keyName];
                    img_flag=1;
                }
                if(subdata_keyName.substr(0,4)=='text'&&subText_flag==0){
                    subText.innerText=subdata[subdata_keyName];
                    subText_flag=1;
                }
                if(img_flag==1&&subText_flag==1) break;
            }

        }
        var ul_in_item=item.getElementsByTagName('ul');
        for(var i=0; i<ul_in_item.length;i++){
            var this_url=ul_in_item[i].lastChild.lastChild.href;
            this_url=this_url.substr(this_url.indexOf('?')+1);
            find_last_data(this_url);

        }
}

var new_page=function(data){//---新页面打开
    eval(data);
    title.innerHTML=data.title;
    var span=createDOM(text,'span',{"class":"date"});
    span.innerText=data.date;
    var span=createDOM(span,'span');
    span.innerText=" ["+data.tag+"]";
    for(var keyName in data){
        if(keyName.substr(0,3)=="img"){
            var img=createDOM(text,'img',{"src":"data/"+data.root+data[keyName]});
        }
        else if(keyName.substr(0,4)=="text"){
            var subText=createDOM(text,'div',{"class":"subText"});
            subText.innerHTML=data[keyName];
        }
        else if(keyName.substr(0,4)=="code"){
            var code=createDOM(text,'code');
            code.innerText=data[keyName];
        }
    }

}


getClass();
if(page.indexOf("?")<0){
    getText();
}
else{
    var addr="data/"+page.substr(page.indexOf("?")+1)+".json";
    type.href="index_css/describe.css";
    new_page(ajax(addr));
}
