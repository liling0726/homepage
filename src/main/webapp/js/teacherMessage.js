var currentPage, // 当前页
totalNum, // 最大页数
maxPage;// 一页总条数
$(document).ready(function(){
	currentPage=$("#currentPage").val();
	 maxPage=$("#max").val();
	 //alert(maxPage);
	 if(currentPage=="undefined"||currentPage=="")
		 currentPage=1;
	 //初始化
		initial();

/*
 * 初始化页面
 */
function initial() {
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherMessage/" + currentPage + "-" + maxPage,
		async : "false",
		success : function(result) {
			totalNum=result.teacherMessage.totalPage;
			var data=result.teacherMessage.list;
			var html="";
			for(var i = 0;i<data.length;i++){
				if(i==data.length-1)
					{
					html+="<li id=\"" 
						+i
						+"\"><div class=\"noborder\"><div><a>"
						+data[i].user_name
						+":</a>&nbsp;&nbsp;&nbsp;<span>" 
						+data[i].message_content
						+"</span><span name=\"deletex\" title=\"删除\">×</span></div><div><span name=\"saw\">"
						+"未查看" 
						+"</span><span>"
						+"2015-5-24 20:02" 
						+"</span><span>"
						+data[i].message_email
						+"</span></div></div></li>";
					}
				else{
					html+="<li id=\"" 
						+i
						+"\"><div class=\"liborder\"><div><a>"
						+data[i].user_name
						+":</a>&nbsp;&nbsp;&nbsp;<span>" 
						+data[i].message_content
						+"</span><span name=\"deletex\" title=\"删除\">×</span></div><div><span name=\"saw\">"
						+"未查看" 
						+"</span><span>"
						+"2015-5-24 20:02" 
						+"</span><span>"
						+data[i].message_email
						+"</span></div></div></li>";
				}
			}
			$("#mainUl").html(html);
			$("span[name='saw']").each(function(){
				var spanHtml;
				spanHtml=$(this).html();
				if(spanHtml=="已查看")
					{
					$(this).css("color","DarkGray");
					}
				if(spanHtml=="未查看"){
					$(this).css("color","red");
				}
	});
			$("span[name='saw']").click(function(){
				var spanHtml;
				spanHtml=$(this).html();
				if(spanHtml=="未查看")
					{
					$(this).html("已查看");
					$(this).css("color","DarkGray");
					}
				if(spanHtml=="已查看"){
					$(this).html("未查看");
					$(this).css("color","red");
				}
			});
			$("#mainUl li").find("span[name='deletex']").hide();
			$("#mainUl li").mouseover(function() {
				$(this).find("span[name='deletex']").show();
			});
			$("#mainUl li").mouseleave(function() {
				$(this).find("span[name='deletex']").hide();
			});
			$("span[name='deletex']").click(function() {
				var id;
				alert("确认删除？");
				id=parseInt($(this).parents("li").attr("id"))+(currentPage-1)*maxPage;
				alert(id);
				$.ajax({
					type : "post",
					content : "application/x-www-form-urlencoded;charset=UTF-8",
					dataType : "json",
					url : "../teacherMessage/delete",
					data:{id:id},
					async : "false",
					success : function(result) {
						
					},
				error:function(e){
					console.log("错误：" + e);
				}
				});
			});
			
			 $("#currentPage").html(result.teacherMessage.pageNumber);
	    	 $("#totalPage").html(totalNum);
		},
		error : function(e) {
			console.log("错误：" + e);
		}
	});
}

// 添加过后要刷新！！！！！！！！！！！！！！！！！！！
//跳转
$("#goto").bind("click",function(){
	var gotopage=$("#gotoPage").val();
	if(!gotopage.match("^\\d+$")){//判断是否为数字
		alert("请输入规范的页码");
		return;
	}
	if(gotopage<1||gotopage>totalNum)
	{
		alert("超出总页数！");
		return false;
	}
	else
	{
		currentPage=gotopage;
		initial();
	}

});
//	下一页
$("#pageforward").bind("click",function(){
	
	if(currentPage<totalNum)
	{
	currentPage=parseInt(currentPage)+1;
	initial();
	}
	else{
		alert("超出总页数");
		return;
	}
	
});
//	上一页
$("#pagebackward").bind("click",function(){
	
	if(currentPage>1)
	{currentPage=parseInt(currentPage)-1;
	initial();
	}
	else{
		alert("小于总页数");
		return;
	}

});
//点击首页，显示第一页数据
$("#firstPage").bind("click",function(){
	if(currentPage==1)
		{
		alert("已经第一页了");
		return false;
		}
	else{
	currentPage=1;
	initial();
	}
});
//点击末页，显示最后页数据
$("#lastPage").bind("click",function(){
	if(currentPage==totalNum)
		{
		alert("已经是最后页了");
		return false;
		}
	else{
	currentPage=totalNum;
	initial();
	}
});
//每页显示页数
$("#max").bind("change",function(){
	 maxPage=$("#max").val();
	 currentPage=1;
	 alert(maxPage);
	 initial();
});

});

