var loginNum=0;
var lookNum=0;
$(function () {
	/*
	 * 获取最近12天登录量
	 */
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		url:"../AdminHomePageController/loginNumber",
		dataType:"json",
		async:false,
		success:function(result){
			loginNum =result.loginNumber;
		}
	});
	alert(loginNum);
	/*
	 * 获取最近12天浏览量
	 */
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		url:"../AdminHomePageController/readAllNumber",
		dataType:"json",
		async:false,
		success:function(result){
			lookNum =result.readAllNumbers;
		}
	});
	/**
	 * 获取12位老师的浏览量
	*/
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		url:"../AdminHomePageController/readNumber",
		dataType:"json",
		async:false,
		success:function(result){
			result =result.readNumber;
			var html="";
			for(var i=0;i<result.length;i++)
				{
				
				html+="<tr><td>"+result[i].user_name+"</td>"
				      +"<td>"+result[i].user_count+"</td>"
				      +"<td>"+result[i].user_update_time+"</td></tr>";
				}
			$("#teaLookNUm").html(html);
		}
	});
	/**
	 * 获取问题反馈
	*/
	$.ajax({
		type:"post",
		content:"application/x-www-from-urlencoded;charset=UTF-8",
		url:"../AdminHomePageController/feedBack",
		dataType:"json",
		async:false,
		success:function(result){
			result =result.feeds;
			var html="";
			for(var i=0;i<result.length;i++)
				{
				
				html+="<li><a href='#'>"+result[i].feedback_content
				+"<span>"+result[i].feedback_update_time
				+"</span></a></li>";
				}
			
			$("#feedBack").html(html);
		}
	});
	
	//折线图，显示每天的登陆量
    $('.loginCount').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '教师登陆量与浏览量统计'
        },
        subtitle: {
            text: '以每天为单位'
        },
        xAxis: {
            categories: ['4月1日', '4月2日', '4月3日', '4月4日', '4月5日', '4月6日', '4月7日', '4月8日', '4月9日', '4月10日', '4月11日', '4月12日']
        
        },
        yAxis: {
            title: {
                text: '次'
            },
        min:0
        },
        tooltip: {
            enabled: false,
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y+"次";
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: '登陆量',
            data:loginNum
        }, {
            name: '浏览量',
            data: lookNum
        }]
    });
});				