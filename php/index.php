<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>绯想天 - github</title>
	
	<link rel="stylesheet" href="../index_css/c.css">
	<link id="type" rel="stylesheet" href="../index_css/item.css">
	<link rel="stylesheet" href="index_css/index.css">
	
</head>
<body >
	<div class="nav_bg">
		绯想天 - git
		<span id="signature">彼岸花，千年妖娆，谁的前世今朝</span>
	</div>
	<div class="main_body">
		<div id="position"><a href="index.html">首页</a><a href="javascript:void(0)"></a></div>
		<h1 id="title">最新文章</h1>
		<div id="item" class="item" onselectstart="return false"></div>

		<div id="text" class="text"></div>
	</div>
	<ul id="meun">
		<li>注入日期</li>
		<li>插入图片</li>
		<li>文字编辑</li>
		<li>插入代码</li>
		<li>保存</li>
	</ul>
	<input style="display:none" type="file" id="file" onchange="ajax_up()" >
	<div id="drag">
		<div id="textarea_div"></div>
		<textarea  name="" id="textarea" cols="30" rows="10"></textarea>
	</div>
	
	<ul id="item_info">
		<li>修改</li>
		<li>删除</li>
		<li>关闭</li>
	</ul>

	<div id="foot">
		<span>copyritgt:@绯想天.github</span>
	</div>
	<script src="index_js/edite.js"></script>
	<script src="index_js/index.js"></script>
	
</body>
</html>