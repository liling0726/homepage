/*author:binjian
 * */
$(function() {
	$
			.ajax({
				type : "get",
				content : "application/x-www-from-urlencoded;charset=UTF-8",
				dataType : "json",
				url : "../acad/index",
				async : false,
				success : function(result) {
					var data = result.result;
					var html = "";//内层，装4个div就套一个壳子，放到htm中
					var htm = "";
					var classArray=["panel-danger","panel-success","panel-warning","panel-primary"];
					for (var j = 0; j < data.length; j++) {
						var panelClass=classArray[parseInt(Math.random()*j%4)];
						html += "<div class='col-md-3'><div class='panel "+panelClass+"'><div class='panel-heading'>"
								+ "<center><label>"
								+ data[j][2]
								+ "</label></center></div><div class='panel-body'><table  class='table'><tr>";
						for (var i = 0; i < data[j][3].length; i++) {
							html += "<td><a href='#'>"
									+ data[j][3][i].dept_name + "</a></td>";
							if ((i + 1) % 3 == 0) {
								html += "</tr><tr>";
							}
						}
						html += "</tr></table></div></div></div>";
						// 当一行是四个panel的时候，套一层div，不然会乱的。
						if ((j + 1) % 4 == 0) {
							htm += "<div class='row'>" + html + "</div>";
							html = "";
						}
					}
					$("#mainRow").html(htm);
				},
				error : function(e) {
					console.log("错误：" + e.message);
				}
			});
	
	$("a").bind("click", function () {
	    window.location = "teacherShowMore.html?searchWords=" + $(this).html();
	});
})