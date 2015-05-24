$(function(){
	var common={
		
				navHtml: '<nav class="navbar navbar-default">'
				  +'<div class="container-fluid">'
	+'<div class="navbar-header">' 
	+'<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">'  
	+'<span class="sr-only">Toggle navigation</span>'  
	+'<span class="icon-bar"></span>' 
				        +'<span class="icon-bar"></span>' 
				        +'<span class="icon-bar"></span>' 
				        +'</button>' 
				        +'<a class="navbar-brand" href="#" style="color:#003366;font-weight:bold;font-size:30px;">西南科技大学<small style="color:gray;">教师个人主页</small></a>'
				        +'</div>'
				        +'<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">'

				        +'<form class="navbar-form navbar-right" role="search">'
				        +'<div class="form-group">'
				        +'<input id="searchWords" type="text" class="form-control" placeholder="姓名/学院/系别">' 
				        +'</div>'
				        +'<button id="search" type="button" class="btn btn-info " style="margin-left:5px;">搜索</button>'
				        +'</form>'
				        +'<ul class="nav navbar-nav navbar-right">'
						+'<li><a href="homePage.html">'
						+'<span class="glyphicon glyphicon-home"></span>&nbsp;首页</a></li>'		
						+'<li><a href="#" data-toggle="modal" data-target="#myModal">'
						+'<span class="glyphicon glyphicon-log-in"></span>&nbsp;登录</a></li>'
						+'<li><a href="#"><span class="glyphicon glyphicon-question-sign"></span>&nbsp;帮助</a></li></ul></div></div></nav>'
						+'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
						+'"<div class="modal-dialog">'
						+'<div class="modal-content">'
						+'<div class="modal-header">'
						+'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'  
						+'<h3 class="modal-title" id="myModalLabel" style="font-weight:bold;">登录</h3>' 
						+'</div>' 
						+'<div class="modal-body" style="font-size:18px;margin-left:50px;">' 
						+'<p class="form-inline"><span for="teaNum">教工号：</span><input type="text" id="teaNum"  class="form-control" style="width:250px;"></p>'  
						+'<p  style="margin-top:25px;" class="form-inline"><span for="teaPassword">密&nbsp;&nbsp; 码：</span><input type="password" id="teaPassword" class="form-control" style="width:250px;"></p>'  
						+'<p  style="margin-top:25px;" class="form-inline"><span for="teaPassword">验证码：</span>'
						+'<input type="text" class="form-control" placeholder="验证码" id="authcode">'
							+' <img id="imgcode" src="../html/checkcode.jsp" alt="验证码"> <span>看不清？'
							+'<a href="javascript:void(0)" class="changeOne">换一张</a></span>'
							+' <label id="authcode_succeed" class="blank invisible"></label> '
							+'<label id="authcode_error" class="hide"></label>'
						+'</p>'
						
						+'</div>'  
						+'<div class="modal-footer">' 
						+'<button type="button" class="btn btn-info">登录</button>'        
						+'<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>'   
						+'</div></div></div></div>',
				
				footerHtml:'<p style="padding-top:10px;">西南科技大学@数据与知识工程</p>'

	
	};
	$("#top").html(common.navHtml);
	$("#footer").html(common.footerHtml);
	$("#imgcode").click(function(){
		 reloadcode();
	})
	$(".changeOne").click(function(){
		 reloadcode();
	})
	function reloadcode(){
		$("#imgcode").attr("src","checkcode.jsp?random="+Math.random());
	}
	
	

});