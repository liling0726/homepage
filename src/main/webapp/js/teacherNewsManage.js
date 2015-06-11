$(function(){
	
	$("#add").click(function(){
		var columnName=$("#columnName").val();
		var columnResume=$("#columnResume").val();
		var columnProperty=$("#columnProperty").val();
		var columnType=$("#columnType").val();
		var columnIsShow=$("input[name=column]:checked").val();
		var columnSort=$("#columnSort").val();
		alert(columnIsShow);
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"../teacherColumnManage/save",
			data:{
				data_name:columnName,
				data_order:columnSort,
				data_url:columnResume,
				data_nature:columnProperty,
				data_type:columnType,
				data_is_show:columnIsShow
			},
			async:false,
			success:function(result){
				alert(result.result);
				location.reload();
			}
		});
	});
	/*
	 * 删除栏目
	 * 后台参数：data_id
	 * 现在不能多条删除
	 */
	$("#columnDelete").bind("click",function(){
		var length=$("input[name='checkboxGroup']:checked").length;
		if(length==0)
		{
			alert("请选择要删除的老师记录");
			return false;
		}
		else if(confirm("确定要删除"+length+"条栏目信息？"))
		{
			var str="";
			$("input[name='checkboxGroup']:checked").each(function(){

				str += $(this).val()+'-';
			});

			str=str.substring(0,str.length-1);
			$.ajax({
				type:"post",
				content:"application/x-www-from-urlencoded;charset=UTF-8",
				url:"../teacherColumnManage/delete",
				data:{
					data_id:str
				},
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
	
	
})
function newsInitial(){
var currentPage=$("#currentPage").val();
var maxPage=$("#max").val();
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherNewsManage/getPage?"+currentPage+"-"+maxPage,
		async:false,
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
}
