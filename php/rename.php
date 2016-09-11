<?php
/*
	从传递的json中取出title file_name和tag

	读取Mainfestival.json 
	修改Mainfestival 中的title

	覆盖json原文件。
 */
	$json=$_POST['json'];
	$oldtitle=$_POST['oldtitle'];
	$json=json_decode($json);
	$title=$json->title;
	$file_name=$json->file_name;
	$tag=$json->tag;
	//------以上取出了title和file_name以及tag
	//------以下取Mainfestival数据进行更新
	$json=file_get_contents("../data/Mainfestival.json");
	$json=json_decode($json);
	$json_tmp=&$json->$tag;//----指针
	for($item=0;$item<count($json_tmp);$item++){
		if(isset($json_tmp[$item]->$oldtitle)){//---判断title
			$addr=$json_tmp[$item]->$oldtitle;//---取title下的值
			array_splice($json_tmp,$item,1,array(array($title=>$addr)));//---覆盖
			//--------------------------------------------array 里面再包含array只能这样，否则无法保存键名[key]
			break;
		}
	}

	//-----覆盖
	$json=json_encode($json);
	$file=fopen("../data/Mainfestival.json","w");
	fwrite($file,$json);
	fclose($file);

?>