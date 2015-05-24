var count = 0;
var searchWords;
var need = 30;

$(function () {
    init(); // 初始化

    $("#search").bind("click", function () {
        searchWords = $("#searchWords").val();
        $("#teachers").empty();
        retrieve(count, searchWords, need);
        if (searchWords != "")
        	$("#appendMore").attr("disabled", "disabled");
        else
        	$("#appendMore").removeAttr("disabled");
    });

    $("#appendMore").bind("click", function () {
        count = count + need;
        if (retrieve(count, searchWords, need) != "success")
        	$("#appendMore").attr("disabled", "disabled");
    });
});


function retrieve(count, searchWords, need) {
	var status;
	$.ajax({
		type : "post",
		content : "applicat	ion/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherShowMore/showMore",
		data: { count: count, searchWords: searchWords, need: need },
		async : false,
		success : function (result) {
			var res = result[2], html = "", i;
			status = result[1];
			for (i = 0; i < res.length; i = i + 1) {
				html +=  '<div class=" col-lg-2dot4">'
		               + '	<div class="thumbnail">'
                       + '     <a href="' + res[i].user_url + '">'
	                   + '     <img src="../img/person' + (i%10+1) + '.jpg" alt="..." title="系别：' +  res[i].dept_name + '&#10;学院：' + res[i].acad_name + '"></a>'
                	   + '	    <div id="user" class="caption">'
	                   + '		   <a href="' + res[i].user_url + '">' + res[i].user_name + '</a><br />'
	                   + '	    </div>'
	                   + '	</div>'
	                   + '</div>';
			}
			$("#teachers").append(html);
		},
		error : function (e) {
			console.log("错误：" + e.message);
		}
	});
	return status;
}

function init() {
	var path = location.href.split('?'); // 用于获取从其它页面传过来的参数
	if (path.length > 1) {
		searchWords = decodeURI(path[1].split('=')[1]);
		$("#searchWords").val(searchWords);
	} else
		searchWords = $("#searchWords").val();
	
    count = 0; // 重置计数
    retrieve(count, searchWords, need);
    if (searchWords != "")
    	$("#appendMore").attr("disabled", "disabled");
    else
    	$("#appendMore").removeAttr("disabled");
}