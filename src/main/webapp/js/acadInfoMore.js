$(function(){
	$.ajax({
		type : "get",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../acad/index",
		async : false,
		success : function(result) {
			var data = result.result;
			alert(data[0][2]);
			
			var html = "";
			var htm = "";
			for(var j=0;j<data.length;j++){
				
			html+="<div class='col-md-3'><div class='panel panel-danger'><div class='panel-heading'>"
				+"<center><label>"
				+data[j][2]
				+"</label></center></div><div class='panel-body'><table  class='table'><tr>";
			for(var i = 0;i<data[j][3].length;i++){
				html+="<td><a href='#'>"
					+data[j][3][i].dept_name
					+"</a></td>";
				if((i+1)%3==0){
					html+="</tr><tr>";
				}
			}
			html+="</tr></table></div></div></div>";
			
			}
			$("#mainRow").html(html);
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});
})