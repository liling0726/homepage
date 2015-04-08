$(function(){
$(".navbar").removeClass("navbar-default").addClass("navbar-inverse");
$(".navbar-brand").text("");
//首页随机显示12位教师头像及名字
$.ajax({
	type:"post",
	content : "application/x-www-form-urlencoded;charset=UTF-8",
	url:"user",
	dataType:'json',
	async:false,
	success:function(result){
		for(var i=0;i<result.length;i++)
			{
			html+="<div class='col-md-2'>"
    +"<div class='thumbnail'>"
      +"<a href='#'><img src='"+result[i].user_img+"' alt='...'></a>"
    +"</div>"
    +"<div class='personName'>"
    +"<a title='...' href='"+result[i].user_url +"'>"+result[i].user_name
    +"</a></div>"
    +"</div>";
			}  
		$("#userRandom").append(html);
	}
});
})