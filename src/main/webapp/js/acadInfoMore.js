$(function(){
	$.ajax({
		type : "get",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../acadInfoMore/index",
		async : false,
		success : function(result) {
			var data = result.acadInfoMore;
			alert(data[0]);
			var html = "";
			for(var j=0;j<data.length;j++){
			html+="<div class='col-md-3'><div class='panel panel-danger'><div class='panel-heading'>"
				+"<center><label>"
				+计算机科学与技术学院
				+"</label></center></div><div class='panel-body'><table  class='table'><tr>";
			for(var i = 0;i<data[j].length;i++){
				html+="<td><a href='#'>"
					+计算机工程系
					+"</a></td>";
				if(i==3){
					html+="</tr><tr>";
				}
			}
			html+="</tr></table></div></div></div>";
			}
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});
})