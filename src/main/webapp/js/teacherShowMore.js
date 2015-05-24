var count = 0;
var searchWords;
var need = 30;
// 搜索有bug

$(function () {
    init();

    $("#search").bind("click", function () {
        searchWords = $("#searchWords").val();
        count = 0;
        $("#teachers").empty();
        retrieve(count, searchWords, need);
    });

    $("#appendMore").bind("click", function () {
        count = count + 24;
        retrieve(count, searchWords, need);
    });
});


function retrieve(count, searchWords, need) {
	$.ajax({
		type : "post",
		content : "applicat	ion/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherShowMore/showMore",
		data: { count: count, searchWords: searchWords, need: need },
		async : false,
		success : function (result) {
			var res = result.result, html = "", i;
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
}

function init() {
    count = 0;
    searchWords = $("#searchWords").val();
    retrieve(0, searchWords, need);
}