$(function(){
	
	$("#imgcode").click(function(){
		 reloadcode();
	})
	$(".changeOne").click(function(){
		 reloadcode();
	})
	function reloadcode(){
		$("#imgcode").attr("src","checkcode.jsp?random="+Math.random());
	}
	
})