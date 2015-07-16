$(function(){
	$.ajax({
		type : "get",
		content : "application/x-www-from-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../acadInfoMore/index",
		async : false,
		success : function(result) {
			var data = result.acadInfoMore;
			var html = "";
			var acad;
			for(var i = 0;i<data.length;i++){
				acad=data[i].acad_name;
				if(data[i+1].acad_name==acad){
					
				}
			}
		
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});
})