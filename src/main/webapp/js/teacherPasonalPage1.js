$(function(){


	$(".ulGroup li").bind(
			{"mouseover":function(){
				$(this).addClass("setColor");
				$(this).find("span").show(); 
			},
			"mouseout":function(){

				$(this).removeClass("setColor");
				$(this).find("span").hide(); 
			}
			})

});
function resetIframe(){  
	var iframe = document.getElementById("iframemain");  
	try{  
		var bHeight = iframe.contentWindow.document.body.scrollHeight;  
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;  
		var height = Math.max(bHeight, dHeight);  
		iframe.height =  height; 
	}catch(ex){

	}  
}  
window.setInterval("resetIframe()", 200);