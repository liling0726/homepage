var myDate = new Date();

$(
document.onkeydown = function(event_e){    
        if(window.event)    
         event_e = window.event;    
         var int_keycode = event_e.charCode||event_e.keyCode;    
         if(int_keycode ==13){   
        if(1)
        	alert("请输入反馈内容！");
        else
        	{
        $("#suggestion").append("<li><a href=\"#\">"+$("#textarea1").val()+"<span "
        		+"class=\"label label-info\">有待解决</span><span " 
        		+"class=\"label label-info\">删除</span><span>2015-4-4</span></a></li>");
         $("#textarea1").val("");
        	}
        }  
    } 
);
