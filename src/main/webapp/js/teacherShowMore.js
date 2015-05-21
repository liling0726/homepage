var count = 0;
var searchWords;

function retrieve(count, searchWords) {
	$.ajax({
		type : "post",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "/teacherShowMore/showMore",
		data: { count: count, searchWords: searchWords },
		async : false,
		success : function (result) {
			var res = result.result, html = "", i;
			for (i = 0; i < res.length; i = i + 1) {
				html +=  '<div class="col-xs-6 col-md-3">'
		               + '	<div class="thumbnail">'
                       + '     <a href="' + res[i].user_url + '">'
	                   + '     <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE3MSAxODAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzLz48cmVjdCB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjU5IiB5PSI5MCIgc3R5bGU9ImZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE3MXgxODA8L3RleHQ+PC9nPjwvc3ZnPg==" alt="..." title="系别：' +  res[i].dept_name + '&#10;学院：' + res[i].acad_name + '"></a>'
                	   + '	    <div id="user" class="caption">'
	                   + '		   <a href="' + res[i].user_url + '">' + res[i].user_name + '</a><br />'
	                   + '	    </div>'
	                   + '	</div>'
	                   + '</div>';
			}
			$("div#teachers").append(html);
		},
		error : function (e) {
			console.log("错误：" + e.message);
		}
	});
}

function init() {
    count = 0;
    searchWords = $("#searchWords").val();
    retrieve(0, searchWords);
}

$(function () {
    $("#search").bind("click", function () {
        searchWords = $("#searchWords").val();
        $("#teachers").empty();
        count = 0;
        retrieve(count, searchWords);
    });
    $("#appendMore").bind("click", function () {
        count = count + 24;
        retrieve(count, searchWords);
    });
    
    init();
});