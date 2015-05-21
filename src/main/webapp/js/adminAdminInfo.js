/*
 * @made by Chengzeng；
 */
var adminData, // 初始化的时候所有管理员信息
currentPage, // 当前页
totalNum, // 查询总条数
maxPage, // 最大页数
keyWord = "";// 关键字
$(function() {
	currentPage = $("#currentPage").val();
	maxPage = $("#max").val();
	// alert(maxPage);
	if (currentPage == "undefined" || currentPage == "")
		currentPage = 1;
	// 添加模态框的根据学院id显示院系
	var acadId = $("#adminAcadName").val();
	selectDeptByAcadId($("#adminDeptName"), acadId);// 添加模态框中根据学院Id显示院系
	// 修改模态框的根据学院id显示院系
	var upacadId = $("#upAdminAcadName").val();
	selectDeptByAcadId($("#upAdminDeptName"), upacadId);// 修改模态框中根据学院Id显示院系
	// 初始化
	initial();
	// 全选，取消全选
	$("#selectAll").click(function() {
		if (this.checked) {
			$(':checkbox').prop('checked', true);
		} else {
			$(':checkbox').removeAttr('checked');
		}
	});
	/*
	 * 功能：添加 后台参数:admin.admin_num,admin.admin_name,admin.admin_dept_id
	 */
	$("#add")
			.click(
					function() {
						var adminNum = $("#adminNum").val(), 
						adminName = $("#adminName").val(),
						adminDeptId = $("#adminDeptName").val();
						adminAcadId = $("#adminAcadName").val();
						// alert(isSetAdmin);
						$
								.ajax({
									type : "post",
									content : "application/x-www-from-urlencoded;charset=UTF-8",
									dataType : "json",
									url : "/adminAdminInfo/save",
									data : "admin.admin_num=" + adminNum
											+ "&admin.admin_name=" + adminName
											+ "&admin.admin_dept_id="+ adminDeptId
											+ "&admin.admin_acad_id="+ adminAcadId,
									async : false,
									success : function(result) {
										alert(result.result);
										window.location.reload();
									},
									error : function(e) {
										console.log("错误：" + e.message);
									}
								});
					});
	/*
	 * 功能：删除 后台参数：所要删除的管理员Id 描述:可以删除多条，以字符串的形式返给后台，以'-'连接
	 * 不可用，admin_id存在问题。
	 */
	$("#adminDeleteByIds").bind("click", function() {
		var length = $("input[name='checkboxGroup']:checked").length;
		if (length == 0) {
			alert("请选择要删除的管理员记录");
			return false;
		} else if (confirm("确定要删除" + length + "条管理员信息？")) {
			var str = "";
			$("input[name='checkboxGroup']:checked").each(function() {

				str += $(this).val() + '-';
			});

			str = str.substring(0, str.length - 1);
			alert(str);
			$.ajax({
				type : "post",
				content : "application/x-www-from-urlencoded;charset=UTF-8",
				url : "/adminAdminInfo/delete",
				dataType : "json",
				data:{
					ID:str				},
				success : function(result) {
					alert(result.result);
					location.reload();
				},
				error : function(e) {
					console.log("错误：" + e.message);
				}

			});

		}
	});

	// 点击修改按钮
	$("#adminUpdateById").click(function() {
		var length = $("input[name='checkboxGroup']:checked").length;
		if (length == 0) {
			alert("请选择要修改的管理员记录");
			location.reload();
			return false;
		} else if (length > 1) {
			alert("对不起，只能选择有一条修改记录！");
			location.reload();
			return false;
		} else {
			var adminId = $("input[name='checkboxGroup']:checked").val();
			for (var i = 0; i < adminData.list.length; i++) {

				if (adminId == adminData.list[i].admin_id) {

					$("#upAdminNum").val(adminData.list[i].admin_num);
					$("#upAdminName").val(adminData.list[i].admin_name);
					break;
				}
			}
			$("#updateModal").show();
		}
	});
	/*
	 * 功能：修改 后台参数：需要修改的管理员Id-->admin.admin_id, 管理员名-->admin.admin_Name,
	
	 */
	$("#upAdminInfo")
			.click(
					function() {
						var adminId = $("input[name='checkboxGroup']:checked")
								.val();
						var adminNum = $("#upAdminNum").val();
						var adminName = $("#upAdminName").val();
						var adminDeptId = $("#upAdminDeptName").val();
						$
								.ajax({
									type : "post",
									content : "application/x-www-from-urlencoded;charset=UTF-8",
									dataType : "json",
									url : "/adminAdminInfo/update",
									data : "admin.admin_id=" + adminId
											+ "&admin.admin_num=" + adminNum
											+ "&admin.admin_name=" + adminName
											+ "&admin.admin_dept_id="+ adminDeptId,
											
									async : false,
									success : function(result) {
										alert(result.result);
										window.location.reload();
									},
									error : function(e) {
										console.log("错误：" + e.message);
									}
								});

					});
	// 跳转
	$("#goto").bind("click", function() {
		var gotopage = $("#gotoPage").val();
		if (!gotopage.match("^\\d+$")) {// 判断是否为数字
			alert("请输入规范的页码");
			return;
		}
		if (gotopage < 1 || gotopage > totalNum) {
			alert("超出总页数！");
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
			alert("超出总页数");
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
			alert("小于总页数");
			return;
		}

	});
	// 点击首页，显示第一页数据
	$("#firstPage").bind("click", function() {
		if (currentPage == 1) {
			alert("已经第一页了");
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
			alert("已经是最后页了");
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
		// alert(maxPage);
		// 调用查询
		//alert(keyWord);
		if (keyWord == "" || keyWord == null)
			initial();
		else
			searchByKey(keyWord);
	});
	/*
	 * 添加模态框中的学院对应相应院系 后台参数：学院Id
	 */
	$("#adminAcadName").bind("change", function() {
		var acadId1 = $(this).val();
		selectDeptByAcadId($("#adminDeptName"), acadId1);// 添加模态框中根据学院Id显示院系
	});
	/*
	 * 修改模态框中的学院对应相应院系 后台参数：学院Id
	 */
	$("#upAdminAcadName").bind("change", function() {
		var acadId2 = $(this).val();
		selectDeptByAcadId($("#upAdminDeptName"), acadId2);// 添加模态框中根据学院Id显示院系
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
	//alert(maxPage);
	// alert(currentPage);
	$
			.ajax({
				type : "post",
				content : "application/x-www-form-urlencoded;charset=UTF-8",
				dataType : "json",
				url : "/adminAdminInfo/" + currentPage + "-" + maxPage,
				async : "false",
				success : function(result) {
					var html = "";
					adminData = result.adminAdminInfo;
					var total = adminData.totalRow;
					totalNum = adminData.totalPage
					for (var i = 0; i < adminData.list.length; i++) {
						html += "<tr><td><input type='checkbox' name='checkboxGroup' value='"
								+ adminData.list[i].admin_id
								+ "' name='groupCheckbox'></td><td>"
								+ adminData.list[i].admin_num
								+ "</td><td>"
								+ adminData.list[i].admin_name
								+ "</td><td>"
								+ adminData.list[i].acad_name
								+ "</td><td>"
								+ adminData.list[i].dept_name + "</td>";
						

					}
					$("#adminShow").html(html);
					$("#currentPage").html(adminData.pageNumber);
					$("#totalPage").html(totalNum);
				},
				error : function(e) {
					console.log("错误：" + e);
				}

			});
}
// 根据学院Id查找相应专业
// 后台未写acadId，故引用老师管理页面的地址：url : "/adminTeacherInfo"
function selectDeptByAcadId(obj, acadId) {
	var deptInfo = "";
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "/adminAdminInfo/findDeptByAcadId/" + acadId,
		async : "false",
		success : function(result) {
			var data = result.deptList;
			for (var i = 0; i < data.length; i++)
			{
				deptInfo += "<option value='" + data[i].dept_id + "'>"
						+ data[i].dept_name + "</option>"
			}
			obj.html(deptInfo);// 添加模态框中根据学院Id显示院系
		},
		error : function(e) {
			console.log("错误:" + e.message);
		}
	});

}
// 根据关键字查询
// 后台无key传递
function searchByKey(key) {
	$
			.ajax({
				type : "post",
				content : "application/x-www-form-urlencoded;charset=UTF-8",
				dataType : "json",
				url : "/adminAdminInfo/findAdminByKey",
				async : "false",
				data : {
					keyAdminPage : key,
					pageSize : maxPage,
					pageNumber : currentPage,
				},

				success : function(result) {
					var html = "";
					var data = result.keyAdminAdminPage;
					totalNum = data.totalPage
					for (var i = 0; i < data.list.length; i++)
					{
						html += "<tr><td><input type='checkbox' name='checkboxGroup' value='"
								+ data.list[i].admin_id
								+ "' name='groupCheckbox'></td>"
								+ "<td>"
								+ data.list[i].admin_num
								+ "</td>"
								+ "<td>"
								+ data.list[i].admin_name
								+ "</td>"
								+ "<td>"
								+ data.list[i].acad_name
								+ "</td>"
								+ "<td>"
								+ data.list[i].dept_name 
								+ "</td>";
					
					}
					$("#adminShow").html(html);
					$("#currentPage").html(data.pageNumber);
					$("#totalPage").html(data.totalPage);
				}
			});
}
