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
var ajax=function(url){
    xml.open("get",url,false);
    xml.send(null);
    return xml.responseText;
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
    eval(ajax("data/android.json"));
    for(var keyName in data){
        var div=createDOM(text,'div',{"class":"box"});
        var img=createDOM(div,'img',{"src":"data/img/"+data[keyName]['img']});
        var div=createDOM(div,'div',{"class":"describe"});
        for(var i=0;i<data[keyName]['tag'].length;i++){
            var tag=createDOM(div,'div',{"class":"tag"});
            tag.innerText=data[keyName]['tag'][i];
        }
        
        var info=createDOM(div,'div',{"class":"info"});
        info.innerText="日期"+data[keyName]['info'];
        var subText=createDOM(div,'div',{"class":"subText"});
        subText.innerText=data[keyName]['subText'];
    }
    
}

var new_page=function(data){//---新页面打开
    eval(data);
    title.innerHTML=data.title;
    var span=createDOM(text,'span',{"class":"date"});
    span.innerText=data.date;
    for(var keyName in data){
        if(keyName.substr(0,3)=="img"){
            var img=createDOM(text,'img',{"src":"data/"+data.root+data[keyName]});
        }
        else if(keyName.substr(0,4)=="text"){
            var subText=createDOM(text,'div',{"class":"subText"});
            subText.innerText=data[keyName];
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

