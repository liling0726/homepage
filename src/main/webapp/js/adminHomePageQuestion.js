var myDate = new Date();
$(document)
		.ready(
				function() {
					 $("div").delegate("#delete×","click",function(){
						 $(this).parent("li").remove();
						  });
					$(".panel-body div button").on("click",function() {
						var text = $(this).parents(
						".panel-body").find('textarea')
						.val();
				$(this)
						.parents('.panel-body')
						.find('ul')
						.append("<li>"
										+ text
										+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label id='delete×'>×</label><span>"
										+myDate.getFullYear()
										+"-"
										+(myDate.getMonth()+1)
										+"-"
										+myDate.getDate()
										+"</span>"
										+"</li>");
				});
				});
