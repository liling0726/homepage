/*
 * @author:李玲；
*/
var userData;
$(function(){
	
//初始化
	initial();
	//全选，取消全选
	$("#selectAll").click(function(){
		if(this.checked){
			$(':checkbox').prop('checked',true);
		}else{
			$(':checkbox').removeAttr('checked');
		}
	});
/*功能：添加
 * 后台参数:user.user_num,user.user_name,user.user_dept_id
	*/
	$("#add").click(function(){
		var userNum=$("#userNum").val(),
		userName=$("#userName").val(),
		userDeptId=$("#userDeptName").val(),
		isSetAdmin=$("input[name=admin]:checked").val();//还未实现
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"/adminTeacherInfo/save",
			data:"user.user_num="+userNum+"&user.user_name="+userName+"&user.user_dept_id="+userDeptId,
			async:false,
			success:function(result){
				alert(result.result);
				window.location.reload();
			},
			error:function(e){
				console.log("错误："+e.message);
			}
		});
	});
/*	
 * 功能：删除
 * 后台参数：所要删除的老师Id
 * 描述:可以删除多条，以字符串的形式返给后台，以'-'连接
	*/
	$("#userDeleteByIds").bind("click",function(){
		var length=$("input[name='checkboxGroup']:checked").length;
		if(length==0)
			{
			alert("请选择要删除的老师记录");
			return false;
			}
		else if(confirm("确定要删除"+length+"条老师信息？"))
			{
			var str="";
			$("input[name='checkboxGroup']:checked").each(function(){
				
				str += $(this).val()+'-';
			});
			
			str=str.substring(0,str.length-1);
			alert(str);
			$.ajax({
				type:"post",
				content:"application/x-www-from-urlencoded;charset=UTF-8",
				url:"/adminTeacherInfo/delete/"+str,
				dataType:"json",				
				success:function(result){
					alert(result.result);	
					location.reload();
				},
				error:function(e){
					console.log("错误："+e.message);
				}
				
			});
			
			}
	});

	//点击修改按钮
	$("#userUpdateById").click(function(){
		var length=$("input[name='checkboxGroup']:checked").length;
		if(length==0)
			{
			alert("请选择要修改的老师记录");
			location.reload();
			return false;
			}
		else if(length>1)
			{
			alert("对不起，只能选择有一条修改记录！");
			location.reload();
			return false;
			}
		else{
			var userId=$("input[name='checkboxGroup']:checked").val();
			for(var i=0;i<userData.list.length;i++)
				{
				if(userId==userData.list[i].user_id)
					{
					
					$("#upUserNum").val(userData.list[i].user_num);
					$("#upUserName").val(userData.list[i].user_name);
					break;
					}
				}
			$("#updateModal").show();
		}
	});
	/*	
	 * 功能：修改
	 * 后台参数：需要修改的老师Id-->user.user_id,
	 *         老师名-->user.user_Name,
	 *         院系Id-->user.user_dept_id,
	 *         是否为管理员-->,(还未写)
	 *         
		*/
	$("#upUserInfo").click(function(){
		var userId=$("input[name='checkboxGroup']:checked").val();
		var userNum=$("#upUserNum").val();
		var userName=$("#upUserName").val();
		var userDeptId=$("#upUserDeptName").val(),
		isSetAdmin=$("input[name=admin]:checked").val();//未实现
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"/adminTeacherInfo/update",
			data:"user.user_id="+userId+"&user.user_num="+userNum+"&user.user_name="+userName+"&user.user_dept_id="+userDeptId,
			async:false,
			success:function(result){
				alert(result.result);
				window.location.reload();
			},
			error:function(e){
				console.log("错误："+e.message);
			}
		});
		
	});
//跳转
$("#goto").bind("click",function(){
	var gotopage=$("#gotopage").val();
	if(!gotopage.match("^\\d+$")){//判断是否为数字
		alert("请输入规范的页码");
		return;
	}
	if(gotopage<1||gotopage>recordCount)
	{
		alert("超出总页数！");
	}
	else
	{
		pagebegin=gotopage;
		$("#currentPage").html(gotopage);
//调用查询，还未写
	}

});
//	下一页
$("#pageforward").bind("click",function(){
	pagebegin=parseInt(currentPage)+1;

	if(pagebegin<recordCount+1)
	{
		currentPage++;
		$("#currentPage").html(currentPage);
	}
	else{
		alert("超出总页数");
		return;
	}
	
	//调用查询，还未写
});
//	上一页
$("#pagebackward").bind("click",function(){
	pagebegin=parseInt(currentPage)-1;
	if(pagebegin>=1||pagebegin==1)
	{
		currentPage--;
		$("#currentPage").html(currentPage);
	}
	else{
		alert("小于总页数");
		return;
	}
	//调用查询，还未写
});	
});

/*
 * 初始化页面
*/
function initial(){
	$("#selectAll").removeAttr('checked');
	$.ajax({
		type:"post",
		content:"application/x-www-form-urlencoded;charset=UTF-8",
	    dataType:"json",
	    url:"/adminTeacherInfo",
	    async:"false",
	    success:function(result){
	    	var html="";
	         userData=result.userPage;
	    	 var total=userData.totalRow;
	    	 for(var i=0;i<userData.list.length;i++)
	    		 {
	    		 html+="<tr><td><input type='checkbox' name='checkboxGroup' value='"+userData.list[i].user_id+"' name='groupCheckbox'></td>"
	    			 +"<td>"+userData.list[i].user_num+"</td>"
	    		       +"<td>"+userData.list[i].user_name+"</td>"
	    		       +"<td>"+userData.list[i].acad_name+"</td>"
	    		       +"<td>"+userData.list[i].dept_name+"</td>"
	    		       +"<td><button class='btn btn-default'>是</td></tr>"
	    		      
	    		 }
	    	 $("#teacherShow").append(html);
	    	 $("#currentPage").append(userData.pageNumber);
	    	 $("#totalPage").append(userData.totalPage);
	    },
	    error:function(e){
	    	console.log("错误："+e);
	    }
	});
	
}