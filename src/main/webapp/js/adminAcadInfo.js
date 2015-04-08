$(function(){
	
	$("table tr td:nth-child(2)").mouseover(function(e){
		
		var pos=mousePosition(e);
		$(".classAndTeam").css({
			"left":pos.x+20+"px",
			 "top":pos.y
			 }
			);
		$(".classAndTeam").show();
		
	})
	$("table tr td:nth-child(2),.classAndTeam").mouseout(function(){
		$(".classAndTeam").hide();
	});
	$(".classAndTeam").mouseover(function(){
		$(this).show();
	});
	function mousePosition(ev){
		if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
		}
		return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop - document.body.clientTop
		};
		}
})