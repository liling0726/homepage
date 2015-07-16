$(function() {
	//x轴值
	 var categorie = [];
	//y轴值
	 var dt = [];
	 //显示几天的浏览量
	 var DAYNUM=5;
	 //用户id
	 var USERID= 5;
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherIndex/dayBrowse/",
		data : {
			dayNum:DAYNUM,
			userId : USERID
		},
		async : "false",
		success : function(result) {
			var data = result.dayBrowse;
			var myDate = new Date();
			for(var i=(data.length-1);i>=0;i--){
				categorie.push((myDate.getMonth()+1)+"月"+(myDate.getDate() - i)+"日");
				dt.push(data[i]);
			}
			
			// 折线图，显示每天的登陆量
			$('#pageViewCount').highcharts(
					{
						chart : {
							type : 'line'
						},
						title : {
							text : '浏览量统计'
						},
						subtitle : {
							text : '以每天为单位'
						},
						xAxis : {
							categories : categorie

						},
						yAxis : {
							title : {
								text : '次'
							},
							min : 0
						},
						tooltip : {
							enabled : false,
							formatter : function() {
								return '<b>' + this.series.name + '</b><br/>' + this.x
										+ ': ' + this.y + "次";
							}
						},
						plotOptions : {
							line : {
								dataLabels : {
									enabled : true
								},
								enableMouseTracking : false
							}
						},
						series : [ {

							name : '浏览量',
							data : dt
						} ]
					});
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});
	
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherIndex/message/",
		data : {
			pageNumber : 1,
			pageSize : 3,
			userId : 4
		},
		async : "false",
		success : function(result) {
			var totalNum = result.message.totalPage;
			var data = result.message.list;
			var html = "";
			for (var i = 0; i < data.length; i++) {
				html = html + "<tr><td>" + (i + 1) + "</td><td>"
						+ data[i].message_content + "</td><td>"
						+ data[i].user_name + "</td><td>"
						+ data[i].message_email + "</td> <td>"
						+ data[i].message_submit_time.substr(0,10) + "</td></tr>"
			}
			$("#messageTbody").html(html);
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});

	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherIndex/feedback/",
		data : {
			pageNumber : 1,
			pageSize : 3,
			userId : USERID
		},
		async : "false",
		success : function(result) {
			var totalNum = result.feedback.totalPage;
			var data = result.feedback.list;
			var html = "";
			for (var i = 0; i < data.length; i++) {
				if (data[i].feedback_is_ansered == true) {
					html += "<li><a href='#'>" + data[i].feedback_content
							+ "<span class='label label-info'>" + "已解决"
							+ "</span><span>" + data[i].feedback_update_time.substr(0,10)
							+ "</span></a></li>"
				} else {
					html += "<li><a href='#'>" + data[i].feedback_content
							+ "<span class='label label-info'>" + "未解决"
							+ "</span><span>" + data[i].feedback_update_time.substr(0,10)
							+ "</span></a></li>"
				}
			}
			$("#suggestion").html(html);
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});

	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		dataType : "json",
		url : "../teacherIndex/data/",
		data : {
			userId : USERID
		},
		async : "false",
		success : function(result) {
			var data = result.data;
			var html = "";
			for (var i = 0; i < data.length; i++) {
				html +="<tr><td>"
					+(i+1) 
					+"</td><td>"
					+data[i].data_name
					+"</td><td>"
					+ data[i].data_click_count
					+"</td><td>"
					+data[i].data_update_time.substr(0,10)
					+"</td></tr>";
			}
			$("#columnTable").html(html);
		},
		error : function(e) {
			console.log("错误：" + e.message);
		}
	});
	
	

});