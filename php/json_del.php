<?php
/*
	删除json相关信息
	1.获取json文件
	2.获取json的title	tag
	3.删除可能存在的图片文件夹
	4.删除json本身
	5.向Mainfestival注销信息

	特别提示：json键取值
		：$josn->keyName[offset]  正确
		：$json->$var 	正确
		：$var='keyName';
		  $json->$var[offset]->keyName 如果$var是字符串 错误
		  解决办法：$var='keyName';
		  		    $json_tmp=&$json->$var 	 可以取地址
		  		    $json_tmp[offset]->keyName	成功
		
		:unset()不会删除数组的下标	array_splice()会删除下标

 */
$file_name=$_GET['file_name'];
if(file_exists('../data/'.$file_name.'.json')){
	$json=file_get_contents('../data/'.$file_name.'.json');
	$json=json_decode($json);
	$title=$json->title;
	$tag=$json->tag;
}
if(is_dir("../data/".$file_name)){//----删除可能存在的文件夹
	$duir=opendir("../data/".$file_name);
	while(($dir=readdir($duir))!==false){
		if($dir!='.'&&$dir!='..'){
			unlink('../data/'.$file_name.'/'.$dir);
		}
	}
	rmdir("../data/".$file_name);
}
if(file_exists('../data/'.$file_name.'.json')){//---删除本身
	unlink('../data/'.$file_name.'.json');
	echo "1";
}
else{
	echo "0";
}


$json=file_get_contents('../data/Mainfestival.json');//---注销
$json=json_decode($json);
$json_tmp=&$json->$tag;//----解决办法：取址代替
for($i=0;$i<count($json_tmp);$i++){
	if(isset($json_tmp[$i]->$title)&&$json_tmp[$i]->$title==$file_name){
		//unset($json_tmp[$i]);
		array_splice($json_tmp,$i,1);//-----删除下标
		break;
	}
}
$json=json_encode($json);
$f=fopen('../data/Mainfestival.json', "w");
fwrite($f, $json);
fclose($f);


?>