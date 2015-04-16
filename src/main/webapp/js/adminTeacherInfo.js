/*
 * @author:李玲；
*/
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
 * 后台参数：user.user_id,user.user_num,user.user_name,user.acad_name
	*/
	$("#add").click(function(){});
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
	    	var data=result.userPage;
	    	 var total=data.totalRow;
	    	 for(var i=0;i<data.list.length;i++)
	    		 {
	    		 html+="<tr><td><input type='checkbox' id='"+data.list[i].user_id+"' name='groupCheckbox'></td>"
	    			 +"<td>"+data.list[i].user_num+"</td>"
	    		       +"<td>"+data.list[i].user_name+"</td>"
	    		       +"<td>"+data.list[i].acad_name+"</td>"
	    		       +"<td>"+data.list[i].dept_name+"</td>"
	    		       +"<td><button class='btn btn-default'>是</td></tr>"
	    		      
	    		 }
	    	 $("#teacherShow").append(html);
	    	 $("#currentPage").append(data.pageNumber);
	    	 $("#totalPage").append(data.totalPage);
	    },
	    error:function(e){
	    	consol.log("错误："+e);
	    }
	});
	
}