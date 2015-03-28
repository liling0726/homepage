$(function(){
	var common={
			navHtml:'<nav class="navbar navbar-default" role="navigation">'
				+'<div class="container-fluid">'
				+'<div class="navbar-header">'
				+'<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">'
				+'<span class="sr-only"></span>'
				+'<span class="icon-bar"></span>'
				+' <span class="icon-bar"></span>'
				+'<span class="icon-bar"></span>'
				+'</button><a class="navbar-brand" href="#">西南科技大学<small>教师个人主页</small></a></div>'
				+'<div class="collapse navbar-collapse"id="bs-example-navbar-collapse-1">'
				+'<ul class="nav navbar-nav navbar-right">'
				+'<li><a href="homePage.html">'
				+'<span class="glyphicon glyphicon-home"></span>&nbsp;首页</a></li>'		
				+'<li><a href="#" data-toggle="modal" data-target="#myModal">'
				+'<span class="glyphicon glyphicon-log-in"></span>&nbsp;登录</a></li>'
				+'<li><a href="#"><span class="glyphicon glyphicon-question-sign"></span>&nbsp;帮助</a></li></ul></div></div></nav>'
				+'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
				+'"<div class="modal-dialog modal-sm">'
				+'<div class="modal-content">'
				+'<div class="modal-header">'
				+'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'  
				+'<h4 class="modal-title" id="myModalLabel">登录</h4>' 
				+'</div>' 
				+'<div class="modal-body">' 
				+'<p><span for="teaNum">教工号：</span><input type="text" id="teaNum"></p>'  
				+'<p><span for="teaPassword">密&nbsp;&nbsp; 码：</span><input type="password" id="teaPassword"></p>'  
				+'</div>'  
				+'<div class="modal-footer">' 
				+'<button type="button" class="btn btn-info">登录</button>'        
				+'<button type="button" class="btn btn-warning" data-dismiss="modal">取消</button>'   
				+'</div></div></div></div>',
				footerHtml:'<p style="padding-top:10px;">西南科技大学@数据与知识工程</p>'

	
	};
	$("#top").html(common.navHtml);
	$("#footer").html(common.footerHtml);

});