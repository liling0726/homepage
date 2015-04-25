$(function(){

	$(function(){
		var adminCommon={
				navHtml:'<nav class="navbar navbar-inverse">'
					+' <div class="container-fluid">'
					+'<div class="navbar-header">'
					+'<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">'
					+'<span class="sr-only">Toggle navigation</span>'
					+'<span class="icon-bar"></span>'
					+'<span class="icon-bar"></span>'
					+'<span class="icon-bar"></span>'
					+' </button>'
					+'<a class="navbar-brand" href="#" style="color:#fff;">教师个人主页</a>'
					+' </div>'
					+'<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">'
					+'<ul class="nav navbar-nav navbar-right">'
					+' <li><a href="javascript:void(0)" name="" onclick="linkToAddress(\'teacherHomePage1.html\')");">首页</a></li>'
					+' <li><a href="javascript:void(0)"  onclick="linkToAddress(\'teacherPasonalInstruction1.html\')">个人简介</a></li>'
					+' <li><a href="javascript:void(0)" onclick="linkToAddress(\'teacherProjectSearch1.html\')">项目研究</a></li>'
					+' <li><a href="javascript:void(0)">项目成果</a></li>'
					+' <li><a href="javascript:void(0)">科研团队</a></li>'
					+' <li><a href="javascript:void(0)">教学资源</a></li>'
					+' <li><a href="">修改样式</a></li>'
					+' <li><a href="">杨春明</a></li>'
					+' <li><a href="#">退出</a></li>'
					+'</ul>'
					+' </div><!-- /.navbar-collapse -->'
					+' </div><!-- /.container-fluid -->'
					+'</nav>',
					footerHtml:'<p style="padding:7px 0px;text-align:center;background:gray;width:100%;">西南科技大学@数据与知识工程</p>'


		};
		$("#top").html(adminCommon.navHtml);
		$("#footer").html(adminCommon.footerHtml);

	});
})
function linkToAddress(param){
	document.getElementById('iframemain').src=param;
	//alert(document.getElementById('iframemain').src);
	return false;
}

