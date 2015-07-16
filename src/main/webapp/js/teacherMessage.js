var currentPage, // 当前页
	totalNum, // 最大页数
	maxPage;// 一页总条数
$(document).ready(function(){
	$("#alertdiv").hide();//面包屑下面的警告框
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
						html+="<li id=\"" 
							+data[i].message_id
							+"\"><div><span>&nbsp;<a title='"
							+data[i].message_email
							+"'>"
							+data[i].user_name
							+"</a>&nbsp;&nbsp;&nbsp;&nbsp;<label>" 
							+data[i].message_submit_time
							+"发表</label>&nbsp;&nbsp;&nbsp;&nbsp;<label name=\"deletex\" title=\"删除\">×</label></span><div id = 'bottomDiv'><div id = 'picDiv'><img style='border-radius:4px;'height='50' width='50' src='../img/CSDN.png'/></div><div id = 'contentDiv'>"
							+data[i].message_content
							+"</div></div><div id='clearBothDiv'></div></li>";
			
				}
				$("#mainUl").html(html);
				/*$("label[name='saw']").each(function(){
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
				$("label[name='saw']").click(function(){
					var spanHtml;
					var id=$(this).parents("li").attr("id");
					spanHtml=$(this).html();
					if(spanHtml=="未查看")
					{
						$(this).html("已查看");
						$(this).css("color","DarkGray");
						$
						.ajax({
							type : "post",
							content : "application/x-www-from-urlencoded;charset=UTF-8",
							dataType : "json",
							url : "../teacherMessage/update",
							data:"message.message_id="+id+"&message.message_is_view="+1,
							async : false,
							success : function(result) {
								$("#alertdiv").show();
								var html=
										"标记成功！";
								$("#alertdiv p").html(html);
							},
							error : function(e) {
								console
										.log("错误："
												+ e.message);
							}
						});
					}*/
					/*if(spanHtml=="已查看"){
						$(this).html("未查看");
						$(this).css("color","red");
						$
						.ajax({
							type : "post",
							content : "application/x-www-from-urlencoded;charset=UTF-8",
							dataType : "json",
							url : "../teacherMessage/update",
							data:"message.message_id="+id+"&message.message_is_view="+0,
							async : false,
							success : function(result) {
							},
							error : function(e) {
								console
										.log("错误："
												+ e.message);
							}
						});
					}
					
				});*/
				$("#mainUl li").find("label[name='deletex']").hide();
				$("#mainUl li").mouseover(function() {
					$(this).find("label[name='deletex']").show();
				});
				$("#mainUl li").mouseleave(function() {
					$(this).find("label[name='deletex']").hide();
				});
				$("label[name='deletex']").click(function() {
					var id;
					id=$(this).parents("li").attr("id");
					$.ajax({
						type : "post",
						content : "application/x-www-form-urlencoded;charset=UTF-8",
						dataType : "json",
						url : "../teacherMessage/delete",
						data:{ID:id},
						async : "false",
						success : function(result) {
							$("#alertdiv").show();
							var html=
									"" +result.result;
							$("#alertdiv p").html(html);
							initial();
							
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
			$("#alertdiv").show();
			var html="请输入规范的页码！";
			$("#alertdiv p").html(html);
			return;
		}
		if(gotopage<1||gotopage>totalNum)
		{
			$("#alertdiv").show();
			var html=
					"超出总页数！";
			$("#alertdiv p").html(html);
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
			$("#alertdiv").show();
			var html=
					"超出总页数！";
			$("#alertdiv p").html(html);
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
			$("#alertdiv").show();
			var html="小于总页数！";
			$("#alertdiv p").html(html);
			return;
		}

	});
//点击首页，显示第一页数据
	$("#firstPage").bind("click",function(){
		if(currentPage==1)
		{
			$("#alertdiv").show();
			var html="已经第一页了！";
			$("#alertdiv p").html(html);
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
			$("#alertdiv").show();
			$("#alertdiv").class();
			var html="已经是最后页了！";
			$("#alertdiv p").html(html);
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
		$("#alertdiv").show();
		var html=
				"每页显示"
					+maxPage
					+"条！";
		$("#alertdiv p").html(html);
		initial();
	});

});

//只是為了測試一下
//@Author zengdan
/*$("#add")
 .click(function () {
 var messageUserId = "4";
 messageEmail = "4844884231@qq.com";
 messageContent = "dehwphwhg";
 messageSubmitTime = "2015-05-14 17:45:33";
 messageIsView = "0";
 // alert(isSetAdmin);
 $.ajax({
 type : "post",
 content : "application/x-www-from-urlencoded;charset=UTF-8",
 dataType : "json",
 url : "../teacherMessage/save",
 data : "message.message_user_id=" + messageUserId
 + "&message.message_email=" + messageEmail
 + "&message.message_content=" + messageContent
 + "&message.message_submit_time=" + messageSubmitTime
 + "&message.message_is_view=" + messageIsView,
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
