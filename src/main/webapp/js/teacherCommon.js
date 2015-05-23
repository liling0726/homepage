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
					+' <li><a href="teacherIndex.html">首页</a></li>'
					+' <li><a href="#">基本信息</a></li>'
					+' <li><a href="teacherColumnManage.html">栏目管理</a></li>'
					+' <li><a href="teacherNewsManage.html">新闻管理</a></li>'
					+' <li><a href="teacherMessage.html">动态留言</a></li>'
					+' <li><a href="teacherFeedback.html">意见与反馈</a></li>'
					+' <li><a href="">admin</a></li>'
					+' <li><a href="#">退出</a></li>'
					+'</ul>'
					+' </div><!-- /.navbar-collapse -->'
					+' </div><!-- /.container-fluid -->'
					+'</nav>',
					footerHtml:'<p>西南科技大学@数据与知识工程</p>'
					/*leftColumnHtml:'<div class="panel panel-default" style="font-weight:bold;">'
						+'<div class="panel-heading"><a href="#">首页</a></div>'
						+'<div class="panel-heading"><a href="teacherColumnManage.html">栏目管理</a></div>'
						+'<div class="panel-heading"><a href="teacherInfoManage.html">信息管理</a></div>'
						+'<div class="panel-heading"><a href="teacherNewsManage.html">新闻管理</a></div>'
						+'</div>'*/

		};
	/*	$("#leftColumn").html(adminCommon.leftColumnHtml);*/
		$("#top").html(adminCommon.navHtml);
		$("#footer").html(adminCommon.footerHtml);

	});
})
