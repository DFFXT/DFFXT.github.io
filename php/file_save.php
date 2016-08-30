<?php
/*
	最简单的文件保存
 */
$date=time();
if(!is_dir("../data/".$_POST['path'])){//---是否存在文件夹
	mkdir("../data/".$_POST['path']);
}
move_uploaded_file($_FILES['file']['tmp_name'], "../data/".$_POST['path']."/".$date.".png");
echo $date.".png";

?>