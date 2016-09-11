<?php
/*
	传入json字符串
	从json中获取title和file_name
	file_name做json文件名
	title向Mainfestival.json中注册
*/
$json=json_decode($_POST['json']);
$tag=$json->tag;
$file_name=$json->file_name;
$title=$json->title;

$exists='false';
if(file_exists('../data/'.$file_name.'.json')){//--文件存在就不用注册
	$exists='true';
}
$f=fopen("../data/".$file_name.".json", "w");
fwrite($f, $_POST["json"]);
fclose($f);

if($exists=='true'){//---成功存储 但不用再注册
	exit("1");
}

$json=file_get_contents("../data/Mainfestival.json");
$json=json_decode($json);
$len = count($json->$tag);

$new_json='{}';
$new_json=json_decode($new_json);
$new_json->$title=$file_name;

array_push($json->$tag, $new_json);

$json=json_encode($json,true);
$f=fopen("../data/Mainfestival.json","w");
fwrite($f,$json);
fclose($f);
echo "1";
?>