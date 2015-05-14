/*
 * @author:李玲；
*/
var userData,//初始化的时候所有老师信息
currentPage,//当前页
totalNum,//查询总条数
maxPage,//最大页数
keyWord="";//关键字
$(function(){
	 currentPage=$("#currentPage").val();
	 maxPage=$("#max").val();
	 //alert(maxPage);
	 if(currentPage=="undefined"||currentPage=="")
		 currentPage=1;
	 //初始化
		initial();
	 //添加模态框的根据学院id显示院系
	 var acadId=$("#userAcadName").val();
     selectDeptByAcadId($("#userDeptName"),acadId);//添加模态框中根据学院Id显示院系
  /* //修改模态框的根据学院id显示院系
     var upacadId=$("#upUserAcadName").val();
     selectDeptByAcadId($("#upUserDeptName"),upacadId);//修改模态框中根据学院Id显示院系
*/	//全选，取消全选
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
		isSetAdmin=$("input[name=admin]:checked").val();
		//alert(isSetAdmin);
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"/adminTeacherInfo/save",
			data:"user.user_num="+userNum+"&user.user_name="+userName+"&user.user_dept_id="+userDeptId+"&user.user_is_admin="+isSetAdmin,
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
					for(var j=0;j<$("#upUserAcadName")[0].options.length;j++)
					{     
						
						if($("#upUserAcadName")[0].options[j].text==userData.list[i].acad_name)
							{
							
							$("#upUserAcadName")[0].options[j].selected = true;
							
							selectDeptByAcadId($("#upUserDeptName"),$("#upUserAcadName")[0].options[j].value,userData.list[i].dept_name);
							}
						
							}
					
					$("input[name='isAdmin']").each(function(){
						if($(this).val()==userData.list[i].user_is_admin)
							{
							$(this).attr("checked","checked");
							}
					})
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
	 *         是否为管理员-->user.user_is_admin
	 *         
		*/
	$("#upUserInfo").click(function(){
		var userId=$("input[name='checkboxGroup']:checked").val();
		var userNum=$("#upUserNum").val();
		var userName=$("#upUserName").val();
		var userDeptId=$("#upUserDeptName").val(),
		isSetAdmin=$("input[name=admin]:checked").val();
		updateUser(userId,userNum,userName,userDeptId,isSetAdmin);
	});
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
/*
 * 添加模态框中的学院对应相应院系
 * 后台参数：学院Id
*/
$("#userAcadName").bind("change",function(){
	var acadId1=$(this).val();
	selectDeptByAcadId($("#userDeptName"),acadId1);//添加模态框中根据学院Id显示院系
});
/*
 * 修改模态框中的学院对应相应院系
 * 后台参数：学院Id
*/
$("#upUserAcadName").bind("change",function(){
	var acadId2=$(this).val();
	selectDeptByAcadId($("#upUserDeptName"),acadId2);//添加模态框中根据学院Id显示院系
});
/*
 * 功能：搜索关键字
 * 后台参数：key（关键字），pageSize（每页显示多少条），pageNumber（当前页）
*/
$("#searchByKey").click(function(){
	 keyWord=$("#searchWord").val();
	searchByKey(keyWord);
});
});


/*
 * 初始化页面
*/
function initial(){
	$("#selectAll").removeAttr('checked');
	//alert(currentPage);
	$.ajax({
		type:"post",
		content:"application/x-www-form-urlencoded;charset=UTF-8",
	    dataType:"json",
	    url:"/adminTeacherInfo/"+currentPage+"-"+maxPage,
	    async:"false",
	    success:function(result){
	    	var html="";
	         userData=result.userPage;
	    	 var total=userData.totalRow;
	    	 totalNum=userData.totalPage
	    	 for(var i=0;i<userData.list.length;i++)
	    		 {
	    		 html+="<tr><td><input type='checkbox' name='checkboxGroup' value='"+userData.list[i].user_id+"' name='groupCheckbox'></td><td>"
	    			 +userData.list[i].user_num+"</td><td>"
	    		     +userData.list[i].user_name+"</td><td>"
	    		     +userData.list[i].acad_name+"</td><td>"
	    		     +userData.list[i].dept_name+"</td>";
	    		     if(userData.list[i].user_is_admin)
	    		    	 html+="<td><button class='btn btn-default' onclick='transformAdmin(this,userData.list["+i+"])' value='"+userData.list[i].user_id+"'>否</td></tr>";
	    		     else html+="<td><button class='btn btn-default' onclick='transformAdmin(this,userData.list["+i+"])'  value='"+userData.list[i].user_id+"'>是</td></tr>";
	    		      
	    		 }
	    	 $("#teacherShow").html(html);
	    	 $("#currentPage").html(userData.pageNumber);
	    	 $("#totalPage").html(totalNum);
	    },
	    error:function(e){
	    	console.log("错误："+e);
	    }
	    
	});
	//初始化学院
	acadInitial();
}
//根据学院Id查找相应专业
function selectDeptByAcadId(obj,acadId)
{ var deptInfo="";
var adeptName=arguments[2]||null;
$.ajax({
	type:"post",
	content:"application/x-www-form-urlencoded;charset=UTF-8",
    dataType:"json",
    url:"/adminTeacherInfo/findDeptByAcadId/"+acadId,
    async:"false",
    success:function(result){
     var data=result.deptList;
     deptlenght=data.length;
     for(var i=0;i<data.length;i++)
    	 {
  if(adeptName==data[i].dept_name&&adeptName!=null)
	  {
	  deptInfo+="<option  selected='selected' value='"+data[i].dept_id+"'>"+data[i].dept_name+"</option>";
	  }
  else deptInfo+="<option value='"+data[i].dept_id+"'>"+data[i].dept_name+"</option>";
    	 }
     obj.html(deptInfo);//添加模态框中根据学院Id显示院系
},
error:function(e){
	console.log("错误:"+e.message);
}
});
}
//根据关键字查询
function searchByKey(key){
	$.ajax({
		type:"post",
		content:"application/x-www-form-urlencoded;charset=UTF-8",
	    dataType:"json",
	    url:"/adminTeacherInfo/findUserByKey",
	    async:"false",
	    data:{
	    	key:key,
	    	pageSize:maxPage,
	    	pageNumber:currentPage,	
	    },
	    
	    success:function(result){
	    	var html="";
	    	userData=result.keyUserPage;
	         totalNum=userData.totalPage
	    	 for(var i=0;i<userData.list.length;i++)
	    		 {
	    		 html+="<tr><td><input type='checkbox' name='checkboxGroup' value='"+userData.list[i].user_id+"' name='groupCheckbox'></td>"
	    			 +"<td>"+userData.list[i].user_num+"</td>"
	    		       +"<td>"+userData.list[i].user_name+"</td>"
	    		       +"<td>"+userData.list[i].acad_name+"</td>"
	    		       +"<td>"+userData.list[i].dept_name+"</td>";
	    		       if(userData.list[i].user_is_admin)
		    		    	 html+="<td><button class='btn btn-default' onclick='transformAdmin(this)' value='"+userData.list[i].user_id+"'>否</td></tr>";
		    		     else html+="<td><button class='btn btn-default' onclick='transformAdmin(this)' value='"+userData.list[i].user_id+"'>是</td></tr>";
	    		      
	    		 }
	    	 $("#teacherShow").html(html);
	    	 $("#currentPage").html(userData.pageNumber);
	    	 $("#totalPage").html(userData.totalPage);
	    	}
	    });
}
function updateUser(userId,userNum,userName,userDeptId,isSetAdmin){
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"/adminTeacherInfo/update",
		data:"user.user_id="+userId+"&user.user_num="+userNum+"&user.user_name="+userName+"&user.user_dept_id="+userDeptId+"&user.user_is_admin="+isSetAdmin,
		async:false,
		success:function(result){
			alert(result.result);
			window.location.reload();
		},
		error:function(e){
			console.log("错误："+e.message);
		}
	});
	location.reload();
}
function transformAdmin(obj,list){
	var isTranformAdmin=0,
	transformAdminId=$(obj).val();
	//alert(transformAdminId);
	if($(obj).text()=="是")
		{
		isTranformAdmin=1;
		
		$(obj).text("否")
		
		}
	else if($(obj).text()=="否")
		{
		$(obj).text("是")
		}
	$(obj).val(isTranformAdmin);
	var userId=list.user_id,
	userNum=list.user_num,
	userName=list.user_name,
	userDeptId=list.user_dept_id,
	isSetAdmin=isTranformAdmin;
	alert(list.user_dept_id);
	updateUser(userId,userNum,userName,userDeptId,isSetAdmin);
}
/*初始化学院
 * 
 */
function acadInitial(){
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"/index/acadName",
		async:false,
		success:function(result){
		result=result.acadName;
		var acadHtml="";
		for(var i=0;i<result.length;i++)
			{
			acadHtml+="<option value='"+result[i].acad_id+"'>"+result[i].acad_name+"</option>";
			}
		//添加模态框中学院的初始化
		$("#userAcadName").html(acadHtml);
		//修改模态框中学院的初始化
		$("#upUserAcadName").html(acadHtml);
		},
	});
}