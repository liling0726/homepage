var myDate = new Date();
var index = 0;
var someBefore=0;
$(document)
		.ready(
				function() {
					$.ajax({
						type : "get",
						content : "application/x-www-from-urlencoded;charset=UTF-8",
						dataType : "json",
						url : "../AdminHomePageQuestionController/answered",
						async : false,
						success : function(result) {
							var data = result.answered;
							var html = "";
							for(var j=0;j<data.length;j++){
								someBefore = 1;
								index++;
								if(j==0){
							html+="<li id='"
								+data[j].feedback_id;
								+	"'><a data-toggle='collapse' data-parent='#accordion'href='#collapse"
								+index
								+"' aria-expanded='true'aria-controls='collapse"
								+index
								+"'>"
							+data[j].feedback_content
							+"<span>" 
							+data[j].feedback_update_time
							+"</span></a><div id='collapse" 
							+index
							+"' class='panel-collapse collapse in'role='tabpanel' aria-labelledby='heading1'>" 
							+"<div class='panel-body'><div><label>已回答：</label><ul></ul></div><div><label>我来回答：</label>"
							+"<textarea class='form-control' rows='3'></textarea><div class='buttoncenter'><button id='commitbuttom' type='button'" 
							+"class='btn btn-warning btn-block'>提交</button></div></div></div></div></li>"
							
							}
							else{
								html+="<li id='"
								+data[j].feedback_id;
								+	"'><a data-toggle='collapse' data-parent='#accordion'href='#collapse"
									+index
									+"' aria-expanded='true'aria-controls='collapse"
									+index
									+"'>"
								+data[j].feedback_content
								+"<span>" 
								+data[j].feedback_update_time
								+"</span></a><div id='collapse" 
								+index
								+"' class='panel-collapse collapse'role='tabpanel' aria-labelledby='heading1'>" 
								+"<div class='panel-body'><div><label>已回答：</label><ul></ul></div><div><label>我来回答：</label>"
								+"<textarea class='form-control' rows='3'></textarea><div class='buttoncenter'><button id='commitbuttom' type='button'" 
								+"class='btn btn-warning btn-block'>提交</button></div></div></div></div></li>"
							}
							}
							$("#mainUl").html(html);
						},
						error : function(e) {
							console.log("错误：" + e.message);
						}
					});
					
					$.ajax({
						type : "get",
						content : "application/x-www-from-urlencoded;charset=UTF-8",
						dataType : "json",
						url : "../AdminHomePageQuestionController/noAnswered",
						async : false,
						success : function(result) {
							var data = result.noanswered;
							var html = "";
							alert(data);
							for(var j=0;j<data.length;j++){
								index++;
								if(j==0&&someBefore==0){
							html+="<li id='"
								+data[j].feedback_id;
								+	"'><a data-toggle='collapse' data-parent='#accordion'href='#collapse"
								+index
								+"' aria-expanded='true'aria-controls='collapse"
								+index
								+"'>"
							+data[j].feedback_content
							+"<span>" 
							+data[j].feedback_update_time
							+"</span></a><div id='collapse" 
							+index
							+"' class='panel-collapse collapse in'role='tabpanel' aria-labelledby='heading1'>" 
							+"<div class='panel-body'><div><label>已回答：</label><ul></ul></div><div><label>我来回答：</label>"
							+"<textarea class='form-control' rows='3'></textarea><div class='buttoncenter'><button id='commitbuttom' type='button'" 
							+"class='btn btn-warning btn-block'>提交</button></div></div></div></div></li>"
							}
							
							else{
								html+="<li id='"
								+data[j].feedback_id;
								+	"'><a data-toggle='collapse' data-parent='#accordion'href='#collapse"
									+index
									+"' aria-expanded='true'aria-controls='collapse"
									+index
									+"'>"
								+data[j].feedback_content
								+"<span>" 
								+data[j].feedback_update_time
								+"</span></a><div id='collapse" 
								+index
								+"' class='panel-collapse collapse'role='tabpanel' aria-labelledby='heading1'>" 
								+"<div class='panel-body'><div><label>已回答：</label><ul></ul></div><div><label>我来回答：</label>"
								+"<textarea class='form-control' rows='3'></textarea><div class='buttoncenter'><button id='commitbuttom' type='button'" 
								+"class='btn btn-warning btn-block'>提交</button></div></div></div></div></li>"
							}
						}
							$("#mainUl").append(html);
						},
						error : function(e) {
							console.log("错误：" + e.message);
						}
					});	
					
			function addData(feedbackId,answercontent){
					$.ajax({
						type : "get",
						content : "application/x-www-from-urlencoded;charset=UTF-8",
						dataType : "json",
						url : "../AdminHomePageQuestionController/answerQuestion",
						data:{feedback_id:feedbackId,feedback_anser_content:answercontent},
						async : false,
						success : function(result) {
							if(result.result=="success"){
								alert("回答成功。");
							}
						},
						error : function(e) {
							console.log("错误：" + e.message);
						}
					});	
			}
					
					
					
					
					
					
					
					
					
					
					 $("div").delegate("#delete×","click",function(){
						 $(this).parent("li").remove();
						  });
					$(".panel-body div button").on("click",function() {
						 var dataId = $(this).parents("li").attr();
						var text = $(this).parents(
						".panel-body").find('textarea')
						.val();
				$(this)
						.parents('.panel-body')
						.find('ul')
						.append("<li>"
										+ text
										+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label id='delete×'>×</label>" 
										+"<span>"
										+myDate.getFullYear()
										+"-"
										+(myDate.getMonth()+1)
										+"-"
										+myDate.getDate()
										+"</span>"
										+"<span>"
										+"id"
										+"</span>"
										+"</li>");
				
				});
				
					
				
					
					
					
					
					
					
					
					
					
				});
