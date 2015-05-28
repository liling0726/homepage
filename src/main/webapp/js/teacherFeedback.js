var myDate = new Date();
var currentPage, // 当前页
totalNum, // 一页总条数
maxPage;// 最大页数
$(document)
		.ready(
				function() {
					currentPage=$("#currentPage").val();
					 maxPage=$("#max").val();
					 //alert(maxPage);
					 if(currentPage=="undefined"||currentPage=="")
						 currentPage=1;
					 //初始化
						initial();
					
					$("li").delegate("span[name='span1']", "click", function() {
						$(this).parent().remove();
					});
					$("#confirm")
							.on(
									"click",
									function() {
										var text = $("#textarea1").val();
										if (text == "")
											alert("没有文字！");
										else {
											$("#suggestion")
													.append(
															"<li><a href=\"#\">"
																	+ text
																	+ "<span class=\"label label-info\">已解决</span><span>"
																	+ myDate
																			.getFullYear()
																	+ "-"
																	+ (myDate
																			.getMonth() + 1)
																	+ "-"
																	+ myDate
																			.getDate()
																	+ "</span></a></li>");
											$
													.ajax({
														type : "post",
														content : "application/x-www-from-urlencoded;charset=UTF-8",
														dataType : "json",
														url : "../teacherFeedback/save",
														data : {
															feedbackString : text
														},
														async : false,
														success : function(
																result) {
															alert(result.result);
															window.location
																	.reload();
														},
														error : function(e) {
															console
																	.log("错误："
																			+ e.message);
														}
													});
										}

										$("#textarea1").val("");
									});
					$("#suggestion li").find("span[name='deleteSpan']").hide();
					$("#suggestion li").mouseover(function() {
						$(this).find("span[name='deleteSpan']").show();
					})
					$("#suggestion li").mouseleave(function() {
						$(this).find("span[name='deleteSpan']").hide();
					})
					$("span[name='deleteSpan']").click(function() {
						alert("确认删除？");
					});
				});
/*
 * 初始化页面
 */
function initial() {
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherFeedback/" + currentPage + "-" + maxPage,
		async : "false",
		success : function(result) {

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
		//调用查询
		if(keyWord==""||keyWord==null)
		initial();
		else searchByKey(keyWord);
	}

});
//	下一页
$("#pageforward").bind("click",function(){
	
	if(currentPage<totalNum)
	{
	currentPage=parseInt(currentPage)+1;
	//调用查询
	if(keyWord==""||keyWord==null)
	initial();
	else searchByKey(keyWord);
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
	//调用查询
	if(keyWord==""||keyWord==null)
	initial();
	else searchByKey(keyWord);
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
	//调用查询
	if(keyWord==""||keyWord==null)
	initial();
	else searchByKey(keyWord);
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
	//调用查询
	if(keyWord==""||keyWord==null)
	initial();
	else searchByKey(keyWord);
	}
});
//每页显示页数
$("#max").bind("change",function(){
	 maxPage=$("#max").val();
	 //alert(maxPage);
	//调用查询
		if(keyWord==""||keyWord==null)
		initial();
		else searchByKey(keyWord);
});

// 只是為了測試一下
// @Author zengdan
/*$("#add").click(
 function() {
 var feedbackContent = "hphp;h;ge";
 feedbackAnserContent = "我也不知道啊啊";
 feedbackIsAnsered = "1";
 feedbackUpdateTime = "2015-05-14 17:45:33";
 feedbackUserId = "4";
 // alert(isSetAdmin);
 $.ajax({
 type : "post",
 content : "application/x-www-from-urlencoded;charset=UTF-8",
 dataType : "json",
 url : "../teacherFeedback/save",
 data : "feedback.feedback_content=" + feedbackContent
 + "&feedback.feedback_anser_content=" + feedbackAnserContent
 + "&feedback.feedback_is_ansered=" + feedbackIsAnsered
 + "&feedback.feedback_update_time=" + feedbackUpdateTime
 + "&feedback.feedback_user_id=" + feedbackUserId,
 async : false,
 success : function(result) {
 alert(result.result);
 window.location.reload();
 },
 error : function(e) {
 console.log("错误：" + e.message);
 }
 });
 });*/
//測試到此為止