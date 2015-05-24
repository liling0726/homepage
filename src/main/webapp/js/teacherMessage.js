$(document).ready(function(){
	$("span[name='saw']").each(function(){
				var spanHtml;
				spanHtml=$(this).html();
				if(spanHtml=="已查看")
					{
					$(this).css("color","#333");
					}
				if(spanHtml=="未查看"){
					$(this).css("color","red");
				}
	});
	$("span[name='saw']").click(function(){
		var spanHtml;
		spanHtml=$(this).html();
		if(spanHtml=="未查看")
			{
			$(this).html("已查看");
			$(this).css("color","#333");
			}
		if(spanHtml=="已查看"){
			$(this).html("未查看");
			$(this).css("color","red");
		}
	});
})