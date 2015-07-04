$(function(){
	var newsIdArray=location.href.split("=");
	var newsId;
	var data;
	$("#alertdiv").hide();//面包屑下面的警告框
	if(newsIdArray.length>1)
		{
		newsId=newsIdArray[1];//获取那条newsId
		}
	var editor = new UE.ui.Editor();
	editor.render("myEditor");
	//1.2.4以后可以使用一下代码实例化编辑器
	UE.getEditor('myEditor');
	
	//初始化，使他们记住新闻中的信息
	if(newsId!=null&&newsId!=""&&newsId!=undefined)
		{
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherNewsManage/findNewsById/"+newsId,
		async:false,
		success:function(result){
			result=result.news;
			var content;
	if(result.news_content==null)
		var content="";
	else content=result.news_content;
					$("#myEditor").val(content);
					$("#newsTitle").val(result.news_title);
					//alert($("#newsForColumn").length);
					showNewsName(result.news_data_id)
				
					$("input[name=news]").each(function(){
					
						if($(this).val()==result.news_istop)
						{
							
							$(this).attr("checked","checked");
						}
					
					});
			
		}

	});
		}
	/*
	 * 修改内容
	*/
	$("#save").click(function(){
			
		var newsTitle=$("#newsTitle").val();
		var newsIsTop=$("input[name=news]:checked").val();	
		var newsForColumn=$("#newsForColumn").val();
		content = editor.getContent();
		//alert(newsIsTop+" "+newsForColumn);
		if(newsId!=null&&newsId!=""&&newsId!=undefined)
			{
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"../teacherNewsManage/update",
			data:"news.news_id="+newsId+"&news.news_title="+newsTitle+"&news.news_istop="+newsIsTop+"&news.news_content="+content+"&news.news_data_id="+newsForColumn,
			async:false,
			success:function(result){
				$("#alertdiv").show();
				var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
						"<span aria-hidden=\"true\">&times;</span></button>" +result.result;
				$("#alertdiv").html(html);
				return false;
			}
		})
			}
		//添加
		else {
			$.ajax({
				type:"post",
				content:"application/x-www-from-urlencoded;charset=UTF-8",
				dataType:"json",
				url:"../teacherNewsManage/save",
				data:"news.news_title="+newsTitle+"&news.news_istop="+newsIsTop+"&news.news_content="+content+"&news.news_data_id="+newsForColumn,
				async:false,
				success:function(result){
					$("#alertdiv").show();
					var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
							"<span aria-hidden=\"true\">&times;</span></button>" +result.result;
					$("#alertdiv").html(html);
					return false;
		}
		});	
			}
	
	});
})
function showNewsName(id){
	//显示属于新闻类型的栏目
	//alert(id);
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherNewsManage/getDataByType/1",
		async:false,
		success:function(result){
			data=result.datas;
			var html="";
			for(var i=0;i<data.length;i++)
				{
				if(data[i].data_id==id)
					{
					html+="<option value='"+data[i].data_id+"' selected='selected'>"+data[i].data_name+"</option>";
					}
				else html+="<option value='"+data[i].data_id+"'>"+data[i].data_name+"</option>";
				}
			$("#newsForColumn").append(html);
		}
	})	
	
}