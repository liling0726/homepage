/*
 * @made by cz；
 */
var userData, // 初始化的时候所有老师信息
currentPage, // 当前页
totalNum, // 查询总条数
maxPage, // 最大页数
keyWord = "";// 关键字
$(function() {
	$("#alertdiv").hide();//面包屑下面的警告框
	currentPage = $("#currentPage").val();
	maxPage = $("#max").val();
	// alert(maxPage);
	if (currentPage == "undefined" || currentPage == "")
		currentPage = 1;
	// 初始化
	initial();
	// 添加模态框的根据学院id显示院系
	var acadId = $("#userAcadName").val();
	selectDeptByAcadId($("#userDeptName"), acadId);// 添加模态框中根据学院Id显示院系
	/*
	 * //修改模态框的根据学院id显示院系 var upacadId=$("#upUserAcadName").val();
	 * selectDeptByAcadId($("#upUserDeptName"),upacadId);//修改模态框中根据学院Id显示院系
	 */// 全选，取消全选
	$("#selectAll").click(function() {
		if (this.checked) {
			$(':checkbox').prop('checked', true);
		} else {
			$(':checkbox').removeAttr('checked');
		}
	});
	/*
	 * 功能：添加 后台参数:user.user_num,user.user_name,user.user_dept_id
	 */
	$("#add")
	.click(
			function() {
				var userNum = $("#userNum").val(), 
				userName = $("#userName").val(),
				userDeptId = $("#userDeptName").val();
				userAcadId = $("#userAcadName").val();
				// alert(isSetAdmin);
				$
						.ajax({
							type : "post",
							content : "application/x-www-from-urlencoded;charset=UTF-8",
							dataType : "json",
							url : "../adminAdminInfo/save",
							data : "admin.admin_num=" + userNum
									+ "&admin.admin_name=" + userName
									+ "&admin.admin_dept_id="+ userDeptId
									+ "&admin.admin_acad_id="+ userAcadId,
							async : false,
							success : function(result) {
								$("#alertdiv").show();
								var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
										"<span aria-hidden=\"true\">&times;</span></button>" +result.result;
								$("#alertdiv").html(html);
								initial();
							},
							error : function(e) {
								console.log("错误：" + e.message);
							}
						});
			});
	/*
	 * 功能：删除 后台参数：所要删除的老师Id 描述:可以删除多条，以字符串的形式返给后台，以'-'连接
	 */
	$("#userDeleteByIds").bind("click", function() {
		var length = $("input[name='checkboxGroup']:checked").length;
		if (length == 0) {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>请选择要删除的管理员记录！";
			$("#alertdiv").html(html);
			return false;
		} else if (confirm("确定要删除" + length + "条管理员信息？")) {
			var str = "";
	
			$("input[name='checkboxGroup']:checked").each(function() {

				str += $(this).val() + '-';		//alert($(this).val() + '-');
			});

			str = str.substring(0, str.length - 1);
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>"+str;
			$("#alertdiv").html(html);
			$.ajax({
				type : "post",
				content : "application/x-www-from-urlencoded;charset=UTF-8",
				url : "../adminAdminInfo/delete",
				dataType : "json",
				data:{
					ID:str				},
				success : function(result) {
					$("#alertdiv").show();
					var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
							"<span aria-hidden=\"true\">&times;</span></button>" +result.result;
					$("#alertdiv").html(html);
					initial();
				},
				error : function(e) {
					console.log("错误：" + e.message);
				}

			});

		}
	});

	// 点击修改按钮
	$("#userUpdateById").click(function() {
		var length = $("input[name='checkboxGroup']:checked").length;
		if (length == 0) {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>请选择要修改的管理员记录！";
			$("#alertdiv").html(html);
			initial();
			return false;
		} else if (length > 1) {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>对不起，只能选择有一条修改记录！";
			$("#alertdiv").html(html);
			initial();
			return false;
		} else {
			var userId = $("input[name='checkboxGroup']:checked").val();
			for (var i = 0; i < userData.list.length; i++) {

				if (userId == userData.list[i].admin_id) {

					$("#upUserNum").val(userData.list[i].admin_num);
					//alert(userData.list[i].admin_num);
					$("#upUserName").val(userData.list[i].admin_name);
									for (var j = 0; j < $("#upUserAcadName")[0].options.length; j++) {

										if ($("#upUserAcadName")[0].options[j].text == userData.list[i].acad_name) {

											$("#upUserAcadName")[0].options[j].selected = true;

											selectDeptByAcadId(
													$("#upUserDeptName"),
													$("#upUserAcadName")[0].options[j].value,
													userData.list[i].dept_name);
										}

									}

									$("input[name='isAdmin']")
											.each(
													function() {
														if ($(this).val() == userData.list[i].user_is_admin) {
															$(this).attr(
																	"checked",
																	"checked");
														}
													})
									break;
								}

							}
							$("#updateModal").show();
						}
					});
	/*
	 * 功能：修改 后台参数：需要修改的老师Id-->user.user_id, 老师名-->user.user_Name,
	 * 院系Id-->user.user_dept_id, 是否为管理员-->user.user_is_admin
	 * 
	 */
	$("#upUserInfo").click(
			function() {
				var userId = $("input[name='checkboxGroup']:checked").val();
				var userNum = $("#upUserNum").val();
				var userName = $("#upUserName").val();
				var userDeptId = $("#upUserDeptName").val();
				updateUser(userId, userNum, userName, userDeptId);
			});
	// 跳转
	$("#goto").bind("click", function() {
		var gotopage = $("#gotoPage").val();
		if (!gotopage.match("^\\d+$")) {// 判断是否为数字
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>请输入规范的页码！";
			$("#alertdiv").html(html);
			return;
		}
		if (gotopage < 1 || gotopage > totalNum) {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>超出总页数！";
			$("#alertdiv").html(html);
			return false;
		} else {
			currentPage = gotopage;
			// 调用查询
			if (keyWord == "" || keyWord == null)
				initial();
			else
				searchByKey(keyWord);
		}

	});
	// 下一页
	$("#pageforward").bind("click", function() {

		if (currentPage < totalNum) {
			currentPage = parseInt(currentPage) + 1;
			// 调用查询
			if (keyWord == "" || keyWord == null)
				initial();
			else
				searchByKey(keyWord);
		} else {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>超出总页数！";
			$("#alertdiv").html(html);
			return;
		}

	});
	// 上一页
	$("#pagebackward").bind("click", function() {

		if (currentPage > 1) {
			currentPage = parseInt(currentPage) - 1;
			// 调用查询
			if (keyWord == "" || keyWord == null)
				initial();
			else
				searchByKey(keyWord);
		} else {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>小于总页数！";
			$("#alertdiv").html(html);
			return;
		}

	});
	// 点击首页，显示第一页数据
	$("#firstPage").bind("click", function() {
		if (currentPage == 1) {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>已经第一页了！";
			$("#alertdiv").html(html);
			return false;
		} else {
			currentPage = 1;
			// 调用查询
			if (keyWord == "" || keyWord == null)
				initial();
			else
				searchByKey(keyWord);
		}
	});
	// 点击末页，显示最后页数据
	$("#lastPage").bind("click", function() {
		if (currentPage == totalNum) {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>已经是最后页了！";
			$("#alertdiv").html(html);
			return false;
		} else {
			currentPage = totalNum;
			// 调用查询
			if (keyWord == "" || keyWord == null)
				initial();
			else
				searchByKey(keyWord);
		}
	});
	// 每页显示页数
	$("#max").bind("change", function() {
		maxPage = $("#max").val();
		$("#alertdiv").show();
		var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
				"<span aria-hidden=\"true\">&times;</span></button>每页显示"+maxPage+"条!";
		$("#alertdiv").html(html);
		// alert(maxPage);
		// 调用查询
		if (keyWord == "" || keyWord == null)
			initial();
		else
			searchByKey(keyWord);
	});
	/*
	 * 添加模态框中的学院对应相应院系 后台参数：学院Id
	 */
	$("#userAcadName").bind("change", function() {
		var acadId1 = $(this).val();
		selectDeptByAcadId($("#userDeptName"), acadId1);// 添加模态框中根据学院Id显示院系
	});
	/*
	 * 修改模态框中的学院对应相应院系 后台参数：学院Id
	 */
	$("#upUserAcadName").bind("change", function() {
		var acadId2 = $(this).val();
		selectDeptByAcadId($("#upUserDeptName"), acadId2);// 添加模态框中根据学院Id显示院系
	});
	/*
	 * 功能：搜索关键字 后台参数：key（关键字），pageSize（每页显示多少条），pageNumber（当前页）
	 */
	$("#searchByKey").click(function() {
		keyWord = $("#searchWord").val();
		searchByKey(keyWord);
	});
});

/*
 * 初始化页面
 */
function initial() {
	$("#selectAll").removeAttr('checked');
	// alert(currentPage);
	$
			.ajax({
				type : "post",
				content : "application/x-www-form-urlencoded;charset=UTF-8",
				dataType : "json",
				url : "../adminAdminInfo/" + currentPage + "-" + maxPage,
				async : "false",
				success : function(result) {
					var html = "";
					userData = result.adminAdminInfo;
					var total = userData.totalRow;
					totalNum = userData.totalPage
					for (var i = 0; i < userData.list.length; i++) {
						html += "<tr><td><input type='checkbox' name='checkboxGroup' value='"
								+ userData.list[i].admin_id
								+ "' name='groupCheckbox'></td><td>"
								+ userData.list[i].admin_num
								+ "</td><td>"
								+ userData.list[i].admin_name
								+ "</td><td>"
								+ userData.list[i].acad_name
								+ "</td><td>"
								+ userData.list[i].dept_name + "</td>";

					}
					$("#teacherShow").html(html);
					$("#currentPage").html(userData.pageNumber);
					$("#totalPage").html(totalNum);
					$("#pageNum").html(userData.totalRow);
				},
				error : function(e) {
					console.log("错误：" + e);
				}

			});
	// 初始化学院
	acadInitial();
}
// 根据学院Id查找相应专业
function selectDeptByAcadId(obj, acadId) {
	var deptInfo = "";
	var adeptName = arguments[2] || null;
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../adminTeacherInfo/findDeptByAcadId/" + acadId,
		async : "false",
		success : function(result) {
			var data = result.deptList;
			deptlenght = data.length;
			for (var i = 0; i < data.length; i++) {
				if (adeptName == data[i].dept_name && adeptName != null) {
					deptInfo += "<option  selected='selected' value='"
							+ data[i].dept_id + "'>" + data[i].dept_name
							+ "</option>";
				} else
					deptInfo += "<option value='" + data[i].dept_id + "'>"
							+ data[i].dept_name + "</option>";
			}
			obj.html(deptInfo);// 添加模态框中根据学院Id显示院系
		},
		error : function(e) {
			console.log("错误:" + e.message);
		}
	});
}
// 根据关键字查询
function searchByKey(key) {
	$
			.ajax({
				type : "post",
				content : "application/x-www-form-urlencoded;charset=UTF-8",
				dataType : "json",
				url : "../adminAdminInfo/findAdminByKey",
				async : "false",
				data : {
					key : key,
					pageSize : maxPage,
					pageNumber : currentPage,
				},

				success : function(result) {
					var html = "";
					userData = result.keyAdminPage;
					totalNum = userData.totalPage
					for (var i = 0; i < userData.list.length; i++) {
						html += "<tr><td><input type='checkbox' name='checkboxGroup' value='"
								+ userData.list[i].admin_id
								+ "' name='groupCheckbox'></td>"
								+ "<td>"
								+ userData.list[i].admin_num
								+ "</td>"
								+ "<td>"
								+ userData.list[i].admin_name
								+ "</td>"
								+ "<td>"
								+ userData.list[i].acad_name
								+ "</td>"
								+ "<td>"
								+ userData.list[i].dept_name + "</td>";
					//alert(userData.list[i].admin_num);
					}
					$("#teacherShow").html(html);
					$("#currentPage").html(userData.pageNumber);
					$("#totalPage").html(userData.totalPage);
					$("#pageNum").html(userData.totalRow);
				}
			});
}
function updateUser(userId, userNum, userName, userDeptId) {
	$.ajax({
		type : "post",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../adminAdminInfo/update",
		data : "admin.admin_id=" + userId + "&admin.admin_num=" + userNum
				+ "&admin.admin_name=" + userName + "&admin.admin_dept_id="
				+ userDeptId,
		async : false,
		success : function(result) {
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>" +result.result;
			$("#alertdiv").html(html);
			initial();
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});
	location.reload();
}

/*初始化学院
 * 
 */
function acadInitial() {
	$.ajax({
		type : "post",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../index/acadName",
		async : false,
		success : function(result) {
			result = result.acadName;
			var acadHtml = "";
			for (var i = 0; i < result.length; i++) {
				acadHtml += "<option value='" + result[i].acad_id + "'>"
						+ result[i].acad_name + "</option>";
			}
			//添加模态框中学院的初始化
			$("#userAcadName").html(acadHtml);
			//修改模态框中学院的初始化
			$("#upUserAcadName").html(acadHtml);
		},
	});
}