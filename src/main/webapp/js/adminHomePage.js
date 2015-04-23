$(function () {
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
            data: [100, 200, 300, 400, 200, 230, 260, 120, 500, 300, 70,20]
        }, {
            name: '浏览量',
            data: [1000, 300, 200, 500, 100, 390, 69, 100, 540, 700, 990, 560]
        }]
    });
});				