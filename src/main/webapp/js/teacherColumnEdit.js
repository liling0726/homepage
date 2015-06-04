$(function(){
	var columnId=location.href.split("=")[1];
	var editor = new UE.ui.Editor();
	editor.render("myEditor");
	//1.2.4以后可以使用一下代码实例化编辑器
	UE.getEditor('myEditor');
	//初始化，使他们记住栏目中的信息
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherColumnManage/all",
		async:false,
		success:function(result){
			result=result.result;
		
			for(var i=0;i<result.length;i++){
				if(result[i].data_id==columnId)
				{	
					$("#myEditor").val(result[i].data_content);
					$("#columnName").val(result[i].data_name);
					$("#columnResume").val(result[i].data_url);
					$("#columnSort").val(result[i].data_order);
					
					if(result[i].data_nature==0)
						{
						$("#columnProperty").val("站内栏目");
						}
					else {
						$("#columnProperty").val("站外栏目");
					}
					if(result[i].data_type==0)
					{
					$("#columnType").val("信息简介类");
					}
				else {
					$("#columnType").val("新闻资讯类");
				}
				
					$("input[name=column]").each(function(){
						if($(this).val()==result[i].data_is_show)
						{
							$(this).attr("checked","checked");
						}

					});
				}
			}
		}
	});
	/*
	 * 修改内容
	*/
	$("#save").click(function(){
		var columnName=$("#columnName").val();
		var columnResume=$("#columnResume").val();
		var columnIsShow=$("input[name=column]:checked").val();
		var columnSort=$("#columnSort").val();
		content = editor.getContent();
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"../teacherColumnManage/update",
			data:{
				data_id:columnId,
				data_name:columnName,
				data_order:columnSort,
				data_url:columnResume,
				data_is_show:columnIsShow,
				data_content:content
			},
			async:false,
			success:function(result){
				alert(result.result);
				location.reload();
				return false;
			}
			
		});	
	})

})