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
	
	/*导入后台数据，点击模态框按钮添加内容到表格*/
	/*宾健*/
	$.ajax({
		type:"get",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		dataType:"json",
		url:"/adminacadinfo/index",
		/*data:"user.user_num="+userNum+"&user.user_name="+userName+"&user.user_dept_id="+userDeptId,*/
		async:false,
		success:function(result){
			data=result.result;
		for(var i = 0;;i++)
			{
				data=result.result[i];
				if(data[0]==undefined)
					break;
				$("#maintable").append(
						"<tr><td>"+(i+1)+"</td><td>"+data[0].dept_name+"</td><td><ul id=\"deptli"+i+"\"class=\"classInfo\"></ul></td>" +
						"<td style=\"width: 100px;\"><div class=\"buttonGroup\"><button id=\"adddeptbtn"+i+"\"class=\"btn btn-danger btn-xs\" " +
						"data-toggle=\"modal\"data-target=\"#insertModal"+i+"\">添加</button>" +
						"<button class=\"btn btn-info btn-xs\">删除</button></div></td></tr>"
				
				);
				/*动态添加模态框，使得模态框按钮id最后一位为数字，此数字与点击弹出模态框的按钮编号相同，从而获得此按钮的id！不容易想到*/
				$("#modals").append("<div class=\"modal fade\" id=\"insertModal"+i+"\" tabindex=\"-1\" role=\"dialog\"aria-labelledby=\"myModalLabel\" " +
						"aria-hidden=\"true\"><div class=\"modal-dialog modal-sm\"><div class=\"modal-content\"><div class=\"modal-header\">" +
						"<button type=\"button\" class=\"close\" data-dismiss=\"modal\"aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
						"<h4 class=\"modal-title\" id=\"myModalLabel\">添加系别</h4></div><div class=\"modal-body\"><p>系别：" +
						"<input type=\"text\" style=\"width: 200px; height: 30px;\"value=\"请输入系名\"></p><div class=\"modal-footer\"><button id=\"addacadbtn"+i+"\"type=\"button\" " +
						"class=\"btn btn-primary\">添加</button><button id=\"deleteacad\"type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消" +
						"</button></div></div></div></div>");
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
	/*添加*/
	$(".modal-body").find(".btn-primary").click(function(){
		var acadname=$(this).parents(".modal-body").find("input").val();
		if(acadname=="请输入系名"||acadname=="")alert("请输入系名!");
		else{
			/*获取模态框按钮id，从而对应弹出模态框按钮id*/
			var str=$(this).attr("id");
			str=str.charAt(str.length - 1)
			var snum=parseInt(str);
			$("#deptli"+snum).append("<li><input type=\"checkbox\">&nbsp;&nbsp;<a>"+acadname+"</a></li>");
		$.ajax({
			type:"post",
			content:"application/x-www-from-urlencoded;charset=UTF-8",
			dataType:"json",
			url:"/adminacadinfo/addDept",
			data:{oneDept:acadname},
			async:false,
			success:function(result){
				alert("添加成功！");
			},
			error:function(e){
				console.log("错误："+e.message);
			}
		});
		}
	});
	/*删除*/
	$(".buttonGroup").find(".btn-info").on("click",function(){
		var j=0;
		var text;
		$(this).parents(".buttonGroup").parent().prev().find("input:checked").each(function(){j++;});
		if(j!=0){
			text="你确定要删除选中的"+j+"个系吗？"
		if(window.confirm(text)){
			var deptdelenum=new Array();
			var i = 0;
			/*遍历选中的checkbox进行相关操作*/
			$(this).parents(".buttonGroup").parent().prev().find("input:checked").each(function(){
				deptdelenum[i++]=$(this).parent().children("a").html();
				$(this).parent().remove();
				/*alert(deptdelenum[i-1]);*/
			});
			
			$.ajax({
				type:"post",
				content:"application/x-www-from-urlencoded;charset=UTF-8",
				dataType:"json",
				url:"/adminacadinfo/addDept",
				data:{deptDelet:deptdelenum},
				async:false,
				success:function(result){
					/*alert("删除成功！");*/
				},
				error:function(e){
					console.log("错误："+e.message);
				}
			});
            return true;
         }else{
            //alert("取消");
            return false;
        }
		}
		else{
			alert("您一条也没选！");
		}
	});
	
	
	$(".modal-body input").mouseover(function(){
		if($(this).val()=="请输入系名")
			{
				$(this).val("");
			}
	});
	$(".modal-body input").mouseout(function(){
		if($(this).val()=="")
		{
			$(this).val("请输入系名");
		}
	});
});