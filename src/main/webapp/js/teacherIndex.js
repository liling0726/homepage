$(function () {
	//折线图，显示每天的登陆量
    $('#pageViewCount').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '浏览量统计'
        },
        subtitle: {
            text: '以每天为单位'
        },
        xAxis: {
            categories: ['4月1日', '4月2日', '4月3日', '4月4日', '4月5日', '4月6日', '4月7日']
        
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
            
            name: '浏览量',
            data: [ 50, 10, 39, 69, 10, 54, 70]
        }]
    });
});				