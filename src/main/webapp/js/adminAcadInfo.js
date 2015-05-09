//bug:1搜索之后不能删除 2必须开始的时候覆盖所有的元素3添加的要刷新后才能删除

var data = new Array();
var currentPage=1,//当前页
totalNum=10,//本页总条数
maxPage;//最大页数
var end=0,beginNum=0;//控制页数
// var modal_button=0;//button和模态框的对应数字
var keyWord;

$("#max").val(20);//search有bug,有关键字就不能翻页！！！
totalNum=20;
$(function() {

	$("table tr td:nth-child(2)").mouseover(function(e) {

		var pos = mousePosition(e);
		$(".classAndTeam").css({
			"left" : pos.x + 20 + "px",
			"top" : pos.y
		});
		$(".classAndTeam").show();

	})
	$("table tr td:nth-child(2),.classAndTeam").mouseout(function() {
		$(".classAndTeam").hide();
	});
	$(".classAndTeam").mouseover(function() {
		$(this).show();
	});
	function mousePosition(ev) {
		if (ev.pageX || ev.pageY) {
			return {
				x : ev.pageX,
				y : ev.pageY
			};
		}
		return {
			x : ev.clientX + document.body.scrollLeft
					- document.body.clientLeft,
			y : ev.clientY + document.body.scrollTop - document.body.clientTop
		};
	}

	/* 导入后台数据，点击模态框按钮添加内容到表格 */
	/* 宾健 */
	initial();
	function initial() {
		$
				.ajax({
					type : "get",
					content : "application/x-www-from-urlencoded;charset=UTF-8",
					dataType : "json",
					url : "/adminacadinfo/index",
					/* data:"user.user_num="+userNum+"&user.user_name="+userName+"&user.user_dept_id="+userDeptId, */
					async : false,
					success : function(result) {
						data = result.result;
						var j = beginNum;//统一编号变量
						//用冗余的方法算出从原数据哪里开始遍历，显示
						end=0;
						for (var k = 0;k<data.length;k++) {
							if(k==0||data[k].acad_name!=data[k-1].acad_name)
								{
								end++;
								if((beginNum+1)==end)break;
								}
						}
						end=0;
						//清空
						$("#maintable").html("<tr><th>序号</th><th>学院</th><th colspan=\"2\">系别</th></tr>");
						for (var i = k;i<data.length;i++) {
							if(end >= totalNum&&data[i].acad_name!=data[i-1].acad_name)break;//放在下面个if里会有莫名其妙的bug
							if(i==k||data[i].acad_name!=data[i-1].acad_name)
								{
								end++;
								$("#maintable")
									.append(
											"<tr><td>"
													+ (j + 1)
													+ "</td><td>"
													+ data[i].acad_name
													+ "</td><td><ul id=\"deptli"
													+ j
													+ "\"class=\"classInfo\"></ul></td>"
													+ "<td style=\"width: 100px;\"><div class=\"buttonGroup\"><button id=\"adddeptbtn"
													+ j
													+ "\"class=\"btn btn-danger btn-xs\" "
													+ "data-toggle=\"modal\"data-target=\"#insertModal"
													+ j
													+ "\">添加</button>"
													+ "<button class=\"btn btn-info btn-xs\">删除</button></div></td></tr>"
									);
							/* 动态添加模态框，使得模态框按钮id最后一位为数字，此数字与点击弹出模态框的按钮编号相同，从而获得此按钮的id！不容易想到 */
							$("#modals")
									.append(
											"<div class=\"modal fade\" id=\"insertModal"
													+ j
													+ "\" tabindex=\"-1\" role=\"dialog\"aria-labelledby=\"myModalLabel\" "
													+ "aria-hidden=\"true\"><div class=\"modal-dialog modal-sm\"><div class=\"modal-content\"><div class=\"modal-header\">"
													+ "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
													+ "<h4 class=\"modal-title\" id=\"myModalLabel\">添加系别</h4></div><div class=\"modal-body\"><p>系别："
													+ "<input type=\"text\" style=\"width: 200px; height: 30px;\"value=\"请输入系名\"></p><div class=\"modal-footer\"><button id=\"addacadbtn"
													+ j
													+ "\"type=\"button\" "
													+ "class=\"btn btn-primary\">添加</button><button id=\"deleteacad\"type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消"
													+ "</button></div></div></div></div>");
							j=j+1;
								}
							$("#deptli" + (j-1)).append(
										"<li><input type=\"checkbox\">&nbsp;&nbsp;<a>"
												+ data[i].dept_name
												+ "</a></li>");
							
							}
					},
					error : function(e) {
						console.log("错误：" + e.message);
					}
				});
		
		//算总页数
		end=0;
		for (var i = 0;i<data.length;i++) {
			if(i==0||data[i].acad_name!=data[i-1].acad_name)
				{
				end++;
				}
		}
		maxPage=Math.ceil(end/totalNum);//总页数
		currentPage=beginNum/totalNum+1;//当前页
		
		//显示当前页等信息
		$("#currentPage").html(currentPage);
		$("#maxPage").html(maxPage);
	}
	/* 添加 */
	$(".modal-body")
			.find(".btn-primary")
			.click(
					function() {
						var deptdname = $(this).parents(".modal-body").find(
								"input").val();
						if (deptdname == "请输入系名" || deptdname == "")
							alert("请输入系名!");
						else {
							var acadname;
							/* 获取模态框按钮id，从而对应弹出模态框按钮id */
							var str = $(this).attr("id");
							str = str.charAt(str.length - 1)
							//var num=str+(currentPage-1)*beginNum+1;
							var snum = parseInt(str);
							acadname=$("#deptli"+snum).parents("td").prev().html();
							$("#deptli" + snum).append(
									"<li><input type=\"checkbox\">&nbsp;&nbsp;<a>"
											+ deptdname + "</a></li>");
							$
									.ajax({
										type : "post",
										content : "application/x-www-from-urlencoded;charset=UTF-8",
										dataType : "json",
										url : "/adminacadinfo/addDept",
										data : {
											oneDept : deptdname,
											acadName: acadname,
										},
										async : false,
										success : function(result) {
											alert("添加成功！");
										},
										error : function(e) {
											console.log("错误：" + e.message);
										}
									});
						}
					});
	/* 删除 */
	$(".buttonGroup")
			.find(".btn-info")
			.on(
					"click",
					function() {
						var j = 0;
						var text;
						$(this).parents(".buttonGroup").parent().prev().find(
								"input:checked").each(function() {
							j++;
						});
						if (j != 0) {
							text = "你确定要删除选中的" + j + "个系吗？"
							if (window.confirm(text)) {
								/*var deptdelenum = new Array();
								var i = 0;*/
								var str="";
								/* 遍历选中的checkbox进行相关操作 */
								$(this)
										.parents(".buttonGroup")
										.parent()
										.prev()
										.find("input:checked")
										.each(
												function() {
													str +="-"+$(this)
															.parent().children(
																	"a").html();
													$(this).parent().remove();
													/* alert(deptdelenum[i-1]); */
												});
								alert(str);

								$.ajax({
									type : "post",
									content : "application/x-www-from-urlencoded;charset=UTF-8",
									dataType : "json",
									url : "/adminacadinfo/deleteDept",
									data : {
										deptStr : str,
									},
									async : false,
											success: function(result) {
												/* alert("删除成功！"); */
											},
											error : function(e) {
												console.log("错误：" + e.message);
											}
										});
								return true;
							} else {
								// alert("取消");
								return false;
							}
						} else {
							alert("您一条也没选！");
						}
					});

	$(".modal-body input").mouseover(function() {
		if ($(this).val() == "请输入系名") {
			$(this).val("");
		}
	});
	$(".modal-body input").mouseout(function() {
		if ($(this).val() == "") {
			$(this).val("请输入系名");
		}
	});
	// 按学院或系搜索。
	$("#searchbtn").on("click",
	function searchByKey(key) {
		keyWord=$("#searchInput").val();
		if(keyWord==null)
			alert("请输入关键字！");//其实没必要要这个
		else {
		$ 
				.ajax({
					type : "post",
					content : "application/x-www-from-urlencoded;charset=UTF-8",
					dataType : "json",
					url : "/adminacadinfo/findAcadOrDept",
					data:{key:keyWord},
					async : false,
					success : function(result) {
						data = result.result;
						data = result.result;
						var j = 0;//统一编号变量
						//搜索从来都是从0开始显示的，这个表的数据少，特殊！！！
						k=0;
						end=0;
						//清空
						$("#maintable").html("<tr><th>序号</th><th>学院</th><th colspan=\"2\">系别</th></tr>");
						for (var i = k;i<data.length;i++) {
							if(end >= totalNum&&data[i].acad_name!=data[i-1].acad_name)break;//放在下面个if里会有莫名其妙的bug
							if(i==k||data[i].acad_name!=data[i-1].acad_name)
								{
								end++;
								$("#maintable")
									.append(
											"<tr><td>"
													+ (j + 1)
													+ "</td><td>"
													+ data[i].acad_name
													+ "</td><td><ul id=\"deptli"
													+ j
													+ "\"class=\"classInfo\"></ul></td>"
													+ "<td style=\"width: 100px;\"><div class=\"buttonGroup\"><button id=\"adddeptbtn"
													+ j
													+ "\"class=\"btn btn-danger btn-xs\" "
													+ "data-toggle=\"modal\"data-target=\"#insertModal"
													+ j
													+ "\">添加</button>"
													+ "<button class=\"btn btn-info btn-xs\">删除</button></div></td></tr>"
									);
							/* 动态添加模态框，使得模态框按钮id最后一位为数字，此数字与点击弹出模态框的按钮编号相同，从而获得此按钮的id！不容易想到 */
							$("#modals")
									.append(
											"<div class=\"modal fade\" id=\"insertModal"
													+ j
													+ "\" tabindex=\"-1\" role=\"dialog\"aria-labelledby=\"myModalLabel\" "
													+ "aria-hidden=\"true\"><div class=\"modal-dialog modal-sm\"><div class=\"modal-content\"><div class=\"modal-header\">"
													+ "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
													+ "<h4 class=\"modal-title\" id=\"myModalLabel\">添加系别</h4></div><div class=\"modal-body\"><p>系别："
													+ "<input type=\"text\" style=\"width: 200px; height: 30px;\"value=\"请输入系名\"></p><div class=\"modal-footer\"><button id=\"addacadbtn"
													+ j
													+ "\"type=\"button\" "
													+ "class=\"btn btn-primary\">添加</button><button id=\"deleteacad\"type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消"
													+ "</button></div></div></div></div>");
							j=j+1;
								}
							$("#deptli" + (j-1)).append(
										"<li><input type=\"checkbox\">&nbsp;&nbsp;<a>"
												+ data[i].dept_name
												+ "</a></li>");
							
							}
					},
					error : function(e) {
						console.log("错误：" + e.message);
					}
				});
		
		//算总页数
		end=0;
		for (var i = 0;i<data.length;i++) {
			if(i==0||data[i].acad_name!=data[i-1].acad_name)
				{
				end++;
				}
		}
		maxPage=Math.ceil(end/totalNum);//总页数
		currentPage=beginNum/totalNum+1;//当前页
		//只要搜索后都定位第一页
		currentPage=1;
		
		//显示当前页等信息
		$("#currentPage").html(currentPage);
		$("#maxPage").html(maxPage);
		}
	}
	);
	//加翻页功能。
	
	//跳转
	$("#goto").bind("click",function(){
		var gotopage=$("#gotoPage").val();
		alert(gotopage);
		if(!gotopage.match("^\\d+$")){//判断是否为数字
			alert("请输入规范的页码");
			return;
		}
		if(gotopage<1||gotopage>maxPage)
		{
			alert("超出总页数！");
			return false;
		}
		else
		{
			currentPage=gotopage;
			beginNum=(currentPage-1)*totalNum;//计算从多少条数据开始
			//调用查询
			keyWord=$("#searchInput").val();
			//if(keyWord==""||keyWord==null)
			initial();
			//else searchByKey(keyWord);//一般搜索后只有一页，点什么也到不了这里。否则就会显示不出来，这个bug以后再改！！！
		}

	});
//		下一页
	$("#pageforward").bind("click",function(){
		
		if(currentPage<maxPage)
		{
		currentPage=parseInt(currentPage)+1;
		beginNum=(currentPage-1)*totalNum;//计算从多少条数据开始
		//调用查询
		keyWord=$("#searchInput").val();
		//if(keyWord==""||keyWord==null)
		initial();
		//else searchByKey(keyWord);
		}
		else{
			alert("超出总页数");
			return;
		}
		
	});
//		上一页
	$("#pagebackward").bind("click",function(){
		
		if(currentPage>1)
		{currentPage=parseInt(currentPage)-1;
		beginNum=(currentPage-1)*totalNum;//计算从多少条数据开始
		//调用查询
		keyWord=$("#searchInput").val();
		//if(keyWord==""||keyWord==null)
		initial();
		//else searchByKey(keyWord);
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
		beginNum=(currentPage-1)*totalNum;//计算从多少条数据开始
		//调用查询
		keyWord=$("#searchInput").val();
		//if(keyWord==""||keyWord==null)
		initial();
		//else searchByKey(keyWord);
		}
	});
	//点击末页，显示最后页数据
	$("#lastPage").bind("click",function(){
		if(currentPage==maxPage)
			{
			alert("已经是最后页了");
			return false;
			}
		else{
		currentPage=maxPage;
		beginNum=(currentPage-1)*totalNum;//计算从多少条数据开始
		//调用查询
		keyWord=$("#searchInput").val();
		//if(keyWord==""||keyWord==null)
		initial();
		//else searchByKey(keyWord);
		}
	});
	//每页显示页数
	$("#max").bind("change",function(){
		 totalNum=$("#max").val();
		 maxPage=Math.ceil(end/totalNum);//总页数
		 currentPage=1;//当前页
		 beginNum=(currentPage-1)*totalNum;//计算从多少条数据开始
		 //alert(totalNum);
		//调用查询
		 keyWord=$("#searchInput").val();
			//if(keyWord==""||keyWord==null)
				initial();
			//else searchByKey(keyWord);
	});
});