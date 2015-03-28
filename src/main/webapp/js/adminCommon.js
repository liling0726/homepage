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
					 +'<a class="navbar-brand" href="#" style="color:#fff;">教师个人主页<span style="font-size:20px;font-weight:bold;">后台管理</span></a>'
					 +' </div>'
					 +'<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">'
					 +'<ul class="nav navbar-nav navbar-right">'
					 +' <li><a href="adminteacherInfo.html">老师管理</a></li>'
					 +' <li><a href="adminAcadInfo.html">学院管理</a></li>'
					 +' <li><a href="adminAdminInfo.html">管理员管理</a></li>'
					 +' <li><a href="#">注销</a></li>'
					 +'</ul>'
					 +' </div><!-- /.navbar-collapse -->'
					 +' </div><!-- /.container-fluid -->'
					 +'</nav>',
					footerHtml:'<p style="padding-top:10px;">西南科技大学@数据与知识工程</p>'

		
		};
		$("#top").html(adminCommon.navHtml);
		$("#footer").html(adminCommon.footerHtml);

	});
})