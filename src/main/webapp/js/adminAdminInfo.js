/*
 * @made by Chengzeng；
 */

// 初始化的时候所有管理员信息
var adminData,

// 当前页
currentPage,

// 查询总条数
totalNum,

// 最大页数
maxPage,

// 关键字
keyWord = "";

$(function() {
	currentPage = $("#currentPage").val();
	maxPage = $("#max").val();
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
	 * 功能：添加 后台参数:admin.admin_num,
	 * admin.admin_name,
	 * admin.admin_acad_id,
	 * admin.admin_dept_id
	 */
	$("#add")
			.click(
					function() {
						var adminNum = $("#adminNum").val(), 
						adminName = $("#adminName").val(),
						adminAcadId = $("#adminAcadName").val(),
						adminDeptId = $("#adminDeptName").val();
						// alert(isSetAdmin);
						$
								.ajax({
									type : "post",
									content : "application/x-www-from-urlencoded;charset=UTF-8",
									dataType : "json",
									url : "/adminAdminInfo/save",
									data : "admin.admin_num=" + adminNum
											+ "&admin.admin_name=" + adminName
											+ "&admin.admin_acad_id="+ adminAcadId
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
});




// 初始化页面
function initial() {
	$("#selectAll").removeAttr('checked');
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
			for (var i = 0; i < data.length; i++) {
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
