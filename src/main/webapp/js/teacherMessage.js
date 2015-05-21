var myDate = new Date();
$(document).ready(
	function(){
$("li").delegate("span[name='span1']", "click", function() {
	$(this).parent().remove();
});
$("#confirm")
		.on(
				"click",
				function() {
					var text = $("#textarea1").val();
					if(text=="")
						alert("没有文字！");
					else
						{
					$("#suggestion").append("<li><a href=\"#\">" 
							+text
							+"<span class=\"label label-info\">已解决</span><span name=\"span1\"" 
							+"class=\"label label-info\">删除</span><span>"
							+myDate.getFullYear()
							+"-"
							+(myDate.getMonth()+1)
							+"-"
							+myDate.getDate()
							+"</span></a></li>"
							);
						}
				});
});

//添加过后要刷新！！！！！！！！！！！！！！！！！！！