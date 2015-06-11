var currentPage;//当前页
var maxPage;//最大页
var keyWord="";//关键字
$(function(){
	 currentPage=$("#currentPage").val();
	if(currentPage==null||currentPage=="")
		currentPage=1;
	maxPage=$("#max").val();
	 newsInitial();
	 /*
	  * 功能：搜索关键字
	  * 后台参数：key（关键字），pageSize（每页显示多少条），pageNumber（当前页）
	 */
	 $("#searchByKey").click(function(){
	 	 keyWord=$("#searchWord").val();
	 	searchByKey(keyWord);
	 });
	/*
	 * 删除栏目
	 * 后台参数：news_id
	 * 
	 */
	$("#deleteNews").bind("click",function(){
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
				url:"../teacherNewsManage/delete/"+str,
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
				newsInitial();
			else searchByKey(keyWord);
		}

	});
//		下一页
	$("#pageforward").bind("click",function(){
		
		if(currentPage<totalNum)
		{
		currentPage=parseInt(currentPage)+1;
		//调用查询
		alert(keyWord);
		if(keyWord==""||keyWord==null)
			newsInitial();
		else searchByKey(keyWord);
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
		//调用查询
		if(keyWord==""||keyWord==null)
			newsInitial();
		else searchByKey(keyWord);
		}
		else{
			alert("小于总页数");
			return;
		}

	});

	//每页显示页数
	$("#max").bind("change",function(){
		 maxPage=$("#max").val();
		 //alert(maxPage);
		//调用查询
			if(keyWord==""||keyWord==null)
				newsInitial();
			else searchByKey(keyWord);
	});	
	
})
function newsInitial(){

	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherNewsManage/getPage?"+currentPage+"-"+maxPage,
		async:false,
		success:function(result){
	    	var html="";
	         newData=result.newsPage;
	    	 var total=newData.totalRow;
	    	 totalNum=newData.totalPage
	    	 for(var i=0;i<newData.list.length;i++)
	    		 {
	    		 html+="<tr><td><input type='checkbox' name='checkboxGroup' value='"+newData.list[i].news_id+"'></td><td>"
    			 +(i+1+(currentPage-1)*maxPage)+"</td><td>"
    		     +"<a href='../html/teacherNewsEdit.html?newsId="+newData.list[i].news_id+"'>"+newData.list[i].news_title+"</a></td><td>"
    		     +newData.list[i].news_data_id+"</td><td>"
    		     +newData.list[i].news_update_time+"</td>";
    		     if(newData.list[i].news_istop!=null)
    		    	 html+="<td><a href='#' value='"+newData.list[i].news_id+"'><span class='glyphicon glyphicon-ok'></span></a></td>"
    		     else html+="<td><a href='#' value='"+newData.list[i].news_id+"'><span class='glyphicon glyphicon-remove'></span></a></td>";
    		   html=html+"<td><a href='../html/teacherNewsEdit.html?newsId="+newData.list[i].news_id+"' value='"+newData.list[i].news_id+"'><span class='glyphicon glyphicon-pencil'></span></a></td>";   
	    		 }
	    	 $("#newsInfo").html(html);
	    	 $("#currentPage").html(newData.pageNumber);
	    	 $("#totalPage").html(totalNum);
	    	 $("#totalNum").html(newData.totalRow);
	    },
	    error:function(e){
	    	console.log("错误："+e);
	    }
	});
}
function searchByKey(key){
	$.ajax({
		type:"post",
		content:"application/x-www-form-urlencoded;charset=UTF-8",
	    dataType:"json",
	    url:"../teacherNewsManage/findNewsByKey",
	    async:"false",
	    data:{
	    	key:key,
	    	pageSize:maxPage,
	    	pageNumber:currentPage,	
	    },
	    
	    success:function(result){
	    	var html="";
	         newData=result.keyNewsPage;
	    	 var total=newData.totalRow;
	    	 totalNum=newData.totalPage
	    	 for(var i=0;i<newData.list.length;i++)
	    		 {
	    		 html+="<tr><td><input type='checkbox' name='checkboxGroup' value='"+newData.list[i].news_id+"'></td><td>"
	    			 +(i+1+(currentPage-1)*maxPage)+"</td><td>"
	    		     +"<a href='../html/teacherNewsEdit.html?newsId="+newData.list[i].news_id+"'>"+newData.list[i].news_title+"</a></td><td>"
	    		     +newData.list[i].news_data_id+"</td><td>"
	    		     +newData.list[i].news_update_time+"</td>";
	    		     if(newData.list[i].news_istop!=null)
	    		    	 html+="<td><a href='#' value='"+newData.list[i].news_id+"'><span class='glyphicon glyphicon-ok'></span></a></td>"
	    		     else html+="<td><a href='#' value='"+newData.list[i].news_id+"'><span class='glyphicon glyphicon-remove'></span></a></td>";
	    		   html=html+"<td><a href='../html/teacherNewsEdit.html?newsId="+newData.list[i].news_id+"' value='"+newData.list[i].news_id+"'><span class='glyphicon glyphicon-pencil'></span></a></td>";   
	    		 }
	    	 $("#newsInfo").html(html);
	    	 $("#currentPage").html(newData.pageNumber);
	    	 $("#totalPage").html(totalNum);
	    	 $("#totalNum").html(newData.totalRow);
	    }
	    });
}