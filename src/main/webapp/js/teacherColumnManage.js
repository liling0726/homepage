$(function(){
	//初始化
	acadInitial();
	$("#alertdiv").hide();//面包屑下面的警告框
	/*
	 * 功能：添加栏目
	 * 后台参数：data_name(栏目名称) 
            data_order(栏目排序) 
            data_url(栏目别名)
            data_nature(栏目性质)
            data_type(栏目类型)
            data_is_show(栏目显示)
	 */
	$("#add").click(function(){
		var columnName=$("#columnName").val();
		var columnResume=$("#columnResume").val();
		var columnProperty=$("#columnProperty").val();
		var columnType=$("#columnType").val();
		var columnIsShow=$("input[name=column]:checked").val();
		var columnSort=$("#columnSort").val();
		$("#alertdiv").show();
		var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
				"<span aria-hidden=\"true\">&times;</span></button>"+columnIsShow+"！";
		$("#alertdiv").html(html);
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
				$("#alertdiv").show();
				var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
						"<span aria-hidden=\"true\">&times;</span></button>" +result.result+"！";
				$("#alertdiv").html(html);
				acadInitial();
			}
		});
	});
	/*判断是否正确的网址
	*/
	$("#upColumnProperty").bind("change",function(){
		var columnResume=$("#columnResume").val();
		IsUrl(columnResume);
		
	})
	/*
	 * 删除栏目
	 * 后台参数：data_id
	 * 现在不能多条删除
	 */
	$("#columnDelete").bind("click",function(){
		var length=$("input[name='checkboxGroup']:checked").length;
		if(length==0)
		{
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>请选择要删除的老师记录！";
			$("#alertdiv").html(html);
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
					$("#alertdiv").show();
					var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
							"<span aria-hidden=\"true\">&times;</span></button>" +result.result+"！";
					$("#alertdiv").html(html);
					acadInitial();
				},
				error:function(e){
					console.log("错误："+e.message);
				}

			});

		}
	});
	/*
	 * 如果是站外栏目的修改
	 * 后台参数： data_id(栏目Id)
	 *        data_name(栏目名称)  
	 *        data_order(栏目排序) 
	 *        data_url(栏目别名)
	 *        data_nature(栏目性质) 
	 *        data_type(栏目类型)  
	 *        data_is_show(栏目显示)
	 */
	$("#upColumnInfo").click(function(){

		var upColumnId=$("#upColumnId").val();
		var upColumnName=$("#upColumnName").val();
		var upColumResume=$("#upColumResume").val();
		var upColumnProperty=$("#upColumnProperty").val();
		var upColumnType=$("#upColumnType").val();
		var upColumnIsShow=$("input[name=upColumn]:checked").val();
		var upColumnSort=$("#upColumnSort").val();
		updateColumn(upColumnId,upColumnName,upColumnSort,upColumResume,upColumnProperty,upColumnType,upColumnIsShow);
	});

})
/*
 * 初始化栏目
 * 
 */
function acadInitial(){
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherColumnManage/all",
		async:false,
		success:function(result){
			result=result.result;
			var acadHtml="",nature=null,dataType=null,acadHtml1="",dataOder="",dataUrl="";
			for(var i=0;i<result.length;i++)
			{
				if(result[i].data_type==0){

					dataType="信息简介类";
				}
				else{
					dataType="新闻资讯类";
				}
				if(result[i].data_nature==0){
					nature="站内栏目";
				}
				else{
					nature="站外栏目";
				}
				if(result[i].data_order==null)
					dataOder=" ";
				else
					dataOder=result[i].data_order;
				if(result[i].data_url==null)
					dataUrl=" ";
				else dataUrl=result[i].data_url;
				acadHtml+="<tr><td><input type='checkbox' value='"+result[i].data_id+"' name='checkboxGroup'></td>"
				+"<td>"+(i+1)+"</td>";
				/*如果是站内栏目且为信息简介类
				 */
				if(result[i].data_nature==0&&result[i].data_type==0)
				{
					acadHtml+="<td><a href='../html/teacherColumnEdit.html?columnId="+result[i].data_id+"'>"+result[i].data_name+"</a></td>"
					+"<td>"+dataUrl+"</td>"
					+"<td>"+dataType+"</td>"
					+"<td>"+nature+"</td>"
					+"<td>"+dataOder+"</td>"
					+"<td>"+result[i].data_update_time+"</td>";
				}
				/*如果是站内栏目且为新闻资讯类
				 */
				else if(result[i].data_nature==0&&result[i].data_type==1)
				{
					acadHtml+="<td><a href='../html/teacherNewsManage.html'>"+result[i].data_name+"</a></td>"
					+"<td>"+dataUrl+"</td>"
					+"<td>"+dataType+"</td>"
					+"<td>"+nature+"</td>"
					+"<td>"+dataOder+"</td>"
					+"<td>"+result[i].data_update_time+"</td>";
				}
				else{//如果站外，则修改的时候，显示出一个修改模态框
					acadHtml+="<td>"+result[i].data_name+"</td>"
					+"<td>"+dataUrl+"</td>"
					+"<td>"+dataType+"</td>"
					+"<td>"+nature+"</td>"
					+"<td>"+dataOder+"</td>"
					+"<td>"+result[i].data_update_time+"</td>";
					
				}
				if(result[i].data_is_show==1)
				{
					acadHtml+="<td value='"+result[i].data_is_show+"' onclick='transformShow(this)' name='"+result[i].data_id+"'><a href='#'><span class='glyphicon glyphicon-ok'></span></td>";
				}
				else{
					acadHtml+="<td value='"+result[i].data_is_show+"' onclick='transformShow(this)' name='"+result[i].data_id+"'><a href='#'><span class='glyphicon glyphicon-remove'></span></td>";
				}
				acadHtml=acadHtml+"<td  onclick='updateContentRemenber(this)' data-toggle='modal' data-target='#updateModal' value='"+result[i].data_id+"'><a href='#' ><span class='glyphicon glyphicon-pencil'></span></td>";
			}
			$("#columnInfo").html(acadHtml);
		},
	});
}
/*
 * 站外修改的时候，模态框的内容
 */
function updateContentRemenber(obj){
	var trObj=$(obj.parentNode);
	var upColumnId=$("#upColumnId").val($(obj).attr("value"));
	var upColumnName=$("#upColumnName").val(trObj.find("td:eq(2)").text());
	var upColumResume=$("#upColumResume").val(trObj.find("td:eq(3)").text());
	for(var j=0;j<$("#upColumnProperty")[0].options.length;j++)
	{     

		if($("#upColumnProperty")[0].options[j].text==trObj.find("td:eq(5)").text())
		{

			$("#upColumnProperty")[0].options[j].selected = true;

		}

	}
	for(var j=0;j<$("#upColumnType")[0].options.length;j++)
	{     

		if($("#upColumnType")[0].options[j].text==trObj.find("td:eq(4)").text())
		{

			$("#upColumnType")[0].options[j].selected = true;

		}

	}

	$("input[name=upColumn]").each(function(){
		if($(this).val()&&trObj.find("td:eq(8)").attr("value"))
		{
			$(this).attr("checked","checked");
		}
	})

	var upColumnSort=$("#upColumnSort").val(trObj.find("td:eq(6)").text());

	$("#updateModal").show();
}
/*
 * 修改栏目
*/
function updateColumn(upColumnId,upColumnName,upColumnSort,upColumResume,upColumnProperty,upColumnType,upColumnIsShow){
	
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"../teacherColumnManage/update",
		data:{
			data_id:upColumnId,
			data_name:upColumnName,
			data_order:upColumnSort,
			data_url:upColumResume,
			data_nature:upColumnProperty,
			data_type:upColumnType,
			data_is_show:upColumnIsShow
		},
		async:false,
		success:function(result){
			$("#alertdiv").show();
			var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
					"<span aria-hidden=\"true\">&times;</span></button>" +result.result+"！";
			$("#alertdiv").html(html);
			acadInitial();
		}
	});	
	
}
//是否显示栏目的转换
function transformShow(obj){
	var isShow=$(obj).attr("value");
if(isShow==2)
	{
	$(obj.firstChild.firstChild).removeAttr("class");
	$(obj.firstChild.firstChild).attr("class","glyphicon glyphicon-ok");
	upColumnIsShow=1;
	}
else{
	$(obj.firstChild.firstChild).removeAttr("class");
	$(obj.firstChild.firstChild).attr("class","glyphicon glyphicon-remove");
	upColumnIsShow=2;
}
upColumnId=$(obj).attr("name");
$.ajax({
	type:"post",
	content:"application/x-www-from-urlencoded;charset=UTF-8",
	dataType:"json",
	url:"../teacherColumnManage/update",
	data:{
		data_id:upColumnId,
		data_is_show:upColumnIsShow
	},
	async:false,
	success:function(result){
		$("#alertdiv").show();
		var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
				"<span aria-hidden=\"true\">&times;</span></button>" +result.result+"！";
		$("#alertdiv").html(html);
		acadInitial();
	}
});	
}
//判断是否是正确的网址
function IsUrl(str){   
    var regUrl = /(http\:\/\/)?([\w.]+)(\/[\w- \.\/\?%&=]*)?/gi;   
    var result = str.match(regUrl);
    $("#alertdiv").show();
	var html="<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
			"<span aria-hidden=\"true\">&times;</span></button>123！";
	$("#alertdiv").html(html);
    if(result==null) {
    $("#urlError").html("请输入正确的网址！");	
   }   
 
}   