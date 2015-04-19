var data=new Array();
$(function(){
	
	$("table tr td:nth-child(2)").mouseover(function(e){
		
		var pos=mousePosition(e);
		$(".classAndTeam").css({
			"left":pos.x+20+"px",
			 "top":pos.y
			 }
			);
		$(".classAndTeam").show();
		
	})
	$("table tr td:nth-child(2),.classAndTeam").mouseout(function(){
		$(".classAndTeam").hide();
	});
	$(".classAndTeam").mouseover(function(){
		$(this).show();
	});
	function mousePosition(ev){
		if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
		}
		return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop - document.body.clientTop
		};
		}
	
	
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"/adminacadinfo/index",
		/*data:"user.user_num="+userNum+"&user.user_name="+userName+"&user.user_dept_id="+userDeptId,*/
		async:false,
		success:function(result){
			data=result.result;
			alert(data.length);
		for(var i = 0;;i++)
			{
				data=result.result[i];
				if(data[0]==undefined)
					break;
				$("#maintable").append(
						"<tr><td>"+i+"</td><td>"+data[0].dept_name+"</td><td><ul id=\"deptli"+i+"\"class=\"classInfo\"></ul></td>" +
						"<td style=\"width: 100px;\"><div class=\"buttonGroup\"><button class=\"btn btn-danger btn-xs\" " +
						"data-toggle=\"modal\"data-target=\"#insertModal\">添加</button>" +
						"<button class=\"btn btn-info btn-xs\">删除</button></div></td></tr>"
				
				);
				for(var j = 1;j<data.length;j++)
				{
					
					$("#deptli"+i).append("<li><input type=\"checkbox\">&nbsp;&nbsp;<a>"+data[j].dept_name+"</a></li>");
				}
			
			}
		},
		error:function(e){
			console.log("错误："+e.message);
		}
	});
	$("#addacad").click(function(){
		/*var addacadname=$(this).parents("modal-body").find("input").val();*/
		/*alert(addacadname);*/
		
	});
});