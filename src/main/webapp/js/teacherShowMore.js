var count = 0; // 计数位置
var need = 15; // 默认每次取30条数据
var searchWords = ''; // 搜索关键字
var sort = 'default'; // 排序方法 排序方式不需要作为函数参数

$(function () {
	var path = location.href.split('?'); // 用于获取从其它页面传过来的参数
	// 大于1表示有参数
	if (path.length > 1) {
		// 分解参数
		//var keys = path[1].split('&');
		var keys = path[1].split('=');
		if (keys[0] == 'searchWords') {
			searchWords = decodeURI(keys[1]);
			$("#searchWords").val(searchWords);
		}
		if (keys[0] == 'sort')
			sort = decodeURI(keys[1]);
	}

	if (searchWords != '')
		$("#appendMore").attr("disabled", "disabled");
	count = 0; // 重置计数
	retrieve();

    $("#search").bind("click", function () {
        searchWords = $("#searchWords").val();
		if (searchWords != '')
			$("#appendMore").attr("disabled", "disabled");
		else
			$("#appendMore").removeAttr("disabled");
        $("#teachers").html("");
        retrieve();
    });

	// “更多”按钮
    $("#appendMore").bind("click", function () {
        retrieve();
    });
});

function retrieve() {
	$.ajax({
		type : "post",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherShowMore/showMore",
		data: { count: count, need: need, searchWords: searchWords, sort: sort },
		async : true,
		success : function (result) {
			var res = result[2], html = "", i;
			var status = result[1];
			for (i = 0; i < res.length; i = i + 1) {
				if ((i % 5) == 0)
					html += '<div class="row">';
				html +=  '<div class="col-lg-2dot4">'
		               + '	<div class="thumbnail">'
                       + '     <a href="../u/' + res[i].user_url + '">'
	                   + '     <img src="../img/mould.png" alt="..." title="系别：' +  res[i].dept_name + '&#10;学院：' + res[i].acad_name + '"></a>'
                	   + '	    <div id="user" class="caption">'
	                   + '		   <a href="../u/' + res[i].user_url + '">' + res[i].user_name + '</a><br />系别:'
													+ cat(res[i].dept_name) + '<br />学院:'
													+ cat(res[i].acad_name) + '<br />'
	                   + '	    </div>'
	                   + '	</div>'
	                   + '</div>';
				if ((i % 5) == 4)
					html += '</div>';
			}
			$("#teachers").append(html);
			if (status == "success")
				count += need;
			else if (status == "run out")
				$("#appendMore").attr("disabled", "disabled");
		},
		error : function (e) {
			console.log("出错啦->" + e.message);
		}
	});
}

function cat(str) {
	if (str.length > 3) {
		str = str.substr(0, 3);
		str += '...';
	}
	return str;
}