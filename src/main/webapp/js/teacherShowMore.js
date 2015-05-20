function retrieve(restart) {
	$.ajax({
		type : "post",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "/teacherShowMore/showMore",
		data: "restart="+restart,
		async : false,
		success : function (result) {
			var res = result.result, html = "", i;
			for (i = 0; i < res.length; i = i + 1) {
				html +=  '<div class="col-lg-2 col-sm-3 col-xs-4">'
		               + '	<a href="#" class="thumbnail">'
	                   + '		<img src="http://www.gbtags.com/gb/laitu/200x200" alt="...">'
	                   + '	</a>'
	                   + '	<div class="user">'
	                   + '		<a title="..." href="' + res[i].user_url + '">' + res[i].user_name + '</a>'
	                   + '		<br/>'
	                   + '		<span>' + res[i].user_url + '</span>'
	                   + '		<br/>'
	                   + '		<br/>'
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
    retrieve(true);
}

$(function () {
	init();
    $("#appendMore").bind("click", function () {
        retrieve(false);
    });
});